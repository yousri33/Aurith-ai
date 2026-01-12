import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenRouter API key not configured' },
        { status: 500 }
      );
    }

    console.log('Sending request to OpenRouter with body:', JSON.stringify({
      model: body.model || 'google/gemini-2.0-flash-exp:free',
      messages: body.messages || [],
      ...body.extra_body
    }, null, 2));

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://aurith.ai',
        'X-Title': 'Aurith AI',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: body.model || 'xiaomi/mimo-v2-flash:free',
        messages: body.messages || [],
        reasoning: { enabled: true },
        ...body.extra_body
      })
    })

    const data = await response.json();
    console.log('OpenRouter response:', JSON.stringify(data, null, 2));
    
    if (!response.ok) {
      console.error('OpenRouter API error:', data);
      return NextResponse.json({ error: 'Failed to get response from AI service' }, { status: response.status });
    }

    // Ensure the output is always markdown format
    let responseContent = '';
    if (data.choices?.[0]?.message?.content) {
      responseContent = data.choices[0].message.content;
    } else if (data.choices?.[0]?.content) {
      responseContent = data.choices[0].content;
    } else if (data.message) {
      responseContent = data.message;
    } else if (data.content) {
      responseContent = data.content;
    } else if (data.result) {
      responseContent = data.result;
    }
    // Basic check: if not markdown, add line breaks
    if (responseContent && !responseContent.includes('```') && !responseContent.includes('#') && !responseContent.includes('*')) {
      responseContent = responseContent.replace(/\n/g, '  \n');
    }
    return NextResponse.json({ 
      choices: [{ 
        message: { 
          content: responseContent,
          reasoning_details: data.choices?.[0]?.message?.reasoning_details || data.choices?.[0]?.reasoning_details 
        } 
      }] 
    });
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
