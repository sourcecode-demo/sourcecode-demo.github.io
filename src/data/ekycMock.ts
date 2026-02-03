export const ekycApplicant = {
  fullName: "KIỀU HỮU YÊN",
  dateOfBirth: "1989-10-03",
  nationality: "Vietnamese",
  idNumber: "001089001096",
  address: "Lê Lợi, Sơn Tây, Hà Nội"
};

export const ekycCapture = {
  livenessStatus: "Live",
  captureQuality: "High",
  device: "Laptop webcam",
  timestamp: "2026-02-03T09:14:20Z"
};

export const ekycIdDocument = {
  documentType: "Chứng Minh Nhân Dân",
  issuingAuthority: "Ministry of Public Security",
  issueDate: "2009-05-09",
  expiryDate: "2029-05-09",
  documentQuality: "Clear"
};

export const ekycOcrExtraction = {
  fields: [
    { label: "Full Name", value: "KIỀU HỮU YÊN", confidence: 99.1 },
    { label: "Date of Birth", value: "03/10/1989", confidence: 98.4 },
    { label: "ID Number", value: "001089001096", confidence: 99.5 },
    { label: "Ethnicity", value: "Kinh", confidence: 97.4 },
    { label: "Hometown", value: "Bình Yên, Thạch Thất, Hà Nội", confidence: 96.8 },
    { label: "Permanent Address", value: "Lê Lợi, Sơn Tây, Hà Nội", confidence: 96.9 },
    { label: "Valid Until", value: "09/05/2029", confidence: 97.2 }
  ],
  overallConfidence: 98.5
};

export const ekycFaceMatch = {
  selfieScore: 93.8,
  idPhotoScore: 92.4,
  similarityScore: 0.92,
  threshold: 0.8,
  decision: "Match",
  explanation: "High similarity after alignment, lighting normalization, and 3D landmark checks."
};

export const ekycDecision = {
  status: "Approved",
  decisionReason: "Match score above threshold with clean OCR and liveness verified.",
  riskFlags: ["None"],
  reviewRequired: false,
  processingTime: "3.9 seconds"
};

export const ekycAuditTrail = [
  { timestamp: "09:14:20", action: "Live selfie captured", status: "completed" },
  { timestamp: "09:14:45", action: "ID document uploaded", status: "completed" },
  { timestamp: "09:15:05", action: "OCR extraction completed", status: "completed" },
  { timestamp: "09:15:15", action: "Face match computed", status: "completed" },
  { timestamp: "09:15:22", action: "eKYC decision generated", status: "completed" }
];

export const ekycTooltips = {
  liveness: "Liveness is detected using micro-movements, blink patterns, and 3D face mesh depth cues. All checks run locally for the demo.",
  ocr: "Vietnamese ID OCR uses a vision-language model with layout parsing to capture diacritics, field positions, and document security marks.",
  faceMatch: "Face embeddings are generated using ArcFace. Cosine similarity above 0.80 is treated as a match for POC.",
  decision: "Decision logic combines OCR confidence, liveness, and similarity score to produce an auditable outcome."
};
