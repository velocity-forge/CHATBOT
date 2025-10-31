import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { FaArrowUp } from 'react-icons/fa';

type formData = {
   prompt: string;
};

const ChatBot = () => {
   const { register, handleSubmit, reset, formState } = useForm<formData>();
   const onSubmit = (data: formData) => {
      console.log(data);
      reset();
   };
   const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
      }
   };
   return (
      <form
         className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
         onSubmit={handleSubmit(onSubmit)}
         onKeyDown={onKeyDown}
      >
         <textarea
            {...register('prompt', {
               required: true,
               validate: (data) => data.trim().length > 0,
            })}
            className="w-full p-2  border-0 focus:outline-0 resize-none"
            placeholder="Ask me anything..."
            maxLength={1000}
         />
         <Button disabled={!formState.isValid} className="rounded-full w-9 h-9">
            <FaArrowUp />
         </Button>
      </form>
   );
};

export default ChatBot;
