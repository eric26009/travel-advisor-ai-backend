import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import { UnknownDestinationType } from '../types/aiTypes';

//For env File
dotenv.config();

const chatModel = new ChatOpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
  model: 'gpt-3.5-turbo-0125'
});

const travelTypes = {
  roadtrip: 'local road trip',
  domestic: 'domestic trip anywhere in the US',
  international: 'international trip anywhere in the world'
};

export const unknownDestination = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { startLocation, type, month } = req.query;

  if (!startLocation || !type || !month) {
    res.status(400).json({ error: 'Missing required parameters' });
  } else {
    const travelTypeText = travelTypes[type as keyof typeof travelTypes];
    const prompt = PromptTemplate.fromTemplate(
      `I want to go on a vacation but I do not know where I want to go yet. I am located in {startLocation}. 
    I am thinking of doing a {travelTypeText}. I want to go during the month of {month}. Can you recommend 3 places for me to go?
    Can you return this as a json object, the location should have the key "location" and then why part should have the key "why".
   `
    );

    if (type === 'roadtrip') {
      prompt.pipe(
        PromptTemplate.fromTemplate(
          `I want this road trip to not be longer than 4 hours away.
   `
        )
      );
    }
    const chain = prompt.pipe(chatModel);

    await chain
      .invoke({
        startLocation: startLocation as string,
        travelTypeText,
        month: month as string
      })
      .then((out) => {
        res.status(200).json(JSON.parse(out.content as string));
      })
      .catch(next);
  }
};

export const knownDestination = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { endLocation, month } = req.query;

  if (!endLocation || !month) {
    res.status(400).json({ error: 'Missing required parameters' });
  } else {
    const prompt = PromptTemplate.fromTemplate(
      `I want to go on a vacation to {endLocation}. 
       I want to go during the month of {month}. Can you recommend 3 activities for me to do on my vacation?
      Can you return this as a json object, the activity type should use the key "type", the activity title should use the key "title", 
      the activity description should use the key "description", and the activity address should use the key "address".
   `
    );

    const chain = prompt.pipe(chatModel);

    await chain
      .invoke({
        endLocation: endLocation as string,
        month: month as string
      })
      .then((out) => {
        res.status(200).json(JSON.parse(out.content as string));
      })
      .catch(next);
  }
};