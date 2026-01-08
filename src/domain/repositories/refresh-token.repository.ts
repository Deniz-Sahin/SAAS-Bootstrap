import { RefreshToken } from '@prisma/client';

export interface IRefreshTokenRepository {
  findById(id: string): Promise<RefreshToken | null>;
  findByTokenHash(tokenHash: string): Promise<RefreshToken | null>;
  findByUser(userId: string): Promise<RefreshToken[]>;
  findActiveByUser(userId: string): Promise<RefreshToken[]>;
  create(data: {
    userId: string;
    tokenHash: string;
    expiresAt: Date;
    replacedById?: string;
  }): Promise<RefreshToken>;
  revoke(id: string): Promise<void>;
  revokeAllForUser(userId: string): Promise<void>;
  deleteExpired(): Promise<number>;
}
