import { Reflector } from '@nestjs/core';
import type { RolesType } from '../types/roles.js';

export const Roles = Reflector.createDecorator<RolesType[]>();
