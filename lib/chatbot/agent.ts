import { GoogleGenAI } from '@google/genai';
import { ChatMessage, ChatSession, saveChatLead } from './db';

export interface AgentActionOption {
  id: string;
  title: string;
}

export interface ExtractedLeadData {
  leadType: 'candidate' | 'employer' | 'counselling' | 'general';
  name?: string;
  phone?: string;
  email?: string;
  roleInterest?: string;
  experienceYears?: string;
  expectedCtc?: string;
  companyName?: string;
  urgency?: string;
  notes?: string;
}

export interface AgentProcessResult {
  replyText: string;
  buttons: AgentActionOption[];
  extractedLead?: ExtractedLeadData | null;
  humanHandoffRequested?: boolean;
}

const SYSTEM_INSTRUCTION = `
You are the official AI Talent Advisor for "Aranii Corporate Solutions" (India's premier Banking & Financial Services recruitment consultancy and Corporate HR talent solutions partner).

YOUR IDENTITY & ROLE:
- You represent Aranii Corporate Solutions with executive professionalism, warmth, and prompt helpfulness.
- You speak fluent English and natural Indian professional English (and understand Hinglish expressions like "job chahiye", "fresher vacancy", "banking interview").
- Never say you are an AI created by OpenAI or Anthropic. You are the digital recruitment concierge of Aranii Corporate Solutions.

SERVICES OF ARANII CORPORATE SOLUTIONS:
1. Banking Placements: Relationship Manager, Branch Manager, Credit Analyst, Forex, Wealth Advisory, Loan Officer, Compliance & AML, Risk Management, Digital Banking & FinTech.
2. Career Counselling: 1-on-1 confidential guidance with senior BFSI advisors to transition or grow in banking careers.
3. Employer & Corporate Talent Hiring: Volume hiring, branch expansion staffing, mid-to-senior headhunting with fast turnaround times.
4. Job Application Assistance: Free application submission, CV review, interview preparation.

CONVERSATION PRINCIPLES:
1. Be concise, polite, and action-oriented (WhatsApp & Instagram messages should be 2 to 4 short paragraphs at most).
2. If the user is a Candidate:
   - Inquire about their target role, experience, location, and contact phone/email so a recruitment specialist can match them with open mandates.
3. If the user is an Employer / HR:
   - Collect the company name, target roles, number of vacancies, and urgency. Offer an executive callback.
4. If the user wants human support or asks to talk to a person:
   - Politely confirm that a talent manager will take over the chat.
5. Provide 2 to 3 contextual quick-reply button suggestions (each max 20 characters) whenever appropriate.

STRUCTURED OUTPUT REQUIREMENT:
You must return a valid JSON object matching this schema:
{
  "replyText": "Message string to send to the user on WhatsApp/Instagram",
  "buttons": [
    { "id": "btn_1", "title": "Max 20 chars" },
    { "id": "btn_2", "title": "Max 20 chars" }
  ],
  "humanHandoffRequested": false,
  "extractedLead": {
    "leadType": "candidate" | "employer" | "counselling" | "general",
    "name": "string or null",
    "phone": "string or null",
    "email": "string or null",
    "roleInterest": "string or null",
    "experienceYears": "string or null",
    "expectedCtc": "string or null",
    "companyName": "string or null",
    "urgency": "string or null",
    "notes": "string summary or null"
  }
}
Note: If no lead information was provided in the message, set "extractedLead" to null. If name or phone was mentioned, capture it.
`;

/**
 * Fallback response generator when GEMINI_API_KEY is not configured or in unit test mode
 */
