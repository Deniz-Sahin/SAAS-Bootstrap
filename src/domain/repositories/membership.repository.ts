import { Membership } from '@prisma/client';

export interface IMembershipRepository {
  findByUserAndOrganization(
    userId: string,
    organizationId: string,
  ): Promise<Membership | null>;
  findByOrganization(organizationId: string): Promise<Membership[]>;
  findByUser(userId: string): Promise<Membership[]>;
  create(data: {
    userId: string;
    organizationId: string;
    roleId: number;
  }): Promise<Membership>;
  update(
    userId: string,
    organizationId: string,
    data: Partial<Membership>,
  ): Promise<Membership>;
  softDelete(userId: string, organizationId: string): Promise<void>;
}
