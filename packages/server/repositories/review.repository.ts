import type { Review } from '../generated/prisma/browser';
import { prisma } from '../libs/prisma';

export const reviewRepository = {
   async getReviews(productId: number): Promise<Review[]> {
      const reviews = await prisma.review.findMany({
         where: { productId },
      });
      return reviews;
   },
};
