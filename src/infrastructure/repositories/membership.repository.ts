import { Injectable } from '@nestjs/common';
import { Membership } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { IMembershipRepository } from '../../domain/repositories/membership.repository';

@Injectable()
export class MembershipRepository implements IMembershipRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserAndOrganization(
    userId: string,
    organizationId: string,
  ): Promise<Membership | null> {
    return this.prisma.membership.findUnique({
      where: {
        userId_organizationId: {
          userId,
          organizationId,
        },
      },
    });
  }

  async findByOrganization(organizationId: string): Promise<Membership[]> {
    return this.prisma.membership.findMany({
      where: {
        organizationId,
        deletedAt: null,
      },
    });
  }

  async findByUser(userId: string): Promise<Membership[]> {
    return this.prisma.membership.findMany({
      where: {
        userId,
        deletedAt: null,
      },
    });
  }

  async create(data: {
    userId: string;
    organizationId: string;
    roleId: number;
  }): Promise<Membership> {
    return this.prisma.membership.create({
      data,
    });
  }

  async update(
    userId: string,
    organizationId: string,
    data: Partial<Membership>,
  ): Promise<Membership> {
    return this.prisma.membership.update({
      where: {
        userId_organizationId: {
          userId,
          organizationId,
        },
      },
      data,
    });
  }

  async softDelete(userId: string, organizationId: string): Promise<void> {
    await this.prisma.membership.update({
      where: {
        userId_organizationId: {
          userId,
          organizationId,
        },
      },
      data: { deletedAt: new Date() },
    });
  }
}
