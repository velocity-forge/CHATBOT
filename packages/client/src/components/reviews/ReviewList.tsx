import { useState, useEffect } from 'react';
import axios from 'axios';
import { HiSparkles } from 'react-icons/hi2';
import Skeleton from 'react-loading-skeleton';
import StarRating from './StarRating';
import { Button } from '../ui/button';

type Props = {
   productId: number;
};

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

const ReviewList = ({ productId }: Props) => {
   const [reviewData, setReviewData] = useState<GetReviewsResponse>();
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string>('');

   const fetchReviews = async () => {
      try {
         setIsLoading(true);
         setError('');
         const { data } = await axios.get<GetReviewsResponse>(
            `/api/products/${productId}/reviews`
         );
         setReviewData(data);
      } catch (error) {
         console.error(error);
         setError('Coould not fetch the reviews. Try again!');
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      fetchReviews();
   }, [productId]);

   if (isLoading) {
      return (
         <div className="flex flex-col gap-5">
            {[1, 2, 3].map((p) => (
               <div key={p}>
                  <Skeleton width={150} />
                  <Skeleton width={100} />
                  <Skeleton count={2} />
               </div>
            ))}
         </div>
      );
   }

   if (error) {
      return <div className="text-red-500">{error}</div>;
   }

   if (!reviewData?.reviews.length) {
      return null;
   }

   return (
      <div>
         <div className="mb-5">
            {reviewData?.summary ? (
               <p>{reviewData.summary}</p>
            ) : (
               <Button>
                  <HiSparkles /> Summarize
               </Button>
            )}
         </div>
         <div className="flex flex-col gap-5">
            {reviewData?.reviews.map((review) => (
               <div key={review.id}>
                  <div className="font-semibold">{review.author}</div>
                  <div>
                     <StarRating value={review.rating} />
                  </div>
                  <p className="py-2">{review.content}</p>
               </div>
            ))}
         </div>
      </div>
   );
};

export default ReviewList;
