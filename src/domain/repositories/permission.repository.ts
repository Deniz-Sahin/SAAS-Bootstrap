import { Permission, PermissionKey } from '@prisma/client';

export interface IPermissionRepository {
  findById(id: number): Promise<Permission | null>;
  findByKey(key: PermissionKey): Promise<Permission | null>;
  findAll(): Promise<Permission[]>;
  create(data: {
    key: PermissionKey;
    description?: string;
  }): Promise<Permission>;
}
