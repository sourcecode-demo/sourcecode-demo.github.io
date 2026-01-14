// Demo file configurations - based on actual files in /data folder
export const happyCaseFiles = [
  {
    name: "53016828 - DELA CRUZ, MIA (APP FORM).pdf",
    path: "/demo-data/happy-case/53016828-app-form.pdf",
    type: "pdf" as const,
    fileType: "application_form",
    size: "4.5 MB"
  },
  {
    name: "53016828 - SALES ILLUSTRATION.pdf",
    path: "/demo-data/happy-case/53016828-sales-illustration.pdf",
    type: "pdf" as const,
    fileType: "sales_illustration",
    size: "420 KB"
  },
  {
    name: "DELA CRUZ, MIA - VALID ID.png",
    path: "/demo-data/happy-case/dela-cruz-mia-valid-id.png",
    type: "image" as const,
    fileType: "valid_id",
    size: "372 KB"
  }
];

export const unhappyCaseFiles = [
  {
    name: "58155081 - SANTOS, JOSE (APP FORM).pdf",
    path: "/demo-data/unhappy-case/58155081-app-form.pdf",
    type: "pdf" as const,
    fileType: "application_form",
    size: "1.7 MB"
  },
  {
    name: "58155081 - SALES ILLUSTRATION.pdf",
    path: "/demo-data/unhappy-case/58155081-sales-illustration.pdf",
    type: "pdf" as const,
    fileType: "sales_illustration",
    size: "405 KB"
  },
  {
    name: "SANTOS, JOSE - VALID ID.png",
    path: "/demo-data/unhappy-case/santos-jose-valid-id.png",
    type: "image" as const,
    fileType: "valid_id",
    size: "3.7 MB"
  }
];

// Mock data for the demo - Happy Case: DELA CRUZ, MIA (IHP)
export const mockCase = {
  caseId: "53016828",
  applicantName: "DELA CRUZ, MIA",
  formType: "IHP",
  submissionDate: "2025-07-17T10:30:00Z",
  status: "approved"
};

export const mockSubmission = {
  files: happyCaseFiles.map(f => ({
    name: f.name,
    type: f.fileType,
    size: f.size,
    path: f.path,
    uploadedAt: "2025-07-17T10:30:00Z"
  }))
};

export const mockUnhappySubmission = {
  files: unhappyCaseFiles.map(f => ({
    name: f.name,
    type: f.fileType,
    size: f.size,
    path: f.path,
    uploadedAt: "2025-07-17T10:30:00Z"
  }))
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
  confidence: 98.5,
  confidenceExplanation: "Confidence score is calculated based on: text recognition accuracy (99.2%), field validation success rate (98.1%), data consistency checks (98.2%), and document quality assessment (98.5%). A score above 95% indicates high confidence in extracted data accuracy.",
  beneficiaryShareExplanation: "Beneficiary shares are distributed equally between the two designated beneficiaries. Each beneficiary (Spouse and Child) receives 50% of the policy benefits. This is the applicant's specified preference as indicated in the application form."
};

// Unhappy case data - based on NON-GAE form: SANTOS, JOSE
export const mockUnhappyOCRResults = {
  personalInfo: {
    fullName: "SANTOS, JOSE",
    dateOfBirth: "1958-08-22",
    age: 67,
    gender: "Male",
    nationality: "Filipino",
    civilStatus: "Married",
    occupation: "Mining Engineer",
    annualIncome: "₱800,000"
  },
  contactInfo: {
    mobileNumber: "+63 918 555 7890",
    email: "jose.santos@email.com",
    address: "45 Industrial Zone, Cebu City, 6000"
  },
  policyDetails: {
    productType: "NON-GAE (Non-Group Accident & Emergency)",
    sumAssured: "₱10,000,000",
    premiumAmount: "₱125,000",
    paymentMode: "Annual",
    policyTerm: "15 years",
    coverageType: "Whole Life with Critical Illness Rider"
  },
  beneficiaries: [
    {
      name: "SANTOS, MARIA",
      relationship: "Spouse",
      share: "100%"
    }
  ],
  healthDeclaration: {
    preExistingConditions: "Type 2 Diabetes, Hypertension",
    currentMedications: "Metformin, Lisinopril",
    hospitalizations: "Cardiac event in 2023",
    familyHistory: "Father died of heart disease at 55"
  },
  confidence: 97.2,
  confidenceExplanation: "Confidence score is calculated based on: text recognition accuracy (98.5%), field validation success rate (96.8%), data consistency checks (96.5%), and document quality assessment (97.0%). A score above 95% indicates high confidence in extracted data accuracy.",
  beneficiaryShareExplanation: "Single beneficiary designated to receive 100% of the policy benefits as specified in the application form."
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
    },
    {
      ruleId: "CITIZEN_006",
      ruleName: "US Citizen Status Check",
      result: "PASS",
      description: "Applicant is not a US citizen - no additional FATCA reporting requirements"
    },
    {
      ruleId: "GOV_007",
      ruleName: "Government Official Relationship Check",
      result: "PASS",
      description: "No relationships with Politically Exposed Persons (PEP) identified - standard processing applies"
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
  approvedDate: "2025-07-17T10:35:00Z",
  riskRatingDetails: {
    rating: "Standard",
    explanation: "Standard risk rating indicates an average risk profile. The applicant meets all basic underwriting criteria with no significant risk factors identified.",
    scale: [
      { level: "Preferred", description: "Excellent risk profile, lowest premium rates", scoreRange: "90-100" },
      { level: "Standard", description: "Average risk profile, standard premium rates", scoreRange: "75-89" },
      { level: "Sub-standard", description: "Elevated risk, higher premium or exclusions may apply", scoreRange: "50-74" },
      { level: "Declined", description: "Risk too high for standard coverage", scoreRange: "Below 50" }
    ],
    productEligibility: [
      { type: "IHP", fullName: "Individual Health Protection", eligible: true, notes: "Fully eligible - standard terms" },
      { type: "GAE", fullName: "Group Accident & Emergency", eligible: true, notes: "Fully eligible - standard terms" },
      { type: "Non-GAE", fullName: "Non-Group Accident & Emergency", eligible: true, notes: "Fully eligible - standard terms" },
      { type: "SIO", fullName: "Single Income Option", eligible: true, notes: "Fully eligible - standard terms" }
    ]
  }
};

