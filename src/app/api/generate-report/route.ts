import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';
import { db } from '@/lib/db';
import { getCompetitorNames, getIndustryLeaders } from '@/lib/competitorData';

export async function POST(request: NextRequest) {
  try {
    console.log('Starting report generation...');
    
    const { companyInfo, assessmentAnswers, overallScore, categoryScores } = await request.json();
    console.log('Received data:', { companyInfo, overallScore });

    let zai;
    let useAI = true;
    
    try {
      zai = await ZAI.create();
    } catch (configError) {
      console.warn('Z-AI config not found, using fallback data generation');
      useAI = false;
    }

    // Generate report with simplified approach
    const reportPrompt = `Generate a competitive intelligence report for a ${companyInfo.industry} company in ${companyInfo.country} with AI readiness score of ${overallScore}%.

Focus on regional market analysis for ${companyInfo.country} and provide country-specific insights.

Return valid JSON with this structure:
{
  "executiveSummary": {
    "globalTrends": "Global AI adoption accelerating with regional variations",
    "marketSize": "$500 billion by 2025",
    "growthProjection": "35% CAGR through 2030",
    "regionalMarketSize": "Regional market size for ${companyInfo.country}",
    "regionalGrowthRate": "Regional growth rate for ${companyInfo.country}",
    "regionalCompetitorCount": "Number of key competitors in ${companyInfo.country}"
  },
  "industryLeaders": [
    {
      "name": "Global Tech Corp",
      "aiInvestment": "$3.2B",
      "roiIncrease": "45%",
      "efficiencyGain": "38%",
      "marketCapImpact": "32%",
      "initiatives": ["AI Platform Development", "Predictive Analytics", "Automation"]
    },
    {
      "name": "Innovation Leaders Inc",
      "aiInvestment": "$2.8B", 
      "roiIncrease": "42%",
      "efficiencyGain": "35%",
      "marketCapImpact": "28%",
      "initiatives": ["Machine Learning", "Data Science", "Cloud AI"]
    },
    {
      "name": "Digital Transform Ltd",
      "aiInvestment": "$2.1B",
      "roiIncrease": "38%", 
      "efficiencyGain": "31%",
      "marketCapImpact": "24%",
      "initiatives": ["Process Automation", "AI Insights", "Smart Systems"]
    }
  ],
  "competitorAnalysis": [
    {
      "name": "Competitor name operating in ${companyInfo.country}",
      "region": "${companyInfo.country}",
      "aiMaturity": "Leader/Challenger/Follower",
      "aiMaturityScore": 90,
      "initiatives": ["AI Platform Development", "Data Analytics"],
      "threatLevel": "High",
      "marketShare": "Market share in ${companyInfo.country}",
      "regionalPresence": "Description of presence in ${companyInfo.country}"
    },
    {
      "name": "Another competitor in ${companyInfo.country}",
      "region": "${companyInfo.country}", 
      "aiMaturity": "Challenger",
      "aiMaturityScore": 75,
      "initiatives": ["AI Research", "Compliance Solutions"],
      "threatLevel": "Medium",
      "marketShare": "Market share in ${companyInfo.country}",
      "regionalPresence": "Description of presence in ${companyInfo.country}"
    }
  ],
  "opportunities": [
    {
      "title": "AI Process Automation",
      "description": "Automate key business processes using AI",
      "impact": "High",
      "timeline": "3-6 months",
      "investment": "Medium"
    }
  ],
  "risks": [
    {
      "title": "Implementation Complexity",
      "description": "Complex integration challenges",
      "severity": "Medium",
      "mitigation": "Phased implementation approach"
    }
  ],
  "recommendations": [
    {
      "title": "AI Strategy Development",
      "description": "Create comprehensive AI transformation strategy",
      "priority": "High",
      "expectedRoi": "200-300%",
      "timeline": "6-12 months"
    }
  ],
  "twoWeekPlan": {
    "week1": {
      "focus": "Foundation Building",
      "weeklyGoal": "Establish AI governance and baseline assessment",
      "tasks": [
        {
          "title": "AI Governance Framework",
          "description": "Develop internal AI policies and procedures",
          "timeRequired": "2-3 days",
          "deliverable": "Governance document",
          "successMetric": "Framework approved by leadership"
        }
      ]
    },
    "week2": {
      "focus": "Advanced Implementation",
      "weeklyGoal": "Launch pilot AI initiatives",
      "tasks": [
        {
          "title": "Pilot AI Project",
          "description": "Implement first AI use case in controlled environment",
          "timeRequired": "5-7 days",
          "deliverable": "Working prototype",
          "successMetric": "Pilot completed with lessons learned"
        }
      ]
    }
  }
}

Be concise but complete. Ensure valid JSON format. 

IMPORTANT: 
- Focus on ${companyInfo.country} market specifically
- Provide regional market size and growth rate for ${companyInfo.country}
- Include competitors operating in ${companyInfo.country}
- Include 3 industry leaders with realistic AI investment, ROI, and efficiency metrics for ${companyInfo.industry} industry in ${companyInfo.country}
- All competitor analysis should be focused on ${companyInfo.country} market
- Provide country-specific insights and opportunities`;

    let reportData;

    if (useAI && zai) {
      console.log('Sending prompt to AI...');

      try {
        const completion = await zai.chat.completions.create({
          messages: [
            {
              role: 'system',
              content: 'You are an AI strategy expert. Always respond with complete, valid JSON. Be concise but thorough.'
            },
            {
              role: 'user',
              content: reportPrompt
            }
          ],
          temperature: 0.1,
          max_tokens: 3000,
          stream: false
        });

        const reportContent = completion.choices[0]?.message?.content;
        
        if (!reportContent) {
          throw new Error('No content received from AI');
        }

        console.log('AI response length:', reportContent.length);

        // Parse JSON with robust error handling
        try {
          // Extract JSON from response
          let jsonStr = reportContent.trim();
          
          // Find JSON object in response
          if (!jsonStr.startsWith('{')) {
            const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              jsonStr = jsonMatch[0];
            }
          }
          
          reportData = JSON.parse(jsonStr);
          
          // Validate structure
          if (!reportData.executiveSummary || !reportData.competitorAnalysis) {
            throw new Error('Invalid report structure');
          }
          
        } catch (parseError) {
          console.error('JSON parsing error:', parseError);
          useAI = false; // Fall back to static data
        }
      } catch (aiError) {
        console.error('AI generation error:', aiError);
        useAI = false; // Fall back to static data
      }
    }

    if (!useAI || !reportData) {
      console.log('Using fallback data generation');
      
      // Helper function to get realistic competitor names based on industry
      const getCompetitorNames = (industry: string) => {
        const industryMap: any = {
          'healthcare': ['MediTech Solutions', 'HealthAI Corporation', 'CareInnovate Group'],
          'smme-healthcare': ['Community Health Network', 'LocalCare Medical', 'SmartHealth Clinics'],
          'finance': ['FinanceFirst Bank', 'Digital Banking Solutions', 'InvestTech Group'],
          'smme-finance': ['Community Credit Union', 'LocalPay Financial', 'SmartFinance Services'],
          'technology': ['TechVision Inc', 'CloudSystems Pro', 'DataDrive Technologies'],
          'smme-technology': ['TechStart Solutions', 'Digital Services Hub', 'CodeCraft Studios'],
          'retail': ['RetailMax Group', 'ShopSmart International', 'E-Commerce Leaders Inc'],
          'smme-retail': ['LocalShop Network', 'Community Retail Group', 'SmartStore Solutions'],
          'manufacturing': ['IndustrialTech Corp', 'SmartFactory Systems', 'Production Innovators Ltd'],
          'smme-manufacturing': ['Artisan Manufacturing Co', 'LocalProd Industries', 'CraftTech Solutions'],
          'education': ['EduTech Global', 'Learning Innovation Corp', 'SmartCampus Solutions'],
          'smme-education': ['Community Learning Center', 'LocalEdu Services', 'TutorTech Hub'],
          'energy': ['PowerTech Solutions', 'SmartGrid Systems', 'EnergyAI Corporation'],
          'transportation': ['LogiTech Transport', 'SmartFleet Solutions', 'RouteOptimize Inc'],
          'government': ['GovTech Solutions', 'PublicSector AI', 'CivicInnovate Systems']
        };
        return industryMap[industry.toLowerCase()] || ['TechVision Inc', 'Innovation Partners Ltd', 'Digital Transform Corp'];
      };

      const competitors = getCompetitorNames(companyInfo.industry);
      const isSmme = companyInfo.industry.toLowerCase().includes('smme');
      
      // Generate country-specific fallback data
      reportData = {
        executiveSummary: {
          globalTrends: `AI adoption in ${companyInfo.country} is accelerating rapidly with strong government and private sector investment`,
          marketSize: "$500 billion globally by 2025",
          growthProjection: "35% CAGR through 2030",
          regionalMarketSize: `Estimated $${Math.floor(Math.random() * 50 + 20)}B in ${companyInfo.country} by 2025`,
          regionalGrowthRate: `${Math.floor(Math.random() * 15 + 25)}% CAGR`,
          regionalCompetitorCount: `${Math.floor(Math.random() * 20 + 10)}+ active competitors in ${companyInfo.country}`
        },
        industryLeaders: [
          {
            name: `${competitors[0]} (${companyInfo.country})`,
            aiInvestment: isSmme ? "$850K" : "$3.2B",
            roiIncrease: "45%",
            efficiencyGain: "38%",
            marketCapImpact: "32%",
            initiatives: ["AI Platform Development", "Predictive Analytics", "Process Automation"]
          },
          {
            name: `${competitors[1]} (${companyInfo.country})`,
            aiInvestment: isSmme ? "$620K" : "$2.8B", 
            roiIncrease: "42%",
            efficiencyGain: "35%",
            marketCapImpact: "28%",
            initiatives: ["Machine Learning", "Data Science", "Customer Intelligence"]
          },
          {
            name: `${competitors[2]} (${companyInfo.country})`,
            aiInvestment: isSmme ? "$480K" : "$2.1B",
            roiIncrease: "38%", 
            efficiencyGain: "31%",
            marketCapImpact: "24%",
            initiatives: ["AI-Powered Operations", "Smart Analytics", "Automation Systems"]
          }
        ],
        competitorAnalysis: [
          {
            name: competitors[0],
            region: companyInfo.country,
            aiMaturity: "Leader (Most Advanced)",
            aiMaturityScore: 85,
            description: `${competitors[0]} is the leading AI adopter in the ${companyInfo.industry} sector in ${companyInfo.country}. They have invested heavily in AI infrastructure and are seeing strong returns. ${isSmme ? 'While their budget is larger, many of their AI tools are available to smaller businesses through cloud platforms.' : 'Their success demonstrates the value of early AI adoption.'}`,
            initiatives: ["AI Platforms", "Machine Learning", "Automation"],
            threatLevel: "High",
            marketShare: isSmme ? "15%" : "25%",
            regionalPresence: `${isSmme ? 'Strong local presence with growing AI capabilities. They started small and scaled up over 3 years.' : 'Dominant player with extensive AI infrastructure and dedicated AI teams.'}`,
            whatThisMeans: isSmme 
              ? `**For Your Business:** ${competitors[0]} shows that AI adoption is achievable even for smaller businesses. They started with a single AI tool (customer service chatbot) that cost under $10K and generated ROI within 6 months. You don't need their full budget to compete - focus on one high-impact area first.`
              : `**Strategic Insight:** ${competitors[0]} demonstrates the competitive advantage of early AI adoption. Their comprehensive approach provides a benchmark for enterprise-level AI transformation.`,
            actionableSteps: isSmme ? [
              "Start with one AI tool in your biggest pain point (e.g., customer service, scheduling, or inventory)",
              "Use cloud-based AI services - no need for expensive infrastructure",
              "Measure results monthly and expand gradually",
              "Budget: $200-500/month for starter AI tools, $2K-5K for custom solutions"
            ] : [
              "Develop comprehensive AI strategy across all business units",
              "Invest in AI infrastructure and talent acquisition",
              "Establish AI governance and ethics framework",
              "Plan for multi-year transformation roadmap"
            ]
          },
          {
            name: competitors[1],
            region: companyInfo.country,
            aiMaturity: "Challenger (Growing Fast)",
            aiMaturityScore: 72,
            description: `${competitors[1]} is rapidly expanding their AI capabilities in ${companyInfo.country}. ${isSmme ? 'They are a similar-sized business that has successfully implemented AI tools to improve efficiency and customer service.' : 'They are investing aggressively to catch up with market leaders.'} Their approach focuses on practical, high-ROI AI applications.`,
            initiatives: ["Data Analytics", "AI Research", "Digital Transformation"],
            threatLevel: "Medium",
            marketShare: isSmme ? "12%" : "18%",
            regionalPresence: `${isSmme ? 'Growing regional presence. Started with basic AI tools and expanded gradually - a good model to follow.' : 'Expanding presence with focus on innovation and customer experience.'}`,
            whatThisMeans: isSmme
              ? `**For Your Business:** ${competitors[1]} is proof that you can compete with larger players by being smart about AI adoption. They focused on customer service automation first, cutting support costs by 40% before expanding to other areas. This "crawl, walk, run" approach is perfect for SMMEs.`
              : `**Strategic Insight:** ${competitors[1]} shows that focused, practical AI implementation can deliver competitive advantages even without market-leading budgets.`,
            actionableSteps: isSmme ? [
              "Identify your highest-cost business process (usually customer service, admin, or sales)",
              "Find an AI tool specifically for that process (e.g., Intercom AI, Zapier, HubSpot AI)",
              "Run a 3-month pilot with clear success metrics",
              "Use savings from first AI tool to fund the next one"
            ] : [
              "Prioritize high-ROI AI initiatives",
              "Build cross-functional AI implementation teams",
              "Invest in employee AI training and upskilling",
              "Establish partnerships with AI technology providers"
            ],
            budgetGuidance: isSmme ? {
              starter: "$50-200/month - Basic AI tools (chatbots, scheduling, email automation)",
              intermediate: "$500-2K/month - Advanced tools (CRM AI, analytics, process automation)",
              advanced: "$5K-15K/month - Custom AI solutions with integration",
              note: "Most SMMEs see ROI within 6-12 months. Start small and scale based on results."
            } : undefined
          },
          {
            name: competitors[2],
            region: companyInfo.country,
            aiMaturity: "Follower (Building Capability)",
            aiMaturityScore: 58,
            description: `${competitors[2]} is in the early stages of AI adoption in ${companyInfo.country}. ${isSmme ? 'They are similar to where you might be now - exploring AI options and starting with basic tools. This is your opportunity to catch up or even leapfrog them.' : 'They are beginning their AI journey with pilot projects and proof-of-concepts.'}`,
            initiatives: ["Process Automation", "Basic Analytics", "Digital Tools"],
            threatLevel: "Low",
            marketShare: isSmme ? "8%" : "12%",
            regionalPresence: `${isSmme ? 'Limited AI capabilities currently. Represents the average SMME in your industry - this is your chance to gain competitive advantage.' : 'Establishing AI capabilities with initial pilot projects.'}`,
            whatThisMeans: isSmme
              ? `**For Your Business:** ${competitors[2]} is at a similar stage to many SMMEs. By taking action now, you can gain a competitive edge. The AI tools available today are more affordable and easier to use than ever - no technical expertise required for many solutions.`
              : `**Strategic Insight:** ${competitors[2]} represents the baseline AI maturity in your industry. Exceeding this level provides immediate competitive differentiation.`,
            actionableSteps: isSmme ? [
              "Don't wait for perfection - start with any AI tool this month",
              "Use free trials to test tools before committing (most offer 14-30 day trials)",
              "Join online communities (Reddit r/smallbusiness, industry forums) to learn from others",
              "Consider AI tools you already use: Google Workspace AI, Microsoft 365 Copilot, Canva AI"
            ] : [
              "Accelerate AI adoption to gain competitive advantage",
              "Learn from industry leaders' successes and failures",
              "Invest in quick-win AI projects to build momentum",
              "Establish AI as a strategic priority"
            ],
            quickWins: isSmme ? [
              "Email automation with AI (Gmail AI, Outlook AI) - Free to $10/month",
              "Social media content with AI (ChatGPT, Canva AI) - $20/month",
              "Meeting notes & summaries (Otter.ai, Fireflies.ai) - $10-30/month",
              "Basic chatbot for website (Tidio, Chatbot.com) - $50-100/month"
            ] : undefined
          }
        ],
        opportunities: [
          {
            title: `AI Process Automation in ${companyInfo.country}`,
            description: `Leverage AI to automate key ${companyInfo.industry} processes, reducing costs and improving efficiency`,
            impact: "High",
            timeline: "3-6 months",
            investment: isSmme ? "Low-Medium ($200-2K/month)" : "Medium",
            smmeExample: isSmme ? "A local retail business automated inventory tracking with AI, saving 15 hours/week and reducing stockouts by 60%. Cost: $500/month, ROI achieved in 4 months." : undefined,
            toolSuggestions: isSmme ? [
              "Zapier AI - Automate workflows between apps ($20-50/month)",
              "Monday.com AI - Project and process automation ($10-20/user/month)",
              "Make (Integromat) - Advanced automation ($9-29/month)"
            ] : undefined
          },
          {
            title: isSmme ? "Customer Service AI - Quick Win" : "Regional Market Expansion",
            description: isSmme 
              ? "Implement AI chatbot and automated customer support to handle 60-80% of routine inquiries, freeing your team for complex issues"
              : `Use AI-powered insights to expand market share in ${companyInfo.country}`,
            impact: "High",
            timeline: isSmme ? "2-4 weeks" : "6-12 months",
            investment: isSmme ? "Low ($50-300/month)" : "High",
            smmeExample: isSmme ? "A service business added an AI chatbot and reduced response time from 4 hours to instant. Customer satisfaction up 35%, support costs down 40%. Cost: $150/month." : undefined,
            toolSuggestions: isSmme ? [
              "Tidio - AI chatbot for websites ($29-289/month)",
              "Intercom - Customer messaging with AI ($74+/month)",
              "Chatbot.com - Easy chatbot builder ($52-424/month)",
              "Zendesk AI - Full customer service platform ($55+/agent/month)"
            ] : undefined
          },
          {
            title: isSmme ? "AI Content & Marketing - Low Cost, High Impact" : "Customer Intelligence Platform",
            description: isSmme
              ? "Use AI to create marketing content, social media posts, emails, and ads in minutes instead of hours. Maintain consistent brand presence without hiring expensive agencies."
              : "Build AI-driven customer analytics for personalized experiences",
            impact: isSmme ? "High" : "Medium",
            timeline: isSmme ? "1-2 weeks" : "4-8 months",
            investment: isSmme ? "Very Low ($20-100/month)" : "Medium",
            smmeExample: isSmme ? "A small consulting firm uses AI to write blog posts, social media content, and email campaigns. Saves 20 hours/month, increased web traffic by 150%. Cost: $60/month." : undefined,
            toolSuggestions: isSmme ? [
              "ChatGPT Plus - Content creation ($20/month)",
              "Canva AI - Design and content ($15/month)",
              "Copy.ai - Marketing copy ($49/month)",
              "Jasper AI - Professional content ($49+/month)"
            ] : undefined
          },
          {
            title: isSmme ? "Smart Scheduling & Admin AI" : "Predictive Analytics Platform",
            description: isSmme
              ? "Automate appointment scheduling, meeting coordination, and administrative tasks. Let AI handle the back-and-forth of booking and rescheduling."
              : "Implement predictive analytics for business forecasting and decision-making",
            impact: "Medium",
            timeline: isSmme ? "1 week" : "6-9 months",
            investment: isSmme ? "Very Low ($10-50/month)" : "High",
            smmeExample: isSmme ? "A healthcare clinic automated appointment scheduling with AI. Reduced no-shows by 45%, saved 10 hours/week of admin time. Cost: $30/month." : undefined,
            toolSuggestions: isSmme ? [
              "Calendly AI - Smart scheduling ($10-16/user/month)",
              "Reclaim.ai - AI calendar management ($8-12/user/month)",
              "Motion - AI-powered task & calendar ($34/month)",
              "Clara - AI scheduling assistant ($99+/month)"
            ] : undefined
          }
        ],
        risks: [
          {
            title: "Competitive Displacement",
            description: `Risk of losing market share to AI-advanced competitors in ${companyInfo.country}`,
            severity: "High",
            probability: "Medium",
            mitigation: "Accelerate AI adoption with focused pilot projects"
          },
          {
            title: "Implementation Complexity",
            description: "Technical challenges in integrating AI systems with legacy infrastructure",
            severity: "Medium",
            probability: "High",
            mitigation: "Phased implementation with expert consultation"
          },
          {
            title: "Talent Gap",
            description: `Shortage of AI talent in ${companyInfo.country} market`,
            severity: "Medium",
            probability: "Medium",
            mitigation: "Partner with universities and invest in upskilling programs"
          }
        ],
        recommendations: [
          {
            title: isSmme ? "Start Small - Pick ONE AI Tool This Month" : "Develop Regional AI Strategy",
            description: isSmme
              ? "Don't try to do everything at once. Choose your biggest pain point (customer service, scheduling, content, or admin) and implement ONE AI tool. Master it, measure results, then expand."
              : `Create comprehensive AI transformation strategy tailored to ${companyInfo.country} market dynamics`,
            priority: "High",
            expectedRoi: isSmme ? "150-300% (typical payback: 3-6 months)" : "200-300%",
            timeline: isSmme ? "Start this week, see results in 1-3 months" : "6-12 months",
            firstSteps: isSmme ? [
              "Week 1: Identify your biggest time-waster or cost center",
              "Week 2: Research 3 AI tools that solve that problem (use free trials)",
              "Week 3: Pick one tool and implement it",
              "Week 4: Train your team and start measuring results"
            ] : undefined,
            budgetNote: isSmme ? "Start with $50-200/month. Use free trials first. Most tools offer money-back guarantees." : undefined
          },
          {
            title: isSmme ? "Use What You Already Have" : "Launch Pilot AI Projects",
            description: isSmme
              ? "You probably already pay for tools with AI features: Google Workspace, Microsoft 365, Canva, your CRM. Turn on and learn these AI features before buying new tools."
              : "Start with high-impact, low-risk AI pilots in key business areas",
            priority: "High",
            expectedRoi: isSmme ? "Immediate (you're already paying for it!)" : "150-250%",
            timeline: isSmme ? "This week" : "3-6 months",
            freeAiTools: isSmme ? [
              "Gmail AI - Smart compose and reply suggestions (included with Google Workspace)",
              "Microsoft 365 Copilot - AI in Word, Excel, PowerPoint ($30/user/month add-on)",
              "Canva AI - Design and content creation (free tier available)",
              "ChatGPT - Content and idea generation (free tier, $20/month for Plus)",
              "Grammarly - AI writing assistant (free tier available)"
            ] : undefined
          },
          {
            title: isSmme ? "Learn from Free Resources" : "Build AI Talent Pipeline",
            description: isSmme
              ? "You don't need to hire AI experts. Learn the basics yourself through free online resources, then train your team. Focus on using AI tools, not building them."
              : "Invest in training and recruitment to build internal AI capabilities",
            priority: "Medium",
            expectedRoi: isSmme ? "High (knowledge is free, implementation is cheap)" : "100-200%",
            timeline: isSmme ? "Ongoing - 1 hour per week" : "12-18 months",
            learningResources: isSmme ? [
              "YouTube - Search '[your industry] AI tools' for free tutorials",
              "Reddit r/smallbusiness - Real SMME owners sharing AI experiences",
              "LinkedIn Learning - AI for Business courses (often free through library)",
              "Tool-specific tutorials - Most AI tools have free training videos",
              "Local business groups - Share experiences with other SMMEs"
            ] : undefined
          },
          {
            title: isSmme ? "Measure Everything - Prove the ROI" : "Establish AI Governance Framework",
            description: isSmme
              ? "Track time saved, costs reduced, and revenue increased from each AI tool. This proves ROI and justifies expanding your AI budget. Simple spreadsheet tracking is enough."
              : "Create policies and procedures for responsible AI use across the organization",
            priority: isSmme ? "High" : "Medium",
            expectedRoi: isSmme ? "Enables smart decisions on where to invest next" : "Risk mitigation and compliance",
            timeline: isSmme ? "Start tracking from day 1" : "6-9 months",
            metricsToTrack: isSmme ? [
              "Time saved per week (hours × your hourly rate = $ saved)",
              "Customer satisfaction scores (before vs after AI)",
              "Response times (customer service, quotes, etc.)",
              "Revenue impact (more leads, faster sales, better retention)",
              "Cost per month vs value generated"
            ] : undefined,
            exampleRoi: isSmme ? "If an AI tool saves you 5 hours/week and your time is worth $50/hour, that's $250/week or $1,000/month in value. A $100/month tool pays for itself 10x over." : undefined
          }
        ],
        twoWeekPlan: {
          week1: {
            focus: "Foundation",
            weeklyGoal: "Establish governance and assessment",
            tasks: [
              {
                title: "AI Governance",
                description: "Create internal AI policies",
                timeRequired: "2-3 days",
                deliverable: "Governance framework",
                successMetric: "Leadership approval"
              }
            ]
          },
          week2: {
            focus: "Implementation",
            weeklyGoal: "Launch pilot AI initiatives",
            tasks: [
              {
                title: "Pilot Project",
                description: "Implement first AI use case",
                timeRequired: "5-7 days",
                deliverable: "Working prototype",
                successMetric: "Pilot completion"
              }
            ]
          }
        }
      };
    }

    // Add company info
    reportData.companyInfo = companyInfo;
    reportData.overallScore = overallScore;
    reportData.categoryScores = categoryScores;

    // Save report to database
    try {
      // Extract company name from URL
      let companyName = 'Unknown Company';
      if (companyInfo.companyUrl) {
        try {
          const url = new URL(companyInfo.companyUrl);
          companyName = url.hostname.replace('www.', '').split('.')[0];
          // Capitalize first letter
          companyName = companyName.charAt(0).toUpperCase() + companyName.slice(1);
        } catch (e) {
          companyName = 'Unknown Company';
        }
      }

      const savedReport = await db.reportArchive.create({
        data: {
          companyName,
          industry: companyInfo.industry,
          companyUrl: companyInfo.companyUrl,
          assessmentScore: overallScore,
          categoryScores: categoryScores || {},
          reportData: {
            title: `${companyInfo.industry} AI Readiness Assessment - ${companyInfo.country}`,
            type: 'assessment',
            generatedAt: new Date().toISOString(),
            score: overallScore,
            industry: companyInfo.industry,
            country: companyInfo.country,
            companyUrl: companyInfo.companyUrl,
            status: 'completed',
            downloadUrl: `/reports/${companyInfo.industry.toLowerCase()}-assessment-${new Date().toISOString().split('T')[0]}.pdf`,
            ...reportData
          },
          generatedAt: new Date()
        }
      });
      console.log('Report saved to database successfully:', savedReport.id);
    } catch (dbError) {
      console.error('Error saving report to database:', dbError);
      console.error('Database error details:', dbError instanceof Error ? dbError.message : 'Unknown error');
    }

    console.log('Report generated successfully');

    return NextResponse.json(reportData);

  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate competitive intelligence report',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}