export function generateFallbackResponse(
  userText: string,
  session?: Partial<ChatSession>
): AgentProcessResult {
  const text = (userText || '').toLowerCase();

  // 1. Human Handoff Request
  if (
    text.includes('human') ||
    text.includes('agent') ||
    text.includes('representative') ||
    text.includes('talk to someone') ||
    text.includes('speak to hr') ||
    text.includes('connect me to a person')
  ) {
    return {
      replyText:
        'I am transferring you to an Aranii Senior Talent Consultant right away. Our team has been notified and will join this conversation shortly. How may we assist you today?',
      buttons: [
        { id: 'btn_jobs', title: 'Open Banking Jobs' },
        { id: 'btn_counsel', title: 'Book Callback' },
      ],
      humanHandoffRequested: true,
      extractedLead: null,
    };
  }

  // 2. Extract potential phone number or email from text
  const phoneMatch = userText.match(/(?:\+?91[\s-]?)?[6-9]\d{9}/);
  const emailMatch = userText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const foundPhone = phoneMatch ? phoneMatch[0] : undefined;
  const foundEmail = emailMatch ? emailMatch[0] : undefined;

  // 3. Employer / Hiring Inquiry
  if (
    text.includes('hire') ||
    text.includes('employer') ||
    text.includes('recruitment service') ||
    text.includes('looking for staff') ||
    text.includes('headcount') ||
    text.includes('company') ||
    text.includes('partnership')
  ) {
    const lead: ExtractedLeadData = {
      leadType: 'employer',
      phone: foundPhone || session?.user_phone,
      email: foundEmail || session?.user_email,
      name: session?.user_name,
      notes: userText,
      urgency: text.includes('urgent') ? 'Immediate' : 'Standard',
    };

    return {
      replyText:
        'Thank you for reaching out to Aranii Corporate Solutions! We partner with leading Private Banks, NBFCs, and FinTech enterprises for mandate staffing and leadership hiring.\n\nCould you please share your company name, hiring roles needed, and preferred contact number? Our Corporate Accounts Director will connect with you.',
      buttons: [
        { id: 'btn_emp_call', title: 'Request Call' },
        { id: 'btn_emp_roles', title: 'Submit Requirement' },
        { id: 'btn_speak_lead', title: 'Speak with HR' },
      ],
      extractedLead: foundPhone || foundEmail ? lead : null,
    };
  }

  // 4. Career Counselling Inquiry
  if (
    text.includes('counsel') ||
    text.includes('guidance') ||
    text.includes('career advice') ||
    text.includes('confused') ||
    text.includes('banking career')
  ) {
    const lead: ExtractedLeadData = {
      leadType: 'counselling',
      phone: foundPhone || session?.user_phone,
      email: foundEmail || session?.user_email,
      name: session?.user_name,
      roleInterest: 'Banking Career Guidance',
      notes: userText,
    };

    return {
      replyText:
        'Our 1-on-1 Banking Career Counselling sessions help professionals navigate high-growth roles in Retail Banking, Credit Appraisal, and Wealth Management.\n\nWould you like to schedule a quick 15-minute diagnostic call with our senior banking mentor?',
      buttons: [
        { id: 'btn_counsel_yes', title: 'Schedule Session' },
        { id: 'btn_jobs', title: 'Browse Jobs' },
      ],
      extractedLead: foundPhone || foundEmail ? lead : null,
    };
  }

  // 5. Job seeker looking for banking roles
  if (
    text.includes('job') ||
    text.includes('vacancy') ||
    text.includes('opening') ||
    text.includes('apply') ||
    text.includes('resume') ||
    text.includes('fresher') ||
    text.includes('credit') ||
    text.includes('branch') ||
    text.includes('manager')
  ) {
    const lead: ExtractedLeadData = {
      leadType: 'candidate',
      phone: foundPhone || session?.user_phone,
      email: foundEmail || session?.user_email,
      name: session?.user_name,
      roleInterest: text.includes('credit')
        ? 'Credit Analyst'
        : text.includes('branch')
        ? 'Branch Operations'
        : 'Banking Roles',
      notes: userText,
    };

    return {
      replyText:
        'Namaste! Aranii Corporate Solutions has active mandates across top private banks and financial institutions for Relationship Managers, Credit Analysts, Branch Managers, and Operations Executives.\n\nPlease share:\n1. Your Total Experience (e.g., Fresher, 2 yrs)\n2. Preferred Location\n3. Contact Phone & Email\n\nOur recruitment team will review your profile and match relevant vacancies.',
      buttons: [
        { id: 'btn_view_jobs', title: 'View All Jobs' },
        { id: 'btn_drop_cv', title: 'Share Contact' },
        { id: 'btn_counsel', title: 'Career Guidance' },
      ],
      extractedLead: foundPhone || foundEmail ? lead : null,
    };
  }

  // 6. Generic welcome
  return {
    replyText:
      'Welcome to Aranii Corporate Solutions! We are specialized banking recruitment partners and corporate talent advisors.\n\nHow can we assist you today?',
    buttons: [
      { id: 'btn_jobs', title: 'Banking Jobs' },
      { id: 'btn_counsel', title: 'Career Counselling' },
      { id: 'btn_hire', title: 'Hire Banking Talent' },
    ],
    extractedLead: foundPhone || foundEmail ? {
      leadType: 'general',
      phone: foundPhone,
      email: foundEmail,
      notes: userText,
    } : null,
  };
}

