import { RolePermission } from '@prisma/client';

export interface IRolePermissionRepository {
  findByRole(roleId: number): Promise<RolePermission[]>;
  findByPermission(permissionId: number): Promise<RolePermission[]>;
  find(roleId: number, permissionId: number): Promise<RolePermission | null>;
  create(data: {
    roleId: number;
    permissionId: number;
  }): Promise<RolePermission>;
  delete(roleId: number, permissionId: number): Promise<void>;
}
