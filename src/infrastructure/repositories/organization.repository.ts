import { Injectable } from '@nestjs/common';
import { Organization } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { IOrganizationRepository } from '../../domain/repositories/organization.repository';

@Injectable()
export class OrganizationRepository implements IOrganizationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Organization | null> {
    return this.prisma.organization.findUnique({
      where: { id },
    });
  }

  async findBySlug(slug: string): Promise<Organization | null> {
    return this.prisma.organization.findUnique({
      where: { slug },
    });
  }

  async create(data: {
    name: string;
    slug: string;
    createdById?: string;
  }): Promise<Organization> {
    return this.prisma.organization.create({
      data,
    });
  }

  async update(id: string, data: Partial<Organization>): Promise<Organization> {
    return this.prisma.organization.update({
      where: { id },
      data,
    });
  }
}
