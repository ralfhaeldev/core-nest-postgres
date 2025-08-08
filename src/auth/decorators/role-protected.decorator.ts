import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/common/enums/roles.enum';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: Role[]) => {
  return SetMetadata(META_ROLES, args);
};
