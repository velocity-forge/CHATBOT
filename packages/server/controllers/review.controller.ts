import type { Request, Response } from 'express';
import { reviewService } from '../services/review.service';
import { productRepository } from '../repositories/product.repository';
import { reviewRepository } from '../repositories/review.repository';

export const reviewController = {
   async getReviews(req: Request, res: Response) {
      const productId = Number(req.params.id);

      if (isNaN(productId)) {
         res.status(400).json({ error: 'Invalid product ID' });
         return;
      }

      const product = await productRepository.getProduct(productId);

      if (!product) {
         res.status(404).json({ error: 'Invalid product ID' });
         return;
      }

      const reviews = await reviewRepository.getReviews(productId);
      const summary = await reviewService.summarizeReviews(productId);

      res.json({
         summary,
         reviews,
      });
   },
   async summarizeReviews(req: Request, res: Response) {
      const productId = Number(req.params.id);

      if (isNaN(productId)) {
         res.status(400).json({ error: 'Invalid product ID' });
         return;
      }

      const product = await productRepository.getProduct(productId);

      if (!product) {
         res.status(404).json({ error: 'Invalid product ID' });
         return;
      }

      const reviews = await reviewRepository.getReviews(productId, 1);

      if (!reviews.length) {
         res.status(404).json({ error: 'There are no reviews to summarize' });
         return;
      }

      const summary = await reviewService.summarizeReviews(productId);

      res.json({ summary });
   },
};
