import OpenAI from 'openai';
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    if (!process.env.OPENAI_API_KEY) {
        console.error('OpenAI API Key is missing');
        return NextResponse.json(
            { error: 'OpenAI API Key is missing' },
            { status: 500 }
        );
    }

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    try {
        const body = await request.json();
        console.log('Received message:', body.message); // Debug log

        if (!body.message || !Array.isArray(body.message)) {
            return NextResponse.json(
                { error: 'Invalid message format' },
                { status: 400 }
            );
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: body.message,
        });

        return NextResponse.json({ 
            content: completion.choices[0].message.content 
        });
    } catch (error: unknown) {
        // Detailed error logging
        console.error('Full error:', error);
        
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
} 