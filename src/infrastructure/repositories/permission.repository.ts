import { Injectable } from '@nestjs/common';
import { Permission, PermissionKey } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { IPermissionRepository } from '../../domain/repositories/permission.repository';

@Injectable()
export class PermissionRepository implements IPermissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<Permission | null> {
    return this.prisma.permission.findUnique({
      where: { id },
    });
  }

  async findByKey(key: PermissionKey): Promise<Permission | null> {
    return this.prisma.permission.findUnique({
      where: { key },
    });
  }

  async findAll(): Promise<Permission[]> {
    return this.prisma.permission.findMany();
  }

  async create(data: {
    key: PermissionKey;
    description?: string;
  }): Promise<Permission> {
    return this.prisma.permission.create({
      data,
    });
  }
}
