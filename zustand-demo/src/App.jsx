import React, { useState } from 'react';
import MultiStepFormZustand from './components/form-demo/zustand-version/MultiStepForm';
import MultiStepFormUseState from './components/form-demo/useState-version/MultiStepForm';
import './App.css';

function App() {
  const [activeVersion, setActiveVersion] = useState('zustand');

  return (
    <div className="App">
      <div className="version-selector">
        <button 
          className={`version-btn ${activeVersion === 'zustand' ? 'active' : ''}`}
          onClick={() => setActiveVersion('zustand')}
        >
          🚀 Zustand版本 (推荐)
        </button>
        <button 
          className={`version-btn ${activeVersion === 'useState' ? 'active' : ''}`}
          onClick={() => setActiveVersion('useState')}
        >
          ⚠️ useState版本 (对比)
        </button>
      </div>



      <main className="app-main">
        {activeVersion === 'zustand' ? (
          <MultiStepFormZustand />
        ) : (
          <MultiStepFormUseState />
        )}
      </main>
    </div>
  );
}

export default App;
