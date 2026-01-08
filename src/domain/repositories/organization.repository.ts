import { Organization } from '@prisma/client';

export interface IOrganizationRepository {
  findById(id: string): Promise<Organization | null>;
  findBySlug(slug: string): Promise<Organization | null>;
  create(data: {
    name: string;
    slug: string;
    createdById?: string;
  }): Promise<Organization>;
  update(id: string, data: Partial<Organization>): Promise<Organization>;
}
