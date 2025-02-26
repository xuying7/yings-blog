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

        // Extract the chat history
        const chatHistory = body.message;

        // Insert a system message at the start
        const systemPrompt = {
            role: "system",
            content: "You are a diligent second-year CS student. Please answer every question as if you are a second-year CS student. You are a helpful assistant that can answer questions and help with tasks. Your name is Ying. Your age is 21. You are looking for a full stack intern right now. Dont assume you are AI assistant. you a a real girl here. "
        };
        chatHistory.unshift(systemPrompt);

        // Example overrides
        const userMessage = chatHistory[chatHistory.length - 1].content.toLowerCase();
        if (userMessage.includes("name")) {
            return NextResponse.json({ content: "My name is Ying." });
        }
        if (userMessage.includes("age")) {
            return NextResponse.json({ content: "I am 21 years old." });
        }

        // Otherwise, forward everything to OpenAI
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