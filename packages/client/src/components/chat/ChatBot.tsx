import { useRef, useState } from 'react';
import ChatMessages, { type Message } from './ChatMessages';
import axios from 'axios';
import { TypingIndicator } from './TypingIndicator';
import ChatInput, { type chatFormData } from './chatInput';
import popSound from '@/assets/sounds/pop.wav';
import notificationSound from '@/assets/sounds/notification.wav';

type chatResponse = {
   message: string;
};

const popAudio = new Audio(popSound);
popAudio.volume = 0.2;

const notificationAudio = new Audio(notificationSound);
notificationAudio.volume = 0.2;

const ChatBot = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [isBotTyping, setIsBotTyping] = useState(false);
   const [error, setError] = useState<string>('');
   const conversationId = useRef(crypto.randomUUID());

   const onSubmit = async ({ prompt }: chatFormData) => {
      try {
         setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);
         setIsBotTyping(true);
         setError('');
         popAudio.play();

         const { data } = await axios.post<chatResponse>('/api/chat', {
            prompt,
            conversationId: conversationId.current,
         });
         setMessages((prev) => [
            ...prev,
            { content: data.message, role: 'bot' },
         ]);
         notificationAudio.play();
      } catch (error) {
         setError('Something went wrong, try again.');
      } finally {
         setIsBotTyping(false);
      }
   };

   return (
      <div className="flex flex-col h-full">
         <div className="flex flex-col flex-1 gap-3 mb-10 overflow-y-auto">
            <ChatMessages messages={messages} />
            {isBotTyping && <TypingIndicator />}
            {error && <div className="text-red-500 text-sm">{error}</div>}
         </div>
         <ChatInput onSubmit={onSubmit} />
      </div>
   );
};

export default ChatBot;
