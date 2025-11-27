import { FaRegStar, FaStar } from 'react-icons/fa';
type Props = {
   value: number;
};

const StarRating = ({ value }: Props) => {
   const placeholders = [1, 2, 3, 4, 5];
   return (
      <div className="flex gap-1 text-yellow-500">
         {placeholders.map((p) => (
            <div key={p} className="size-4">
               {p <= value ? <FaStar /> : <FaRegStar />}
            </div>
         ))}
      </div>
   );
};

export default StarRating;
