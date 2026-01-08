import { Injectable } from '@nestjs/common';
import { RolePermission } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { IRolePermissionRepository } from '../../domain/repositories/role-permission.repository';

@Injectable()
export class RolePermissionRepository implements IRolePermissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByRole(roleId: number): Promise<RolePermission[]> {
    return this.prisma.rolePermission.findMany({
      where: { roleId },
    });
  }

  async findByPermission(permissionId: number): Promise<RolePermission[]> {
    return this.prisma.rolePermission.findMany({
      where: { permissionId },
    });
  }

  async find(roleId: number, permissionId: number): Promise<RolePermission | null> {
    return this.prisma.rolePermission.findUnique({
      where: {
        roleId_permissionId: {
          roleId,
          permissionId,
        },
      },
    });
  }

  async create(data: {
    roleId: number;
    permissionId: number;
  }): Promise<RolePermission> {
    return this.prisma.rolePermission.create({
      data,
    });
  }

  async delete(roleId: number, permissionId: number): Promise<void> {
    await this.prisma.rolePermission.delete({
      where: {
        roleId_permissionId: {
          roleId,
          permissionId,
        },
      },
    });
  }
}
