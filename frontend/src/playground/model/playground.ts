import { apiPrefix, resourceTabs, statusLabels } from '../constants/index.js';
import type { ApiResponse, ResourceTab, Task, User } from '../types/index.js';

function element<T extends HTMLElement>(selector: string): T {
  const selected = document.querySelector<T>(selector);
  if (!selected) throw new Error(`Missing element: ${selector}`);
  return selected;
}

export function initializePlayground() {
  let users: User[] = [];
  let tasks: Task[] = [];
  let editingTaskId: number | null = null;
  let busy = false;

  const taskForm = element<HTMLFormElement>('#task-form');
  const userForm = element<HTMLFormElement>('#user-form');
  const apiKeyInput = element<HTMLInputElement>('#api-key');
  const roleInput = element<HTMLInputElement>('#api-role');
  const titleInput = element<HTMLInputElement>('#task-title');
  const descriptionInput = element<HTMLTextAreaElement>('#task-description');
  const assigneeSelect = element<HTMLSelectElement>('#task-user');
  const statusSelect = element<HTMLSelectElement>('#task-status');
  const filterSelect = element<HTMLSelectElement>('#task-filter');
  const feedback = element('#feedback');

  function setControlsDisabled(disabled: boolean) {
    document
      .querySelectorAll<
        | HTMLButtonElement
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement
      >('button, input, textarea, select')
      .forEach((control) => {
        control.disabled = disabled;
      });
  }

  async function request<T>(
    path: string,
    options: RequestInit = {},
    record = true,
  ): Promise<T> {
    const method = options.method || 'GET';
    let response: Response;
    try {
      const headers = new Headers(options.headers);
      if (!headers.has('Content-Type'))
        headers.set('Content-Type', 'application/json');
      headers.set('X-API-Key', apiKeyInput.value);
      headers.set('x-role', roleInput.value);
      response = await fetch(`${apiPrefix}${path}`, {
        ...options,
        headers,
      });
    } catch {
      if (record) {
        element('#response-request').textContent = `${method} ${path}`;
        element('#response-status').textContent = 'Network error';
        element('#response-body').textContent =
          'Could not reach the API. Check that Nest is running.';
      }
      throw new Error(
        'Could not reach the API. Start the backend and try Refresh data.',
      );
    }
    const body = await response.text();
    const data =
      body && response.headers.get('content-type')?.includes('application/json')
        ? JSON.parse(body)
        : null;
    if (record || !response.ok) {
      element('#response-request').textContent = `${method} ${path}`;
      element('#response-status').textContent =
        `${response.status} ${response.statusText}`;
      element('#response-body').textContent = body
        ? data === null
          ? body
          : JSON.stringify(data, null, 2)
        : '(empty response)';
    }
    if (!response.ok)
      throw new Error(
        `${method} ${path} failed (${response.status}). See the API response below.`,
      );
    if (data !== null && (path === '/tasks' || path.startsWith('/tasks/'))) {
      const taskResponse: ApiResponse<T> = data;
      return taskResponse.data;
    }
    return data;
  }

  async function perform(action: () => Promise<void>) {
    if (busy) return;
    busy = true;
    feedback.textContent = 'Sending request…';
    feedback.classList.remove('error');
    setControlsDisabled(true);
    try {
      await action();
      feedback.textContent = 'Request complete. You’re up to date.';
    } catch (error) {
      feedback.textContent =
        error instanceof Error
          ? error.message
          : 'Something went wrong. Try again.';
      feedback.classList.add('error');
    } finally {
      busy = false;
      setControlsDisabled(false);
    }
  }

  function selectTab(resource: ResourceTab) {
    for (const name of resourceTabs) {
      const selected = resource === name;
      const tab = element<HTMLButtonElement>(`#${name}-tab`);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      element(`#${name}-panel`).hidden = !selected;
    }
  }

  function resetTaskForm() {
    editingTaskId = null;
    taskForm.reset();
    element('#task-form-title').textContent = 'Create a task';
    element('#save-task').textContent = 'Create task ↗';
    element('#task-form-endpoint').textContent = 'POST /tasks';
    element('#task-status-field').hidden = true;
    element('#cancel-edit').hidden = true;
  }

  function renderAssignees() {
    for (const select of [assigneeSelect, filterSelect]) {
      const previous = select.value;
      select.replaceChildren(
        new Option(select === filterSelect ? 'All users' : 'Unassigned', ''),
      );
      for (const user of users)
        select.add(new Option(`${user.name} · #${user.id}`, String(user.id)));
      select.value = previous;
    }
  }

  function actionButton(label: string, onClick: () => void, danger = false) {
    const button = document.createElement('button');
    button.type = 'button';
    button.disabled = busy;
    button.className = danger ? 'text-button danger' : 'text-button';
    button.textContent = label;
    button.addEventListener('click', onClick);
    return button;
  }

  function emptyMessage(container: HTMLElement, message: string) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = message;
    container.append(empty);
  }

  function renderTasks() {
    const list = element('#task-list');
    list.replaceChildren();
    if (!tasks.length)
      emptyMessage(list, 'No tasks here yet. Create one to get started.');
    for (const task of tasks) {
      const row = document.createElement('article');
      row.className = 'resource-row';
      const heading = document.createElement('div');
      heading.className = 'resource-heading';
      const title = document.createElement('h3');
      title.textContent = task.title;
      const status = document.createElement('span');
      status.className = `badge ${task.status}`;
      status.textContent = statusLabels[task.status];
      heading.append(title, status);
      const description = document.createElement('p');
      description.className = 'resource-description';
      description.textContent = task.description || 'No description';
      const meta = document.createElement('div');
      meta.className = 'resource-meta';
      const owner = users.find((user) => user.id === task.userId);
      const details = document.createElement('span');
      details.textContent = `#${task.id} · ${owner?.name ?? (task.userId === null ? 'Unassigned' : `User #${task.userId}`)}`;
      const actions = document.createElement('div');
      actions.className = 'row-actions';
      actions.append(
        actionButton('Inspect', () => {
          void perform(async () => {
            await request(`/tasks/${task.id}`);
          });
        }),
        actionButton('Edit', () => {
          editingTaskId = task.id;
          titleInput.value = task.title;
          descriptionInput.value = task.description;
          if (
            task.userId !== null &&
            !users.some((user) => user.id === task.userId)
          ) {
            assigneeSelect.add(
              new Option(`User #${task.userId}`, String(task.userId)),
            );
          }
          assigneeSelect.value =
            task.userId === null ? '' : String(task.userId);
          statusSelect.value = task.status;
          element('#task-form-title').textContent = `Edit task #${task.id}`;
          element('#save-task').textContent = 'Save changes ↗';
          element('#task-form-endpoint').textContent =
            `PATCH /tasks/${task.id}`;
          element('#task-status-field').hidden = false;
          element('#cancel-edit').hidden = false;
          titleInput.focus();
        }),
        actionButton(
          'Delete',
          () => {
            if (!window.confirm(`Delete task #${task.id} “${task.title}”?`))
              return;
            void perform(async () => {
              await request(`/tasks/${task.id}`, { method: 'DELETE' });
              if (editingTaskId === task.id) resetTaskForm();
              await refreshData(false);
            });
          },
          true,
        ),
      );
      meta.append(details, actions);
      row.append(heading, description, meta);
      list.append(row);
    }
  }

  function renderUsers() {
    const list = element('#user-list');
    list.replaceChildren();
    if (!users.length)
      emptyMessage(
        list,
        'No users yet. Add someone to assign your first task.',
      );
    for (const user of users) {
      const row = document.createElement('article');
      row.className = 'resource-row';
      const name = document.createElement('h3');
      name.textContent = user.name;
      const email = document.createElement('p');
      email.className = 'resource-description';
      email.textContent = user.email;
      const meta = document.createElement('div');
      meta.className = 'resource-meta';
      const id = document.createElement('span');
      id.textContent = `User #${user.id}`;
      const actions = document.createElement('div');
      actions.className = 'row-actions';
      actions.append(
        actionButton('Inspect', () => {
          void perform(async () => {
            await request(`/users/${user.id}`);
          });
        }),
        actionButton('View tasks ↗', () => {
          filterSelect.value = String(user.id);
          selectTab('tasks');
          void perform(async () => {
            await loadTasks();
          });
        }),
      );
      meta.append(id, actions);
      row.append(name, email, meta);
      list.append(row);
    }
  }

  async function loadTasks(record = true) {
    const path = filterSelect.value
      ? `/users/${filterSelect.value}/tasks`
      : '/tasks';
    tasks = await request<Task[]>(path, {}, record);
    element('#task-count').textContent = String(tasks.length);
    renderTasks();
  }

  async function refreshData(record = true) {
    users = await request<User[]>('/users', {}, record);
    element('#user-count').textContent = String(users.length);
    renderAssignees();
    renderUsers();
    await loadTasks(record);
  }

  taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    void perform(async () => {
      const body = {
        title: titleInput.value,
        description: descriptionInput.value,
        userId: assigneeSelect.value ? Number(assigneeSelect.value) : null,
        ...(editingTaskId === null ? {} : { status: statusSelect.value }),
      };
      const path =
        editingTaskId === null ? '/tasks' : `/tasks/${editingTaskId}`;
      const result = await request<Task | null>(path, {
        method: editingTaskId === null ? 'POST' : 'PATCH',
        body: JSON.stringify(body),
      });
      if (!result)
        throw new Error(
          'This task no longer exists. Refresh the list before editing again.',
        );
      resetTaskForm();
      await refreshData(false);
    });
  });

  const nameInput = element<HTMLInputElement>('#user-name');
  userForm.addEventListener('submit', (event) => {
    event.preventDefault();
    void perform(async () => {
      await request<User>('/users', {
        method: 'POST',
        body: JSON.stringify({
          name: nameInput.value,
          email: element<HTMLInputElement>('#user-email').value,
        }),
      });
      userForm.reset();
      await refreshData(false);
    });
  });

  const notificationForm = element<HTMLFormElement>('#notification-form');
  const messageInput = element<HTMLTextAreaElement>('#notification-message');
  notificationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    void perform(async () => {
      await request<void>('/notifications', {
        method: 'POST',
        body: JSON.stringify({ message: messageInput.value }),
      });
      notificationForm.reset();
    });
  });

  for (const resource of resourceTabs) {
    const tab = element<HTMLButtonElement>(`#${resource}-tab`);
    tab.addEventListener('click', () => selectTab(resource));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key))
        return;
      event.preventDefault();
      const nextIndex =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? resourceTabs.length - 1
            : (resourceTabs.indexOf(resource) +
                (event.key === 'ArrowRight' ? 1 : -1) +
                resourceTabs.length) %
              resourceTabs.length;
      const next = resourceTabs[nextIndex];
      selectTab(next);
      element(`#${next}-tab`).focus();
    });
  }
  for (const resource of ['task', 'user']) {
    element<HTMLFormElement>(`#${resource}-lookup`).addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        void perform(async () => {
          const id = element<HTMLInputElement>(`#${resource}-id`).value;
          const result = await request(`/${resource}s/${id}`);
          if (result === null)
            throw new Error(
              `No ${resource} found with ID ${id}. The API returned null.`,
            );
        });
      },
    );
  }
  filterSelect.addEventListener('change', () => {
    void perform(async () => {
      await loadTasks();
    });
  });
  element('#cancel-edit').addEventListener('click', resetTaskForm);
  element('#refresh').addEventListener('click', () => {
    void perform(async () => {
      await refreshData();
    });
  });
  void perform(async () => {
    await refreshData();
  });
}
