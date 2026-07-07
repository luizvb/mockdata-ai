import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';
import { getDb } from '@/lib/db';

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { schemaDefinition, rowCount } = body;

    if (!schemaDefinition || !rowCount) {
      return NextResponse.json({ error: 'Missing schemaDefinition or rowCount' }, { status: 400 });
    }

    // Prepare dynamic schema parsing using AI
    const result = await generateObject({
      model: openrouter('google/gemini-2.5-flash'), // Updated model string, standardizing to gemini
      schema: z.object({
        data: z.array(z.record(z.any())).length(rowCount),
      }),
      prompt: `Generate ${rowCount} rows of realistic mock data in JSON format based on the following schema constraints:\n\n${schemaDefinition}`,
    });

    const dataResult = result.object.data;
    
    // Save to PGlite (optional tracking)
    const db = await getDb();
    await db.query('INSERT INTO mock_generations (schema, result) VALUES ($1, $2)', [
      schemaDefinition,
      JSON.stringify(dataResult)
    ]);

    return NextResponse.json({ data: dataResult });
  } catch (error: any) {
    console.error('Error generating data:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
