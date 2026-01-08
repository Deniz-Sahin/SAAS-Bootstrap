import { Injectable } from '@nestjs/common';
import { Role, RoleKey } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { IRoleRepository } from '../../domain/repositories/role.repository';

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<Role | null> {
    return this.prisma.role.findUnique({
      where: { id },
    });
  }

  async findByKey(key: RoleKey): Promise<Role | null> {
    return this.prisma.role.findUnique({
      where: { key },
    });
  }

  async findAll(): Promise<Role[]> {
    return this.prisma.role.findMany();
  }

  async create(data: {
    key: RoleKey;
    name: string;
    description?: string;
  }): Promise<Role> {
    return this.prisma.role.create({
      data,
    });
  }

  async update(id: number, data: Partial<Role>): Promise<Role> {
    return this.prisma.role.update({
      where: { id },
      data,
    });
  }
}
