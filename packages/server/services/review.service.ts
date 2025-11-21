import type { Review } from '../generated/prisma/client';
import { reviewRepository } from '../repositories/review.repository';
import OpenAI from 'openai';

export const reviewService = {
   async getReviews(productId: number): Promise<Review[]> {
      return await reviewRepository.getReviews(productId);
   },
   async summarizeReviews(productId: number): Promise<string> {
      const reviews = await reviewRepository.getReviews(productId, 10);
      const joinedReviews = reviews.map((r) => r.content).join('\n');
      const prompt = `Summarize the following customerreviews into a short paragraph highlighting key themes, both positive and negative: 
      ${joinedReviews}`;

      const response = await client.responses.create({
         model: 'gpt-4o-mini',
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 500,
      });

      return response.output_text;
   },
};

const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});
