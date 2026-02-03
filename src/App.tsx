import { useState } from 'react';
import './App.css';
import AppSelector, { type DemoApp } from './apps/AppSelector';
import UnderwritingApp from './apps/underwriting/UnderwritingApp';
import EkycApp from './apps/ekyc/EkycApp';
import ClaimsApp from './apps/claims/ClaimsApp';

function App() {
  const [selectedApp, setSelectedApp] = useState<DemoApp | null>(null);

  if (!selectedApp) {
    return <AppSelector onSelect={setSelectedApp} />;
  }

  if (selectedApp === 'underwriting') {
    return <UnderwritingApp onExit={() => setSelectedApp(null)} />;
  }

  if (selectedApp === 'ekyc') {
    return <EkycApp onExit={() => setSelectedApp(null)} />;
  }

  return <ClaimsApp onExit={() => setSelectedApp(null)} />;
}

export default App;
