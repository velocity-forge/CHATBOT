import { Button } from '@/components/ui/button';
import { FaArrowUp } from 'react-icons/fa';
const ChatBot = () => {
   return (
      <div className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl">
         <textarea
            className="w-full p-2  border-0 focus:outline-0 resize-none"
            placeholder="Ask me anything..."
            maxLength={1000}
         />
         <Button className="rounded-full w-9 h-9">
            <FaArrowUp />
         </Button>
      </div>
   );
};

export default ChatBot;
