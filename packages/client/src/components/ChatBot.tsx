import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { FaArrowUp } from 'react-icons/fa';
import { useRef, useState } from 'react';
import axios from 'axios';

type formData = {
   prompt: string;
};

type chatResponse = {
   message: string;
};

type Message = {
   content: string;
   role: 'user' | 'bot';
};

const ChatBot = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const conversationId = useRef(crypto.randomUUID());
   const { register, handleSubmit, reset, formState } = useForm<formData>();
   const onSubmit = async ({ prompt }: formData) => {
      reset();
      setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);
      const { data } = await axios.post<chatResponse>('/api/chat', {
         prompt,
         conversationId: conversationId.current,
      });
      setMessages((prev) => [...prev, { content: data.message, role: 'bot' }]);
   };
   const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
      }
   };
   return (
      <div>
         <div className="flex flex-col gap-3 mb-10">
            {messages.map((message, index) => (
               <div
                  key={index}
                  className={`px-3 py-1 rounded-xl
                    ${message.role === 'user' ? 'bg-blue-600 text-white self-end' : 'bg-gray-100 text-black self-start'}`}
               >
                  {message.content}
               </div>
            ))}
         </div>
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
            <Button
               disabled={!formState.isValid}
               className="rounded-full w-9 h-9"
            >
               <FaArrowUp />
            </Button>
         </form>
      </div>
   );
};

export default ChatBot;