// Unhappy case underwriting decision (Declined)
export const mockUnhappyUnderwritingDecision = {
  decision: "Declined",
  riskRating: "High Risk",
  premium: "N/A",
  conditions: [],
  reasonCode: "UW_DECLINE_001",
  autoDecision: true,
  processingTime: "3.1 seconds",
  rulesApplied: [
    {
      ruleId: "AGE_001",
      ruleName: "Age Validation",
      result: "FAIL",
      description: "Applicant age (67) exceeds maximum acceptable age (60)"
    },
    {
      ruleId: "OCC_002",
      ruleName: "Occupational Risk Assessment",
      result: "FAIL",
      description: "Mining Engineer classified as High Risk occupation"
    },
    {
      ruleId: "SUM_003",
      ruleName: "Sum Assured vs Income Ratio",
      result: "FAIL",
      description: "Sum assured (₱10M) is 12.5x annual income - exceeds maximum 10x ratio"
    },
    {
      ruleId: "HEALTH_004",
      ruleName: "Health Declaration Review",
      result: "FAIL",
      description: "Multiple pre-existing conditions: Type 2 Diabetes, Hypertension, Cardiac history"
    },
    {
      ruleId: "TERR_005",
      ruleName: "Territorial Risk",
      result: "PASS",
      description: "Cebu City classified as Standard Territory"
    },
    {
      ruleId: "CITIZEN_006",
      ruleName: "US Citizen Status Check",
      result: "PASS",
      description: "Applicant is not a US citizen - no additional FATCA reporting requirements"
    },
    {
      ruleId: "GOV_007",
      ruleName: "Government Official Relationship Check",
      result: "PASS",
      description: "No relationships with Politically Exposed Persons (PEP) identified"
    }
  ],
  riskFactors: [
    {
      factor: "Age",
      score: 35,
      impact: "High",
      details: "67 years old - above maximum age limit"
    },
    {
      factor: "Occupation",
      score: 40,
      impact: "High",
      details: "Mining industry - high physical risk environment"
    },
    {
      factor: "Health",
      score: 30,
      impact: "Very High",
      details: "Multiple chronic conditions with cardiac history"
    },
    {
      factor: "Lifestyle",
      score: 55,
      impact: "Moderate",
      details: "Former smoker, sedentary lifestyle"
    }
  ],
  overallRiskScore: 40,
  declineReasons: [
    "Age exceeds maximum acceptable limit (67 > 60)",
    "High-risk occupation (Mining Engineer)",
    "Sum assured to income ratio exceeds limit (12.5x > 10x)",
    "Significant pre-existing conditions with cardiac history"
  ],
  recommendedAction: "Decline application - refer to alternative products or reduced coverage options",
  reviewedBy: "Auto-Underwriting System",
  reviewedDate: "2025-07-17T10:35:00Z",
  riskRatingDetails: {
    rating: "High Risk",
    explanation: "High risk rating indicates multiple significant risk factors. The applicant does not meet standard underwriting criteria due to age, occupation, health history, and coverage amount requested.",
    scale: [
      { level: "Preferred", description: "Excellent risk profile, lowest premium rates", scoreRange: "90-100" },
      { level: "Standard", description: "Average risk profile, standard premium rates", scoreRange: "75-89" },
      { level: "Sub-standard", description: "Elevated risk, higher premium or exclusions may apply", scoreRange: "50-74" },
      { level: "Declined", description: "Risk too high for standard coverage", scoreRange: "Below 50" }
    ],
    productEligibility: [
      { type: "IHP", fullName: "Individual Health Protection", eligible: false, notes: "Not eligible - age and health restrictions" },
      { type: "GAE", fullName: "Group Accident & Emergency", eligible: false, notes: "Not eligible - occupation restriction" },
      { type: "Non-GAE", fullName: "Non-Group Accident & Emergency", eligible: false, notes: "May be eligible with exclusions - manual review required" },
      { type: "SIO", fullName: "Single Income Option", eligible: false, notes: "Not eligible - sum assured limit exceeded" }
    ]
  }
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

// Case-specific analytics (for single case view)
export const mockCaseAnalytics = {
  dataSource: {
    channel: "Agency",
    channelCode: "CH-001",
    agent: "Maria Santos",
    agentCode: "AGT-001",
    branch: "Makati Branch",
    branchCode: "BR-MKT-001",
    submissionDate: "2025-07-17T10:30:00Z",
    submissionMethod: "Online Portal"
  },
  scoringComparison: {
    caseScore: 89.5,
    averageScore: 82.3,
    medianScore: 85.0,
    percentile: 75,
    rank: "Top 25%",
    totalCasesCompared: 1247,
    scoreTrend: [
      { month: "Jan", avgScore: 80.2 },
      { month: "Feb", avgScore: 81.5 },
      { month: "Mar", avgScore: 82.8 },
      { month: "Apr", avgScore: 81.9 },
      { month: "May", avgScore: 83.2 },
      { month: "Jun", avgScore: 82.3 }
    ]
  },
  keyIndicators: [
    { 
      label: "Risk Score", 
      value: "89.5/100", 
      status: "excellent",
      description: "Above average risk score indicates low risk profile"
    },
    { 
      label: "Processing Time", 
      value: "2.3 seconds", 
      status: "excellent",
      description: "Faster than 92% of similar cases"
    },
    { 
      label: "Automation Level", 
      value: "Fully Automated", 
      status: "excellent",
      description: "No manual intervention required"
    },
    { 
      label: "Decision Confidence", 
      value: "High (98.5%)", 
      status: "excellent",
      description: "High confidence in underwriting decision"
    },
    { 
      label: "Document Quality", 
      value: "Excellent", 
      status: "excellent",
      description: "All documents clear and readable"
    },
    { 
      label: "Data Completeness", 
      value: "100%", 
      status: "excellent",
      description: "All required fields captured"
    }
  ],
  caseComparison: {
    similarCases: 156,
    approvedSimilar: 142,
    declinedSimilar: 14,
    avgPremiumSimilar: "₱48,500",
    thisCasePremium: "₱45,000",
    premiumVariance: "-7.2%"
  }
};

// Case-specific distribution (for single case view)
export const mockCaseDistribution = {
  agent: {
    name: "Maria Santos",
    code: "AGT-001",
    photo: null,
    tenure: "5 years",
    rank: "#1 Top Performer",
    performance: {
      totalSubmissions: 89,
      approvalRate: 92.1,
      avgProcessingTime: "2.8 minutes",
      totalPremium: "₱4.2M",
      currentMonthSubmissions: 12
    },
    specializations: ["IHP", "GAE", "Critical Illness"]
  },
  channel: {
    type: "Agency",
    code: "CH-001",
    performance: {
      totalSubmissions: 687,
      approvalRate: 88.9,
      marketShare: "55.1%",
      totalPremium: "₱1.23B"
    }
  },
  geographic: {
    region: "Metro Manila",
    city: "Makati City",
    branch: "Makati Branch",
    branchCode: "BR-MKT-001",
    territoryRating: "Standard",
    territoryRiskLevel: "Low"
  },
  distributionPath: [
    { 
      stage: "Lead Generated", 
      date: "2025-07-10", 
      source: "Referral from existing client",
      daysFromPrevious: 0
    },
    { 
      stage: "Initial Contact", 
      date: "2025-07-12", 
      source: "Phone call by Agent",
      daysFromPrevious: 2
    },
    { 
      stage: "Needs Analysis", 
      date: "2025-07-14", 
      source: "In-person meeting",
      daysFromPrevious: 2
    },
    { 
      stage: "Proposal Presented", 
      date: "2025-07-15", 
      source: "Email with Sales Illustration",
      daysFromPrevious: 1
    },
    { 
      stage: "Application Signed", 
      date: "2025-07-16", 
      source: "Client office visit",
      daysFromPrevious: 1
    },
    { 
      stage: "Documents Submitted", 
      date: "2025-07-17", 
      source: "Agency Portal Upload",
      daysFromPrevious: 1
    }
  ],
  caseTimeline: {
    leadToSubmission: "7 days",
    submissionToDecision: "5 minutes",
    totalCycleTime: "7 days, 5 minutes",
    industryAverage: "14 days"
  }
};

// Aggregate analytics (for Dashboard)
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

// Aggregate distribution insights (for Dashboard)
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
