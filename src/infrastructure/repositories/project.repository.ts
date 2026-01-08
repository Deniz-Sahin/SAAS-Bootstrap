import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { IProjectRepository } from '../../domain/repositories/project.repository';

@Injectable()
export class ProjectRepository implements IProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: { id },
    });
  }

  async findByOrganization(organizationId: string): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: {
        organizationId,
        deletedAt: null,
      },
    });
  }

  async findActiveByOrganization(organizationId: string): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: {
        organizationId,
        deletedAt: null,
      },
    });
  }

  async create(data: {
    organizationId: string;
    name: string;
    description?: string;
    createdById?: string;
  }): Promise<Project> {
    return this.prisma.project.create({
      data,
    });
  }

  async update(id: string, data: Partial<Project>): Promise<Project> {
    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.project.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
