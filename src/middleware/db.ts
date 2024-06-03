import { Client, Pool } from 'pg';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';

//For env File
dotenv.config();

export const checkAccessCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization: accessCode } = req.headers;

  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '')
  });

  try {
    await client.connect();
  } catch (e) {
    res.status(503).json({ error: 'Database is down' });
  }

  try {
    const queryRes = await client.query(
      `SELECT EXISTS(SELECT 1 FROM "defaultSchema"."accessCodes" WHERE access_code='${accessCode as string}')`
    );
    if (queryRes.rows[0].exists === true) {
      console.log('VALID ACCESS CODE');
      next();
    } else {
      res.status(401).json({ error: 'Invalid or missing access code' });
      console.log('Invalid access code');
      client.end();
      return;
    }
  } catch (e) {
    res.status(503).json({ error: 'Database error' });
    client.end();
    return;
  }

  client.end();
};
