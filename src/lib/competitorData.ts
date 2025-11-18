// Realistic competitor names by industry
export const getCompetitorNames = (industry: string) => {
  const industryMap: Record<string, string[]> = {
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
    'government': ['GovTech Solutions', 'PublicSector AI', 'CivicInnovate Systems'],
    'smme-professional-services': ['ProServe Solutions', 'Expert Consulting Group', 'SmartPro Services'],
    'smme-hospitality': ['Hospitality Hub', 'SmartStay Solutions', 'LocalHotel Network'],
    'smme-construction': ['BuildTech Solutions', 'SmartConstruct Co', 'LocalBuild Group'],
    'smme-agriculture': ['AgriTech Solutions', 'SmartFarm Systems', 'LocalGrow Network']
  };
  
  return industryMap[industry.toLowerCase()] || ['TechVision Inc', 'Innovation Partners Ltd', 'Digital Transform Corp'];
};

export const getIndustryLeaders = (industry: string, country: string) => {
  const competitors = getCompetitorNames(industry);
  const isSmme = industry.toLowerCase().includes('smme');
  
  return [
    {
      name: competitors[0],
      country: country,
      aiInvestment: isSmme ? "$850K" : "$3.2B",
      roiIncrease: "45%",
      efficiencyGain: "38%",
      marketCapImpact: "32%",
      initiatives: ["AI Platform Development", "Predictive Analytics", "Process Automation"],
      smmeInsight: isSmme ? "Started with a $50K pilot project and scaled over 3 years. Their first AI tool was a simple chatbot that paid for itself in 6 months." : undefined,
      practicalTip: isSmme ? "You can start with similar tools for under $5K/month using cloud-based AI platforms like ChatGPT API, Google Cloud AI, or Microsoft Azure AI." : undefined
    },
    {
      name: competitors[1],
      country: country,
      aiInvestment: isSmme ? "$620K" : "$2.8B",
      roiIncrease: "42%",
      efficiencyGain: "35%",
      marketCapImpact: "28%",
      initiatives: ["Machine Learning", "Data Science", "Customer Intelligence"],
      smmeInsight: isSmme ? "Focused on customer service automation first, reducing support costs by 40% before expanding to other areas." : undefined,
      practicalTip: isSmme ? "Consider starting with AI-powered customer service tools like Intercom, Zendesk AI, or custom chatbots - typical ROI within 12 months." : undefined
    },
    {
      name: competitors[2],
      country: country,
      aiInvestment: isSmme ? "$480K" : "$2.1B",
      roiIncrease: "38%",
      efficiencyGain: "31%",
      marketCapImpact: "24%",
      initiatives: ["AI-Powered Operations", "Smart Analytics", "Automation Systems"],
      smmeInsight: isSmme ? "Used off-the-shelf AI tools rather than custom development, keeping costs low while achieving significant efficiency gains." : undefined,
      practicalTip: isSmme ? "Leverage existing AI tools like Zapier AI, Monday.com AI, or HubSpot AI - no coding required, starting from $50-200/month." : undefined
    }
  ];
};
