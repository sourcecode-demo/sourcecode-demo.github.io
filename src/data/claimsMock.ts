export const claimDocuments = [
  {
    name: "Hospital Invoice.pdf",
    typeLabel: "Invoice",
    size: "1.2 MB",
    status: "Uploaded",
    path: "/demo-data/claims/hospital-invoice.pdf",
    previewType: "pdf"
  },
  {
    name: "Admission Record.pdf",
    typeLabel: "Hospital Doc",
    size: "780 KB",
    status: "Uploaded",
    path: "/demo-data/claims/admission-record.pdf",
    previewType: "pdf"
  },
  {
    name: "Prescription.pdf",
    typeLabel: "Prescription",
    size: "420 KB",
    status: "Uploaded",
    path: "/demo-data/claims/prescription.pdf",
    previewType: "pdf"
  },
  {
    name: "Doctor Diagnosis.pdf",
    typeLabel: "Diagnosis",
    size: "510 KB",
    status: "Uploaded",
    path: "/demo-data/claims/doctor-diagnosis.pdf",
    previewType: "pdf"
  },
  {
    name: "Policy Contract.pdf",
    typeLabel: "Policy",
    size: "2.1 MB",
    status: "Referenced",
    path: "/demo-data/claims/policy-contract.pdf",
    previewType: "pdf"
  }
];

export const claimOcrResults = {
  medicalData: [
    { label: "Diagnosis", value: "Acute bronchitis", confidence: 96.2 },
    { label: "Treatment", value: "Outpatient care, antibiotics", confidence: 94.8 },
    { label: "Admission Date", value: "2026-01-28", confidence: 97.1 },
    { label: "Discharge Date", value: "2026-01-29", confidence: 96.5 }
  ],
  billingData: [
    { label: "Total Billed", value: "₫12,450,000", confidence: 98.4 },
    { label: "Eligible Amount", value: "₫10,000,000", confidence: 97.9 },
    { label: "Co-pay", value: "20%", confidence: 96.8 }
  ],
  overallConfidence: 95.6
};

export const claimPolicy = {
  policyNumber: "SL-CLM-982341",
  plan: "Sun Life Health Plus",
  coverageLimit: "₫50,000,000",
  deductible: "₫1,000,000",
  benefits: [
    { name: "Hospitalization", limit: "₫20,000,000" },
    { name: "Outpatient Care", limit: "₫10,000,000" },
    { name: "Medication", limit: "₫5,000,000" }
  ]
};

export const claimEligibility = [
  { benefit: "Hospitalization", eligible: true, appliedAmount: "₫8,000,000", rule: "Covered up to limit" },
  { benefit: "Outpatient Care", eligible: true, appliedAmount: "₫2,000,000", rule: "Covered with 20% co-pay" },
  { benefit: "Medication", eligible: false, appliedAmount: "₫0", rule: "Medication excluded for this diagnosis" }
];

export const claimDecision = {
  status: "Approved",
  payoutAmount: "₫8,000,000",
  explanation: "Approved with co-pay applied. Medication excluded per policy rule.",
  processingTime: "8.7 seconds"
};

export const claimAuditTrail = [
  { timestamp: "11:03:12", action: "Claim documents uploaded", status: "completed" },
  { timestamp: "11:03:48", action: "OCR extraction completed", status: "completed" },
  { timestamp: "11:04:10", action: "Policy lookup completed", status: "completed" },
  { timestamp: "11:04:32", action: "AI mapping to benefits completed", status: "completed" },
  { timestamp: "11:04:39", action: "Claim decision generated", status: "completed" }
];

export const claimTooltips = {
  ocr: "OCR combines layout parsing with a vision model to extract medical terms, amounts, and dates from mixed PDFs and images.",
  policy: "Policy lookup uses a structured index of benefit rules, exclusions, and limits to map claim fields deterministically.",
  mapping: "AI mapping correlates diagnosis codes with benefits and applies co-pay/limit logic for transparent outcomes.",
  decision: "Final decision merges eligibility results with payout math to produce an audit-ready explanation."
};
