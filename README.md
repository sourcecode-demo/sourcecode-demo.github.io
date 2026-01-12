# Insurance Underwriting Demo UI

A proof-of-concept demonstration UI showcasing an end-to-end insurance underwriting journey for Chubb presentation.

## Overview

This demo presents a complete underwriting workflow from submission to distribution insights:

1. **Submission Intake** - Document upload and validation
2. **OCR Processing** - Automated data extraction from forms
3. **Underwriting Decision** - AI-powered risk assessment
4. **Audit Trail** - Complete process history
5. **Analytics** - Business intelligence dashboard
6. **Distribution Insights** - Channel and agent performance

## Features

- 🎨 Modern, responsive UI built with React + TypeScript
- 💨 Fast performance with Vite
- 🎯 Hardcoded sample data for consistent demos
- 📊 Interactive charts and visualizations
- 🔄 Multi-step wizard with progress tracking
- ✨ Smooth transitions and loading states

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Recharts** - Data visualization
- **Lucide React** - Icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Demo Flow

The demo follows a single insurance case:

**Case Details:**
- Case ID: 53016828
- Applicant: DELA CRUZ, MIA
- Product: IHP (Individual Health Protection)
- Sum Assured: ₱5,000,000
- Premium: ₱45,000
- Status: Approved

### Navigation

- Click on step indicators to jump to any step
- Use "Next" and "Previous" buttons to navigate sequentially
- All data is pre-loaded for instant demonstration

## Customization

### Updating Demo Data

Edit `/src/data/mockData.ts` to customize:
- Applicant information
- Policy details
- Underwriting rules
- Analytics metrics
- Distribution insights

### Styling

The app uses Tailwind CSS. Customize colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: { ... }
    }
  }
}
```

## Demo Tips

1. **For Video Recording:**
   - Run in fullscreen (F11)
   - Use Chrome/Edge for best performance
   - Clear screen of desktop clutter

2. **For Live Demo:**
   - Test navigation flow beforehand
   - Prepare talking points for each step
   - Highlight automated decision-making
   - Emphasize processing speed

3. **Key Talking Points:**
   - 98.5% OCR confidence
   - 2.3 second underwriting decision
   - 87.3% approval rate
   - 82.5% automation rate
   - Complete audit trail

## Project Structure

```
demo-ui/
├── src/
│   ├── components/
│   │   ├── StepIndicator.tsx      # Progress tracker
│   │   └── steps/
│   │       ├── SubmissionIntake.tsx
│   │       ├── OCRResults.tsx
│   │       ├── UnderwritingDecision.tsx
│   │       ├── AuditTrail.tsx
│   │       ├── Analytics.tsx
│   │       └── DistributionInsights.tsx
│   ├── data/
│   │   └── mockData.ts            # Hardcoded demo data
│   ├── App.tsx                    # Main application
│   ├── index.css                  # Global styles
│   └── main.tsx                   # Entry point
├── public/                        # Static assets
└── package.json
```

## License

Internal use only - Chubb Demo 2026

## Contact

For questions or customization requests, contact the development team.
