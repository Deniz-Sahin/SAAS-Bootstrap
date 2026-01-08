import { Role, RoleKey } from '@prisma/client';

export interface IRoleRepository {
  findById(id: number): Promise<Role | null>;
  findByKey(key: RoleKey): Promise<Role | null>;
  findAll(): Promise<Role[]>;
  create(data: {
    key: RoleKey;
    name: string;
    description?: string;
  }): Promise<Role>;
  update(id: number, data: Partial<Role>): Promise<Role>;
}
