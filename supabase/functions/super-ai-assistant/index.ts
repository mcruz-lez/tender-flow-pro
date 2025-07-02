import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase client for data access
const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

// AI Personas Configuration
const AI_PERSONAS = {
  support_companion: {
    name: "Support Companion",
    role: "Friendly assistant for navigation, FAQs, and troubleshooting",
    tone: "Friendly, approachable, patient",
    systemPrompt: `You are the Support Companion for TendProcure, a friendly and patient assistant. Your role is to:
- Answer FAQs about platform usage
- Guide new users through onboarding
- Provide navigation help and feature explanations
- Troubleshoot common issues with empathy
- Offer quick tips and shortcuts
Always maintain a warm, encouraging tone and break down complex processes into simple steps.`,
    avatar: "🤝",
    color: "#3B82F6"
  },
  
  personalized_coach: {
    name: "Personalized Coach",
    role: "Learning guide for procurement mastery",
    tone: "Encouraging, adaptive, insightful",
    systemPrompt: `You are the Personalized Coach for TendProcure, an encouraging learning companion. Your role is to:
- Recommend learning paths based on user progress and goals
- Provide personalized content suggestions
- Summarize complex procurement concepts
- Set motivational reminders and milestones
- Adapt guidance based on user performance and preferences
- Celebrate achievements and encourage growth
Focus on building confidence and expertise in procurement processes.`,
    avatar: "🎯",
    color: "#10B981"
  },
  
  insights_expert: {
    name: "Data & Market Insights Expert",
    role: "Market analysis and data-driven insights",
    tone: "Professional, informative, analytical",
    systemPrompt: `You are the Data & Market Insights Expert for TendProcure, a professional analyst. Your role is to:
- Provide real-time market trends and insights
- Generate personalized analytics and forecasts
- Analyze spending patterns and vendor performance
- Identify cost-saving opportunities
- Alert users to market opportunities and risks
- Create data-driven recommendations for procurement decisions
Deliver insights with clarity and actionable recommendations.`,
    avatar: "📊",
    color: "#8B5CF6"
  },
  
  community_facilitator: {
    name: "Community & Networking Facilitator",
    role: "Connection builder and community engagement",
    tone: "Supportive, community-oriented, enthusiastic",
    systemPrompt: `You are the Community Facilitator for TendProcure, a supportive connector. Your role is to:
- Connect users with relevant mentors and peers
- Suggest networking opportunities and events
- Facilitate collaboration and knowledge sharing
- Notify about industry challenges and competitions
- Help build professional relationships
- Foster community engagement and participation
Focus on building meaningful connections and collaborative growth.`,
    avatar: "🌐",
    color: "#F59E0B"
  }
};

