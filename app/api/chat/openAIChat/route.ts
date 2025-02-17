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
    } catch (error: any) {
        // Detailed error logging
        console.error('Full error:', {
            name: error.name,
            message: error.message,
            stack: error.stack,
            response: error.response?.data
        });
        
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
} 