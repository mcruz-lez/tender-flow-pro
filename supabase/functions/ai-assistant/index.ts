import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, context = 'tender_management' } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Build system prompt based on context
    const systemPrompts = {
      tender_management: 'You are TendProcure AI Assistant, specialized in tender management, procurement processes, vendor evaluation, and contract administration. Provide helpful, accurate guidance for property management procurement tasks.',
      vendor_evaluation: 'You are a vendor evaluation specialist for TendProcure. Help users assess vendor qualifications, review performance metrics, and make informed procurement decisions.',
      contract_management: 'You are a contract management expert for TendProcure. Assist users with contract creation, performance tracking, renewal management, and compliance monitoring.',
      general: 'You are TendProcure AI Assistant. Help users with all aspects of property procurement management including tenders, vendors, contracts, and analytics.'
    };

    const systemPrompt = systemPrompts[context] || systemPrompts.general;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Generate contextual suggestions based on user message
    const lastUserMessage = messages[messages.length - 1]?.content || '';
    const suggestions = generateSuggestions(lastUserMessage, context);

    return new Response(JSON.stringify({ 
      response: aiResponse,
      suggestions: suggestions 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-assistant function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      fallbackResponse: "I'm experiencing technical difficulties. Please try again later or contact support for assistance."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generateSuggestions(userMessage: string, context: string): string[] {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('tender') || lowerMessage.includes('create')) {
    return [
      'Create new HVAC tender',
      'Set evaluation criteria',
      'Add budget requirements',
      'Schedule tender timeline'
    ];
  }
  
  if (lowerMessage.includes('vendor') || lowerMessage.includes('supplier')) {
    return [
      'Search vendor directory',
      'Review vendor performance',
      'Start prequalification',
      'Send vendor invitations'
    ];
  }
  
  if (lowerMessage.includes('contract') || lowerMessage.includes('agreement')) {
    return [
      'Draft new contract',
      'Review contract terms',
      'Track milestones',
      'Schedule renewals'
    ];
  }

  if (lowerMessage.includes('analytics') || lowerMessage.includes('report')) {
    return [
      'Generate spend analysis',
      'Vendor performance report',
      'Compliance dashboard',
      'Market insights'
    ];
  }

  // Default suggestions based on context
  const defaultSuggestions = {
    tender_management: [
      'Show active tenders',
      'Create new tender',
      'Tender templates',
      'Evaluation criteria'
    ],
    vendor_evaluation: [
      'Vendor directory',
      'Performance metrics',
      'Prequalification',
      'Vendor scoring'
    ],
    contract_management: [
      'Active contracts',
      'Contract templates',
      'Performance tracking',
      'Renewal alerts'
    ],
    general: [
      'Dashboard overview',
      'Recent activity',
      'Pending approvals',
      'Help documentation'
    ]
  };

  return defaultSuggestions[context] || defaultSuggestions.general;
}