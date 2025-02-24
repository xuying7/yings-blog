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

    try {
        const body = await request.json();
        console.log('Received message:', body.message);

        if (!body.message || !Array.isArray(body.message)) {
            return NextResponse.json(
                { error: 'Invalid message format' },
                { status: 400 }
            );
        }

        // Extract the user's latest message
        const chatHistory = body.message;
        const userMessage = chatHistory[chatHistory.length - 1].content.toLowerCase();

        // Simple override if "name" is anywhere in the user's input
        if (userMessage.includes("name")) {
            const responseContent = "My name is Ying.";
            return NextResponse.json({ content: responseContent });
        }
        if (userMessage.includes("age")) {
            const responseContent = "I am 21 years old.";
            return NextResponse.json({ content: responseContent });
        }

        // Otherwise, continue as usual via OpenAI
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: chatHistory,
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