import axios from 'axios';

type Review = {
   id: number;
   author: string;
   content: string;
   rating: number;
   createdAt: string;
};

type GetReviewsResponse = {
   summary: string | null;
   reviews: Review[];
};

type SummarizeResponse = {
   summary: string;
};

export const reviewsApi = {
   async fetchReviews(productId: number) {
      return axios
         .get<GetReviewsResponse>(`/api/products/${productId}/reviews`)
         .then((res) => res.data);
   },
   async summarizeReviews(productId: number) {
      return axios
         .post<SummarizeResponse>(
            `/api/products/${productId}/reviews/summarize`
         )
         .then((res) => res.data);
   },
};
