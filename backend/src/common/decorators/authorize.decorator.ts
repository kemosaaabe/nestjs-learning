import { applyDecorators, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles.guard.js';
import { Roles } from '../roles/roles.decorator.js';
import { RolesType } from '../types/roles.js';

export function Authorize(roles?: RolesType[]) {
  return applyDecorators(UseGuards(RolesGuard), Roles(roles));
}
