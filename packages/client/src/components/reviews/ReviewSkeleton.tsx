import Skeleton from 'react-loading-skeleton';

const ReviewSkeleton = () => {
   return (
      <div>
         <Skeleton width={150} />
         <Skeleton width={100} />
         <Skeleton count={2} />
      </div>
   );
};

export default ReviewSkeleton;
