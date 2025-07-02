import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Process base64 in chunks to prevent memory issues
function processBase64Chunks(base64String: string, chunkSize = 32768) {
  const chunks: Uint8Array[] = [];
  let position = 0;
  
  while (position < base64String.length) {
    const chunk = base64String.slice(position, position + chunkSize);
    const binaryChunk = atob(chunk);
    const bytes = new Uint8Array(binaryChunk.length);
    
    for (let i = 0; i < binaryChunk.length; i++) {
      bytes[i] = binaryChunk.charCodeAt(i);
    }
    
    chunks.push(bytes);
    position += chunkSize;
  }

  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;

  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return result;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { action, data } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    switch (action) {
      case 'speech_to_text':
        return await speechToText(data);
      case 'text_to_speech':
        return await textToSpeech(data);
      default:
        throw new Error(`Unknown action: ${action}`);
    }

  } catch (error) {
    console.error('Voice Assistant Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

async function speechToText(data: any) {
  const { audio } = data;
  
  if (!audio) {
    throw new Error('No audio data provided');
  }

  console.log('Processing speech to text...');

  // Process audio in chunks
  const binaryAudio = processBase64Chunks(audio);
  
  // Prepare form data
  const formData = new FormData();
  const blob = new Blob([binaryAudio], { type: 'audio/webm' });
  formData.append('file', blob, 'audio.webm');
  formData.append('model', 'whisper-1');
  formData.append('language', 'en');
  formData.append('response_format', 'json');

  // Send to OpenAI Whisper
  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenAI API error:', errorText);
    throw new Error(`OpenAI API error: ${errorText}`);
  }

  const result = await response.json();
  console.log('Speech to text result:', result);

  return new Response(
    JSON.stringify({ 
      text: result.text,
      confidence: result.confidence || 0.9,
      language: result.language || 'en'
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function textToSpeech(data: any) {
  const { text, voice = 'alloy', speed = 1.0 } = data;

  if (!text) {
    throw new Error('Text is required for speech synthesis');
  }

  console.log('Processing text to speech:', { text: text.substring(0, 100), voice, speed });

  // Generate speech from text using OpenAI TTS
  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'tts-1',
      input: text,
      voice: voice,
      response_format: 'mp3',
      speed: speed
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('TTS API error:', error);
    throw new Error(`Failed to generate speech: ${error}`);
  }

  // Convert audio buffer to base64
  const arrayBuffer = await response.arrayBuffer();
  const base64Audio = btoa(
    String.fromCharCode(...new Uint8Array(arrayBuffer))
  );

  console.log('Text to speech completed, audio length:', base64Audio.length);

  return new Response(
    JSON.stringify({ 
      audioContent: base64Audio,
      format: 'mp3',
      voice: voice,
      speed: speed
    }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    }
  );
}