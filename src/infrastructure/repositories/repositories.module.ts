import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { OrganizationRepository } from './organization.repository';
import { MembershipRepository } from './membership.repository';
import { RoleRepository } from './role.repository';
import { PermissionRepository } from './permission.repository';
import { RolePermissionRepository } from './role-permission.repository';
import { ProjectRepository } from './project.repository';
import { RefreshTokenRepository } from './refresh-token.repository';

@Module({
  providers: [
    UserRepository,
    OrganizationRepository,
    MembershipRepository,
    RoleRepository,
    PermissionRepository,
    RolePermissionRepository,
    ProjectRepository,
    RefreshTokenRepository,
  ],
  exports: [
    UserRepository,
    OrganizationRepository,
    MembershipRepository,
    RoleRepository,
    PermissionRepository,
    RolePermissionRepository,
    ProjectRepository,
    RefreshTokenRepository,
  ],
})
export class RepositoriesModule {}
