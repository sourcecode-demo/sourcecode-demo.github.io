// Mock data for the demo - based on case: DELA CRUZ, MIA
export const mockCase = {
  caseId: "53016828",
  applicantName: "DELA CRUZ, MIA",
  formType: "IHP",
  submissionDate: "2025-07-17T10:30:00Z",
  status: "approved"
};

export const mockSubmission = {
  files: [
    {
      name: "53016828 - DELA CRUZ, MIA (APP FORM).pdf",
      type: "application_form",
      size: "2.4 MB",
      uploadedAt: "2025-07-17T10:30:00Z"
    },
    {
      name: "53016828 - SALES ILLUSTRATION.pdf",
      type: "sales_illustration",
      size: "1.8 MB",
      uploadedAt: "2025-07-17T10:30:15Z"
    },
    {
      name: "DELA CRUZ, MIA - VALID ID.png",
      type: "valid_id",
      size: "856 KB",
      uploadedAt: "2025-07-17T10:30:30Z"
    }
  ]
};

export const mockOCRResults = {
  personalInfo: {
    fullName: "DELA CRUZ, MIA",
    dateOfBirth: "1985-03-15",
    age: 40,
    gender: "Female",
    nationality: "Filipino",
    civilStatus: "Married",
    occupation: "Software Engineer",
    annualIncome: "₱1,500,000"
  },
  contactInfo: {
    mobileNumber: "+63 917 123 4567",
    email: "mia.delacruz@email.com",
    address: "123 Makati Avenue, Makati City, Metro Manila, 1200"
  },
  policyDetails: {
    productType: "IHP (Individual Health Protection)",
    sumAssured: "₱5,000,000",
    premiumAmount: "₱45,000",
    paymentMode: "Annual",
    policyTerm: "20 years",
    coverageType: "Whole Life with Critical Illness Rider"
  },
  beneficiaries: [
    {
      name: "DELA CRUZ, PEDRO",
      relationship: "Spouse",
      share: "50%"
    },
    {
      name: "DELA CRUZ, ANNA",
      relationship: "Child",
      share: "50%"
    }
  ],
  healthDeclaration: {
    preExistingConditions: "None",
    currentMedications: "None",
    hospitalizations: "None in the last 5 years",
    familyHistory: "Father has hypertension (controlled)"
  },
  confidence: 98.5
};

export const mockUnderwritingDecision = {
  decision: "Approved",
  riskRating: "Standard",
  premium: "₱45,000",
  conditions: [],
  reasonCode: "UW001",
  autoDecision: true,
  processingTime: "2.3 seconds",
  rulesApplied: [
    {
      ruleId: "AGE_001",
      ruleName: "Age Validation",
      result: "PASS",
      description: "Applicant age (40) is within acceptable range (18-60)"
    },
    {
      ruleId: "OCC_002",
      ruleName: "Occupational Risk Assessment",
      result: "PASS",
      description: "Software Engineer classified as Low Risk occupation"
    },
    {
      ruleId: "SUM_003",
      ruleName: "Sum Assured vs Income Ratio",
      result: "PASS",
      description: "Sum assured (₱5M) is 3.3x annual income - within acceptable range"
    },
    {
      ruleId: "HEALTH_004",
      ruleName: "Health Declaration Review",
      result: "PASS",
      description: "No significant pre-existing conditions or red flags"
    },
    {
      ruleId: "TERR_005",
      ruleName: "Territorial Risk",
      result: "PASS",
      description: "Makati City classified as Standard Territory"
    }
  ],
  riskFactors: [
    {
      factor: "Age",
      score: 85,
      impact: "Low",
      details: "40 years old - prime age group"
    },
    {
      factor: "Occupation",
      score: 95,
      impact: "Very Low",
      details: "Office-based, low physical risk"
    },
    {
      factor: "Health",
      score: 90,
      impact: "Low",
      details: "No current health issues"
    },
    {
      factor: "Lifestyle",
      score: 88,
      impact: "Low",
      details: "Non-smoker, moderate lifestyle"
    }
  ],
  overallRiskScore: 89.5,
  recommendedAction: "Issue policy with standard terms",
  approvedBy: "Auto-Underwriting System",
  approvedDate: "2025-07-17T10:35:00Z"
};

