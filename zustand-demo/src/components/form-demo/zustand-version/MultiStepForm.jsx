import React from 'react';
import { useFormStore } from '../../../stores/formStore';
import Steps from './Steps';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import '../shared/SharedStyles.css';
import './ZustandSpecific.css';

const MultiStepForm = () => {
  const { 
    currentStep, 
    step1Valid, 
    step2Valid, 
    step3Valid,
    submitting,
    nextStep, 
    prevStep, 
    submitForm,
    resetForm 
  } = useFormStore();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Form />;
      case 2:
        return <Step2Form />;
      case 3:
        return <Step3Form />;
      default:
        return <Step1Form />;
    }
  };

  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        return step1Valid;
      case 2:
        return step2Valid;
      case 3:
        return step3Valid;
      default:
        return false;
    }
  };

  const canGoPrev = () => {
    return currentStep > 1;
  };

  const canSubmit = () => {
    return step1Valid && step2Valid && step3Valid && !submitting;
  };

  const handleNext = () => {
    if (canGoNext()) {
      nextStep();
    }
  };

  const handlePrev = () => {
    if (canGoPrev()) {
      prevStep();
    }
  };

  const handleSubmit = () => {
    if (canSubmit()) {
      submitForm();
    }
  };

  return (
    <div className="multi-step-form">
      <Steps />
      
      <div className="form-container">
        {renderCurrentStep()}
        
        <div className="form-navigation">
          <div className="nav-buttons">
            {canGoPrev() && (
              <button 
                type="button" 
                onClick={handlePrev}
                className="nav-btn prev-btn"
              >
                ← 上一步
              </button>
            )}
            
            {currentStep < 3 && (
              <button 
                type="button" 
                onClick={handleNext}
                disabled={!canGoNext()}
                className="nav-btn next-btn"
              >
                下一步 →
              </button>
            )}
            
            {currentStep === 3 && (
              <button 
                type="button" 
                onClick={handleSubmit}
                disabled={!canSubmit()}
                className="nav-btn submit-btn"
              >
                {submitting ? '提交中...' : '提交表单'}
              </button>
            )}
          </div>
          
          <button 
            type="button" 
            onClick={resetForm}
            className="reset-btn"
          >
            重置表单
          </button>
        </div>
        
        <div className="form-status">
          <div className="status-item">
            <span>步骤1验证：</span>
            <span className={step1Valid ? 'status-valid' : 'status-invalid'}>
              {step1Valid ? '✓ 通过' : '✗ 未通过'}
            </span>
          </div>
          <div className="status-item">
            <span>步骤2验证：</span>
            <span className={step2Valid ? 'status-valid' : 'status-invalid'}>
              {step2Valid ? '✓ 通过' : '✗ 未通过'}
            </span>
          </div>
          <div className="status-item">
            <span>步骤3验证：</span>
            <span className={step3Valid ? 'status-valid' : 'status-invalid'}>
              {step3Valid ? '✓ 通过' : '✗ 未通过'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
