import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import dotenv from 'dotenv';
import { Response, NextFunction } from 'express';
import { UnknownDestinationType } from './types/aiTypes';

//For env File
dotenv.config();

const chatModel = new ChatOpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
  model: 'gpt-3.5-turbo-0125'
});

const travelTypes = {
  roadTrip: 'local road trip',
  domestic: 'domestic trip anywhere in the US',
  international: 'international trip anywhere in the world'
};

export const getDestinationAI = async (
  payload: UnknownDestinationType,
  res: Response,
  next: NextFunction
) => {
  const travelTypeText = travelTypes[payload.type as keyof typeof travelTypes];
  const startingLocation = payload.startingLocation;
  const month = payload.monthOfTravel;

  const prompt = PromptTemplate.fromTemplate(
    `I want to go on a vacation but I do not know where I want to go yet. I am located in {startingLocation}. 
    I am thinking of doing a {travelTypeText}. I want to go during the month of {month}. Can you recommend 3 places for me to go?
    Can you return this as a json object, the location should have the key "location" and then why part should have the key "why".
   `
  );

  if (payload.type === 'roadTrip') {
    prompt.pipe(
      PromptTemplate.fromTemplate(
        `I want this road trip to not be longer than 4 hours away.
   `
      )
    );
  }
  const chain = prompt.pipe(chatModel);

  return await chain
    .invoke({
      startingLocation,
      travelTypeText,
      month
    })
    .then((out) => {
      res.json(JSON.parse(out.content as string));
    })
    .catch(next);
};
