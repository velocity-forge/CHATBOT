import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import { conversationRepository } from '../repositories/conversation.repository';
import template from '../prompts/chatbot.txt';

const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

// Leaky abstraction
const parkInfo = fs.readFileSync(
   path.join(__dirname, '..', 'prompts', 'WonderWorld.md'),
   'utf-8'
);
const instructions = template.replace('{{parkInfo}}', parkInfo);

export const chatService = {
   async sendMessage(prompt: string, conversationId: string) {
      const response = await client.responses.create({
         model: 'gpt-4o-mini',
         instructions,
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 100,
         previous_response_id:
            conversationRepository.getLastResponseId(conversationId),
      });

      conversationRepository.setLastResponseId(conversationId, response.id);

      return {
         responseId: response.id,
         message: response.output_text,
      };
   },
};
