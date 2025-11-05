import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { FaArrowUp } from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

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
   const [isBotTyping, setIsBotTyping] = useState(false);
   const formRef = useRef<HTMLFormElement | null>(null);
   const conversationId = useRef(crypto.randomUUID());
   const { register, handleSubmit, reset, formState } = useForm<formData>();

   useEffect(() => {
      if (formRef.current) {
         formRef.current.scrollIntoView({ behavior: 'smooth' });
      }
   }, [messages]);

   const onSubmit = async ({ prompt }: formData) => {
      setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);
      setIsBotTyping(true);
      reset();
      const { data } = await axios.post<chatResponse>('/api/chat', {
         prompt,
         conversationId: conversationId.current,
      });
      setMessages((prev) => [...prev, { content: data.message, role: 'bot' }]);
      setIsBotTyping(false);
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
                  <ReactMarkdown>{message.content}</ReactMarkdown>
               </div>
            ))}
            {isBotTyping && (
               <div className="flex self-start gap-1 px-3 py-3 bg-gray-200 rounded-xl">
                  <div className="w-2 h-2 bg-gray-800 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-800 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-gray-800 rounded-full animate-pulse [animation-delay:0.4s]"></div>
               </div>
            )}
         </div>
         <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={onKeyDown}
            ref={formRef}
            className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
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
