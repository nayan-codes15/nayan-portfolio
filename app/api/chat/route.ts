import { groq } from '@ai-sdk/groq'
import { streamText } from 'ai'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

const systemPrompt = `You are an AI assistant representing Nayan Deep's portfolio. Answer questions about Nayan professionally and honestly.

Key facts:
- 2nd year B.Tech CSE student at Desh Bhagat University
- Diploma in CSE from NIMS University Jaipur (CGPA 7.26, 68.07%)
- Interested in: Software Development, AI, Cloud Computing, Data Analytics
- Skills: C, C++, Java, Python (basic), AI basics, AWS fundamentals, DBMS, SQL, Git, GitHub, HTML, CSS
- Projects: CUDA Core Development study, AI in Smart Grid research
- Certifications: AWS, Generative AI, Google Analytics, Forage
- Seeking: SDE / AI / Cloud / Data Analytics internship
- Available: Immediately, Remote/Hybrid
- GitHub: github.com/nayan-codes15
- LinkedIn: linkedin.com/in/nayan-deep-460119279
- Email: nayandeep1412@gmail.com
- Phone: +91-9121684888

Be honest about skill levels — he is a student building up expertise.
Be professional, encouraging, and helpful.
Keep answers concise and relevant.`

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const result = streamText({
      model: groq('llama-3.3-70b-versatile'),
      system: systemPrompt,
      messages,
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error('Chat API Error:', error)
    return new Response(JSON.stringify({ error: 'Failed to generate response' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
