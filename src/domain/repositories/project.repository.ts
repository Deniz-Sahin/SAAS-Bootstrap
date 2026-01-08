import { Project } from '@prisma/client';

export interface IProjectRepository {
  findById(id: string): Promise<Project | null>;
  findByOrganization(organizationId: string): Promise<Project[]>;
  findActiveByOrganization(organizationId: string): Promise<Project[]>;
  create(data: {
    organizationId: string;
    name: string;
    description?: string;
    createdById?: string;
  }): Promise<Project>;
  update(id: string, data: Partial<Project>): Promise<Project>;
  softDelete(id: string): Promise<void>;
}