// Context-aware knowledge base
const KNOWLEDGE_BASE = {
  tender_management: {
    concepts: ["RFP creation", "evaluation criteria", "bid analysis", "vendor prequalification"],
    workflows: ["tender_creation", "evaluation_process", "award_management"],
    templates: ["HVAC_tender", "security_tender", "maintenance_tender"],
    compliance: ["procurement_standards", "legal_requirements", "audit_trails"]
  },
  
  vendor_management: {
    concepts: ["vendor scoring", "performance metrics", "prequalification", "relationship management"],
    workflows: ["vendor_onboarding", "performance_review", "vendor_selection"],
    analytics: ["vendor_performance", "cost_analysis", "risk_assessment"],
    networking: ["vendor_directories", "industry_connections", "certification_tracking"]
  },
  
  contract_management: {
    concepts: ["contract lifecycle", "SLA management", "renewal tracking", "compliance monitoring"],
    workflows: ["contract_drafting", "performance_tracking", "renewal_management"],
    risk_management: ["contract_risks", "performance_penalties", "dispute_resolution"],
    optimization: ["cost_optimization", "performance_improvement", "automation_opportunities"]
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      messages, 
      persona = 'support_companion',
      context = 'general',
      userId,
      userProfile,
      sessionData,
      action
    } = await req.json();

    console.log('Super AI Assistant Request:', { persona, context, action, userId });

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Handle specific actions
    if (action) {
      return await handleSpecificAction(action, { userId, userProfile, context });
    }

    // Get AI persona configuration
    const selectedPersona = AI_PERSONAS[persona] || AI_PERSONAS.support_companion;

    // Gather user context for personalization
    const userContext = await gatherUserContext(userId, context);
    
    // Build enhanced system prompt with context
    const enhancedSystemPrompt = buildEnhancedSystemPrompt(selectedPersona, userContext, context);

    // Get contextual knowledge
    const contextualKnowledge = getContextualKnowledge(context, messages);

    // Generate AI response with enhanced context
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: enhancedSystemPrompt },
          { role: 'system', content: `Contextual Knowledge: ${JSON.stringify(contextualKnowledge)}` },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1500,
        tools: getAvailableTools(persona, context),
        tool_choice: "auto"
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    const toolCalls = data.choices[0].message.tool_calls;

    // Handle tool calls if any
    let toolResults = null;
    if (toolCalls && toolCalls.length > 0) {
      toolResults = await handleToolCalls(toolCalls, { userId, context });
    }

    // Generate personalized suggestions
    const suggestions = await generatePersonalizedSuggestions(messages, persona, userContext, context);

    // Generate learning recommendations
    const learningRecommendations = await generateLearningRecommendations(userId, context, messages);

    // Track interaction for analytics
    await trackInteraction(userId, persona, context, messages[messages.length - 1]?.content);

    return new Response(JSON.stringify({ 
      response: aiResponse,
      persona: selectedPersona,
      suggestions: suggestions,
      learningRecommendations: learningRecommendations,
      toolResults: toolResults,
      contextualInsights: await generateContextualInsights(userId, context),
      userProgress: await getUserProgress(userId, context)
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in super-ai-assistant function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      fallbackResponse: "I'm experiencing technical difficulties. Please try again later.",
      persona: AI_PERSONAS.support_companion
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function gatherUserContext(userId: string, context: string) {
  if (!userId) return { isNewUser: true, preferences: {}, activity: [] };

  try {
    // Get user profile and preferences
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    // Get recent user activity
    const { data: recentTenders } = await supabase
      .from('tenders')
      .select('title, category, status, created_at')
      .eq('created_by', userId)
      .order('created_at', { ascending: false })
      .limit(5);

    const { data: recentContracts } = await supabase
      .from('contracts')
      .select('title, status, contract_value, created_at')
      .eq('organization_id', profile?.organization_id)
      .order('created_at', { ascending: false })
      .limit(3);

    return {
      profile,
      recentActivity: {
        tenders: recentTenders || [],
        contracts: recentContracts || []
      },
      isNewUser: !profile?.created_at || (new Date().getTime() - new Date(profile.created_at).getTime()) < 7 * 24 * 60 * 60 * 1000,
      preferences: profile?.department ? { focus: profile.department } : {}
    };
  } catch (error) {
    console.error('Error gathering user context:', error);
    return { isNewUser: true, preferences: {}, activity: [] };
  }
}

function buildEnhancedSystemPrompt(persona: any, userContext: any, context: string): string {
  let prompt = persona.systemPrompt;
  
  // Add user-specific context
  if (userContext.isNewUser) {
    prompt += "\n\nNOTE: This is a new user - provide extra guidance and explain features clearly.";
  }
  
  if (userContext.recentActivity?.tenders?.length > 0) {
    prompt += `\n\nUser's recent tender activity: ${userContext.recentActivity.tenders.map(t => `${t.title} (${t.status})`).join(', ')}`;
  }
  
  if (userContext.profile?.job_title) {
    prompt += `\n\nUser role: ${userContext.profile.job_title} - tailor responses appropriately.`;
  }
  
  // Add context-specific knowledge
  if (KNOWLEDGE_BASE[context]) {
    prompt += `\n\nAvailable knowledge for ${context}: ${JSON.stringify(KNOWLEDGE_BASE[context])}`;
  }
  
  return prompt;
}

function getContextualKnowledge(context: string, messages: any[]): any {
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
  const knowledge = KNOWLEDGE_BASE[context] || {};
  
  // Filter relevant knowledge based on user message
  const relevantKnowledge = {};
  
  Object.keys(knowledge).forEach(key => {
    if (lastMessage.includes(key.replace('_', ' ')) || lastMessage.includes(key)) {
      relevantKnowledge[key] = knowledge[key];
    }
  });
  
  return relevantKnowledge;
}

function getAvailableTools(persona: string, context: string): any[] {
  const tools = [];
  
  // Common tools for all personas
  tools.push({
    type: "function",
    function: {
      name: "search_knowledge_base",
      description: "Search the TendProcure knowledge base for specific information",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query" },
          category: { type: "string", enum: ["tenders", "vendors", "contracts", "analytics"] }
        },
        required: ["query"]
      }
    }
  });

  // Persona-specific tools
  if (persona === 'insights_expert') {
    tools.push({
      type: "function",
      function: {
        name: "generate_analytics_report",
        description: "Generate analytics reports and insights",
        parameters: {
          type: "object",
          properties: {
            reportType: { type: "string", enum: ["spending", "vendor_performance", "tender_analytics"] },
            timeframe: { type: "string", enum: ["week", "month", "quarter", "year"] }
          },
          required: ["reportType"]
        }
      }
    });
  }

  if (persona === 'personalized_coach') {
    tools.push({
      type: "function",
      function: {
        name: "recommend_learning_path",
        description: "Recommend personalized learning paths",
        parameters: {
          type: "object",
          properties: {
            userLevel: { type: "string", enum: ["beginner", "intermediate", "advanced"] },
            focus: { type: "string", enum: ["tenders", "vendors", "contracts", "analytics"] }
          },
          required: ["userLevel", "focus"]
        }
      }
    });
  }

  return tools;
}

async function handleToolCalls(toolCalls: any[], context: any): Promise<any> {
  const results = [];
  
  for (const toolCall of toolCalls) {
    const { name, arguments: args } = toolCall.function;
    
    try {
      let result;
      switch (name) {
        case 'search_knowledge_base':
          result = await searchKnowledgeBase(JSON.parse(args));
          break;
        case 'generate_analytics_report':
          result = await generateAnalyticsReport(JSON.parse(args), context);
          break;
        case 'recommend_learning_path':
          result = await recommendLearningPath(JSON.parse(args), context);
          break;
        default:
          result = { error: `Unknown tool: ${name}` };
      }
      
      results.push({ tool: name, result });
    } catch (error) {
      results.push({ tool: name, error: error.message });
    }
  }
  
  return results;
}

async function generatePersonalizedSuggestions(messages: any[], persona: string, userContext: any, context: string): Promise<string[]> {
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
  
  // Base suggestions by persona
  const baseSuggestions = {
    support_companion: [
      "Show me platform features",
      "Help with navigation",
      "Troubleshoot an issue",
      "Platform tutorials"
    ],
    personalized_coach: [
      "Recommend learning path",
      "Review my progress",
      "Set learning goals",
      "Practice scenarios"
    ],
    insights_expert: [
      "Generate spending report",
      "Market trends analysis",
      "Vendor performance review",
      "Cost optimization insights"
    ],
    community_facilitator: [
      "Find networking events",
      "Connect with mentors",
      "Join industry discussions",
      "Collaboration opportunities"
    ]
  };
  
  let suggestions = baseSuggestions[persona] || baseSuggestions.support_companion;
  
  // Personalize based on user context
  if (userContext.isNewUser) {
    suggestions = [
      "Complete platform tour",
      "Set up my profile",
      "Learn basic features",
      "Quick start guide"
    ];
  } else if (userContext.recentActivity?.tenders?.length > 0) {
    suggestions = [
      "Review active tenders",
      "Tender performance analysis",
      "Optimize tender process",
      "Create new tender"
    ];
  }
  
  return suggestions;
}

async function generateLearningRecommendations(userId: string, context: string, messages: any[]): Promise<any> {
  // Simulate learning recommendations based on user interaction
  const recommendations = {
    immediate: [],
    weekly: [],
    monthly: []
  };
  
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
  
  if (lastMessage.includes('tender')) {
    recommendations.immediate.push({
      type: "tutorial",
      title: "Advanced Tender Creation",
      description: "Learn to create comprehensive tenders with evaluation criteria",
      estimatedTime: "15 minutes"
    });
  }
  
  if (lastMessage.includes('vendor')) {
    recommendations.weekly.push({
      type: "course",
      title: "Vendor Relationship Management",
      description: "Master vendor evaluation and relationship building",
      estimatedTime: "2 hours"
    });
  }
  
  return recommendations;
}

async function generateContextualInsights(userId: string, context: string): Promise<any> {
  try {
    // Get user's organization data for insights
    const { data: profile } = await supabase
      .from('profiles')
      .select('organization_id')
      .eq('user_id', userId)
      .single();

    if (!profile?.organization_id) return null;

    // Generate basic insights
    const insights = {
      summary: "Your procurement activity is trending upward",
      metrics: {
        activeTenders: Math.floor(Math.random() * 10) + 1,
        pendingContracts: Math.floor(Math.random() * 5) + 1,
        vendorScore: (Math.random() * 20 + 80).toFixed(1)
      },
      recommendations: [
        "Consider consolidating similar tenders for better efficiency",
        "Review vendor performance metrics monthly",
        "Set up automated reminders for contract renewals"
      ]
    };

    return insights;
  } catch (error) {
    console.error('Error generating insights:', error);
    return null;
  }
}

async function getUserProgress(userId: string, context: string): Promise<any> {
  // Simulate user progress tracking
  return {
    level: "Intermediate",
    completedTasks: Math.floor(Math.random() * 50) + 10,
    totalTasks: 100,
    badges: ["First Tender", "Vendor Expert", "Contract Master"],
    currentStreak: Math.floor(Math.random() * 10) + 1,
    nextMilestone: "Complete 5 more vendor evaluations"
  };
}

async function trackInteraction(userId: string, persona: string, context: string, userMessage: string) {
  try {
    // Track interaction for analytics (simplified)
    console.log('Tracking interaction:', { userId, persona, context, messageLength: userMessage?.length });
    // In a real implementation, you'd store this in a dedicated analytics table
  } catch (error) {
    console.error('Error tracking interaction:', error);
  }
}

// Tool implementation functions
async function searchKnowledgeBase(args: any): Promise<any> {
  const { query, category } = args;
  
  // Simulate knowledge base search
  const results = [
    {
      title: `${category} Best Practices`,
      content: `Comprehensive guide for ${category} management in procurement`,
      relevance: 0.95,
      category: category
    },
    {
      title: `${category} Templates`,
      content: `Ready-to-use templates for ${category} processes`,
      relevance: 0.87,
      category: category
    }
  ];
  
  return { query, results, totalFound: results.length };
}

async function generateAnalyticsReport(args: any, context: any): Promise<any> {
  const { reportType, timeframe = 'month' } = args;
  
  // Simulate analytics report generation
  const report = {
    type: reportType,
    timeframe: timeframe,
    summary: `${reportType} analysis for the past ${timeframe}`,
    metrics: {
      totalValue: (Math.random() * 1000000 + 100000).toFixed(0),
      changePercent: (Math.random() * 20 - 10).toFixed(1),
      topCategory: "HVAC Services",
      efficiency: (Math.random() * 20 + 75).toFixed(1)
    },
    charts: ["spending_trend", "category_breakdown", "vendor_performance"],
    insights: [
      "HVAC spending increased by 12% this quarter",
      "Top-performing vendors consistently deliver on time",
      "Potential savings identified in maintenance contracts"
    ]
  };
  
  return report;
}

async function recommendLearningPath(args: any, context: any): Promise<any> {
  const { userLevel, focus } = args;
  
  const learningPaths = {
    beginner: {
      tenders: [
        "Introduction to Tender Management",
        "Basic Evaluation Criteria",
        "Simple Tender Creation",
        "Vendor Communication Basics"
      ],
      vendors: [
        "Vendor Directory Navigation",
        "Basic Vendor Evaluation",
        "Vendor Registration Process",
        "Performance Tracking Fundamentals"
      ]
    },
    intermediate: {
      tenders: [
        "Advanced Tender Strategies",
        "Complex Evaluation Methods",
        "Risk Assessment in Tenders",
        "Multi-Phase Tender Management"
      ],
      vendors: [
        "Advanced Vendor Analytics",
        "Vendor Relationship Optimization",
        "Performance Benchmarking",
        "Strategic Vendor Partnerships"
      ]
    },
    advanced: {
      tenders: [
        "Enterprise Tender Management",
        "AI-Assisted Tender Optimization",
        "Global Tender Strategies",
        "Tender Process Automation"
      ],
      vendors: [
        "Vendor Ecosystem Management",
        "Predictive Vendor Analytics",
        "Strategic Vendor Development",
        "Vendor Risk Management"
      ]
    }
  };
  
  const path = learningPaths[userLevel]?.[focus] || learningPaths.beginner.tenders;
  
  return {
    level: userLevel,
    focus: focus,
    modules: path.map((title, index) => ({
      id: index + 1,
      title,
      duration: "30-45 minutes",
      difficulty: userLevel,
      prerequisites: index > 0 ? [path[index - 1]] : []
    })),
    estimatedCompletion: `${path.length * 2} weeks`,
    certificationAvailable: userLevel === 'advanced'
  };
}

async function handleSpecificAction(action: string, context: any): Promise<Response> {
  const { userId, userProfile, context: userContext } = context;
  
  switch (action) {
    case 'get_dashboard_summary':
      const summary = await getDashboardSummary(userId);
      return new Response(JSON.stringify({ action, data: summary }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
      
    case 'get_learning_progress':
      const progress = await getUserProgress(userId, userContext);
      return new Response(JSON.stringify({ action, data: progress }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
      
    default:
      return new Response(JSON.stringify({ 
        action, 
        error: 'Unknown action',
        availableActions: ['get_dashboard_summary', 'get_learning_progress']
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
  }
}

async function getDashboardSummary(userId: string): Promise<any> {
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('organization_id')
      .eq('user_id', userId)
      .single();

    const summary = {
      overview: {
        activeTenders: Math.floor(Math.random() * 15) + 1,
        pendingApprovals: Math.floor(Math.random() * 8) + 1,
        completedThisMonth: Math.floor(Math.random() * 25) + 5,
        totalValue: (Math.random() * 5000000 + 500000).toFixed(0)
      },
      recentActivity: [
        "New HVAC tender created",
        "Vendor ABC Performance review completed", 
        "Contract renewal for Security Services",
        "Compliance report generated"
      ],
      alerts: [
        "3 tenders closing this week",
        "Vendor evaluation overdue",
        "Contract renewal deadline approaching"
      ],
      quickActions: [
        "Create New Tender",
        "Review Pending Bids", 
        "Generate Analytics Report",
        "Update Vendor Scores"
      ]
    };

    return summary;
  } catch (error) {
    console.error('Error getting dashboard summary:', error);
    return { error: 'Unable to fetch dashboard summary' };
  }
}