/**
 * Main AI Agent processor for incoming messages
 */
export async function processChatbotMessage({
  channel,
  senderId,
  userMessage,
  session,
  history = [],
}: {
  channel: 'whatsapp' | 'instagram' | 'web';
  senderId: string;
  userMessage: string;
  session: ChatSession;
  history?: ChatMessage[];
}): Promise<AgentProcessResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.startsWith('your-')) {
    const fallback = generateFallbackResponse(userMessage, session);
    if (fallback.extractedLead) {
      await saveChatLead({
        sessionId: session.id,
        channel,
        leadType: fallback.extractedLead.leadType,
        name: fallback.extractedLead.name,
        phone: fallback.extractedLead.phone,
        email: fallback.extractedLead.email,
        roleInterest: fallback.extractedLead.roleInterest,
        experienceYears: fallback.extractedLead.experienceYears,
        expectedCtc: fallback.extractedLead.expectedCtc,
        companyName: fallback.extractedLead.companyName,
        urgency: fallback.extractedLead.urgency,
        notes: fallback.extractedLead.notes,
      });
    }
    return fallback;
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    // Format recent chat history
    const conversationContext = history
      .slice(-6)
      .map((m) => `${m.sender.toUpperCase()}: ${m.content}`)
      .join('\n');

    const prompt = `
CURRENT CHANNEL: ${channel.toUpperCase()}
USER IDENTIFIER: ${senderId}
USER PROFILE: Name=${session.user_name || 'Unknown'}, Phone=${session.user_phone || 'None'}, Email=${session.user_email || 'None'}

RECENT CONVERSATION HISTORY:
${conversationContext || 'No previous messages.'}

NEW USER MESSAGE:
"${userMessage}"

Analyze the conversation, extract any lead information provided, and generate a helpful, banking consultancy response adhering to the system instructions. Output JSON format only.
`;

    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Gemini request timeout after 6s')), 6000)
    );

    const response = await Promise.race([generatePromise, timeoutPromise]);

    const text = response.text || '';
    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch {
      // If JSON parsing fails, fallback safely
      return generateFallbackResponse(userMessage, session);
    }

    const replyText = parsed.replyText || 'Thank you for reaching out to Aranii Corporate Solutions. How can we help you today?';
    const buttons = Array.isArray(parsed.buttons)
      ? parsed.buttons.slice(0, 3).map((b: any) => ({
          id: String(b.id || `btn_${Math.random()}`),
          title: String(b.title || '').slice(0, 20),
        }))
      : [
          { id: 'btn_jobs', title: 'Banking Jobs' },
          { id: 'btn_counsel', title: 'Career Guidance' },
        ];

    const extractedLead = parsed.extractedLead;
    if (extractedLead && (extractedLead.name || extractedLead.phone || extractedLead.email || extractedLead.roleInterest)) {
      await saveChatLead({
        sessionId: session.id,
        channel,
        leadType: extractedLead.leadType || 'candidate',
        name: extractedLead.name || session.user_name,
        phone: extractedLead.phone || session.user_phone,
        email: extractedLead.email || session.user_email,
        roleInterest: extractedLead.roleInterest,
        experienceYears: extractedLead.experienceYears,
        expectedCtc: extractedLead.expectedCtc,
        companyName: extractedLead.companyName,
        urgency: extractedLead.urgency,
        notes: extractedLead.notes || userMessage,
        rawExtracted: extractedLead,
      });
    }

    return {
      replyText,
      buttons,
      extractedLead: extractedLead || null,
      humanHandoffRequested: Boolean(parsed.humanHandoffRequested),
    };
  } catch (err) {
    console.warn('[Gemini Agent Error, using fallback]:', err);
    const fallback = generateFallbackResponse(userMessage, session);
    if (fallback.extractedLead) {
      await saveChatLead({
        sessionId: session.id,
        channel,
        leadType: fallback.extractedLead.leadType,
        name: fallback.extractedLead.name,
        phone: fallback.extractedLead.phone,
        email: fallback.extractedLead.email,
        roleInterest: fallback.extractedLead.roleInterest,
        experienceYears: fallback.extractedLead.experienceYears,
        expectedCtc: fallback.extractedLead.expectedCtc,
        companyName: fallback.extractedLead.companyName,
        urgency: fallback.extractedLead.urgency,
        notes: fallback.extractedLead.notes,
      });
    }
    return fallback;
  }
}