export const mockAuditTrail = [
  {
    timestamp: "2025-07-17T10:30:00Z",
    action: "Submission Received",
    user: "Agent: Maria Santos (AGT-001)",
    details: "Application documents uploaded",
    status: "completed"
  },
  {
    timestamp: "2025-07-17T10:30:45Z",
    action: "OCR Processing Started",
    user: "System: OCR Engine v2.5",
    details: "Processing 3 documents",
    status: "completed"
  },
  {
    timestamp: "2025-07-17T10:32:15Z",
    action: "OCR Processing Completed",
    user: "System: OCR Engine v2.5",
    details: "Extracted data with 98.5% confidence",
    status: "completed"
  },
  {
    timestamp: "2025-07-17T10:32:20Z",
    action: "Data Validation",
    user: "System: Validation Module",
    details: "All required fields validated successfully",
    status: "completed"
  },
  {
    timestamp: "2025-07-17T10:32:30Z",
    action: "Underwriting Assessment Started",
    user: "System: Auto-Underwriting Engine",
    details: "Running 15 underwriting rules",
    status: "completed"
  },
  {
    timestamp: "2025-07-17T10:35:00Z",
    action: "Underwriting Decision: APPROVED",
    user: "System: Auto-Underwriting Engine",
    details: "Standard risk rating, no conditions",
    status: "completed"
  },
  {
    timestamp: "2025-07-17T10:35:15Z",
    action: "Quality Check",
    user: "Senior Underwriter: John Reyes (UW-005)",
    details: "Reviewed and confirmed auto-decision",
    status: "completed"
  },
  {
    timestamp: "2025-07-17T10:36:00Z",
    action: "Policy Issued",
    user: "System: Policy Administration",
    details: "Policy number: POL-53016828-2025",
    status: "completed"
  }
];

export const mockAnalytics = {
  overview: {
    totalSubmissions: 1247,
    totalApproved: 1089,
    totalDeclined: 98,
    totalPending: 60,
    approvalRate: 87.3,
    avgProcessingTime: "3.2 minutes",
    autoDecisionRate: 82.5
  },
  monthlyTrends: [
    { month: "Jan", submissions: 185, approved: 162, declined: 15, pending: 8 },
    { month: "Feb", submissions: 198, approved: 175, declined: 12, pending: 11 },
    { month: "Mar", submissions: 210, approved: 183, declined: 18, pending: 9 },
    { month: "Apr", submissions: 195, approved: 168, declined: 20, pending: 7 },
    { month: "May", submissions: 220, approved: 195, declined: 15, pending: 10 },
    { month: "Jun", submissions: 239, approved: 206, declined: 18, pending: 15 }
  ],
  riskDistribution: [
    { rating: "Preferred", count: 245, percentage: 22.5 },
    { rating: "Standard", count: 712, percentage: 65.4 },
    { rating: "Sub-standard", count: 98, percentage: 9.0 },
    { rating: "Declined", count: 98, percentage: 9.0 }
  ],
  productMix: [
    { product: "IHP", count: 445, value: "₱892M" },
    { product: "GAE", count: 385, value: "₱654M" },
    { product: "SIO", count: 287, value: "₱445M" },
    { product: "EaZy Health", count: 130, value: "₱89M" }
  ]
};

export const mockDistributionInsights = {
  topPerformingAgents: [
    { name: "Maria Santos", code: "AGT-001", submissions: 89, approvalRate: 92.1, premium: "₱4.2M" },
    { name: "John Reyes", code: "AGT-002", submissions: 76, approvalRate: 89.5, premium: "₱3.8M" },
    { name: "Ana Lim", code: "AGT-003", submissions: 68, approvalRate: 91.2, premium: "₱3.5M" },
    { name: "Roberto Cruz", code: "AGT-004", submissions: 65, approvalRate: 87.7, premium: "₱3.1M" },
    { name: "Linda Tan", code: "AGT-005", submissions: 59, approvalRate: 88.1, premium: "₱2.9M" }
  ],
  channelPerformance: [
    { channel: "Agency", submissions: 687, approvalRate: 88.9, premium: "₱1.23B" },
    { channel: "Bancassurance", submissions: 398, approvalRate: 90.2, premium: "₱892M" },
    { channel: "Direct", submissions: 162, approvalRate: 82.1, premium: "₱234M" }
  ],
  territorialDistribution: [
    { region: "Metro Manila", submissions: 542, approvalRate: 89.5 },
    { region: "Luzon", submissions: 385, approvalRate: 87.3 },
    { region: "Visayas", submissions: 198, approvalRate: 85.9 },
    { region: "Mindanao", submissions: 122, approvalRate: 84.4 }
  ],
  conversionFunnel: [
    { stage: "Leads Generated", count: 2450, percentage: 100 },
    { stage: "Applications Started", count: 1680, percentage: 68.6 },
    { stage: "Applications Submitted", count: 1247, percentage: 50.9 },
    { stage: "Approved", count: 1089, percentage: 44.4 },
    { stage: "Policies Issued", count: 1045, percentage: 42.7 }
  ]
};
