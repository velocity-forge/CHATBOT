import type { Review } from '../generated/prisma/browser';
import { prisma } from '../libs/prisma';
import dayjs from 'dayjs';

export const reviewRepository = {
   async getReviews(productId: number, limit?: number): Promise<Review[]> {
      const reviews = await prisma.review.findMany({
         where: { productId },
         orderBy: { createdAt: 'desc' },
         take: limit,
      });
      return reviews;
   },
   storeReviewSummary(productId: number, summary: string) {
      const now = new Date();
      const expiresAt = dayjs(now).add(7, 'days').toDate();
      const data = {
         content: summary,
         expiresAt,
         generatedAt: now,
         productId,
      };
      return prisma.summary.upsert({
         where: { productId },
         create: data,
         update: data,
      });
   },
};
