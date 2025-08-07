import React, { useState, useCallback } from 'react';
import Steps from './Steps';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import '../shared/SharedStyles.css';
import './UseStateSpecific.css';

const MultiStepForm = () => {
  // 当前步骤
  const [currentStep, setCurrentStep] = useState(1);
  
  // 各步骤数据 - 需要分别管理每个步骤的数据
  const [step1Data, setStep1Data] = useState({
    name: '',
    email: '',
    phone: '',
    age: ''
  });
  
  const [step2Data, setStep2Data] = useState({
    country: '',
    province: '',
    city: '',
    address: '',
    zipCode: ''
  });
  
  const [step3Data, setStep3Data] = useState({
    theme: 'light',
    notifications: false,
    newsletter: false,
    language: 'zh-CN'
  });
  
  // 各步骤验证状态 - 需要分别管理每个步骤的验证状态
  const [step1Valid, setStep1Valid] = useState(false);
  const [step2Valid, setStep2Valid] = useState(false);
  const [step3Valid, setStep3Valid] = useState(false);
  

  
  // 整体提交loading
  const [submitting, setSubmitting] = useState(false);

  // 检查步骤是否可跳转 - 复杂的逻辑判断
  const canGoToStep = useCallback((step) => {
    if (step === 1) return true;
    if (step === 2) return step1Valid;
    if (step === 3) return step1Valid && step2Valid;
    return false;
  }, [step1Valid, step2Valid]);



  // 下一步 - 需要复杂的验证逻辑
  const nextStep = useCallback(() => {
    if (currentStep < 3) {
      // 验证当前步骤是否可以通过
      let canProceed = false;
      switch (currentStep) {
        case 1:
          canProceed = step1Valid;
          break;
        case 2:
          canProceed = step2Valid;
          break;
        case 3:
          canProceed = step3Valid;
          break;
        default:
          canProceed = false;
      }
      
      if (canProceed) {
        setCurrentStep(currentStep + 1);
      }
    }
  }, [currentStep, step1Valid, step2Valid, step3Valid]);

  // 上一步
  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  // 提交表单 - 复杂的状态管理
  const submitForm = useCallback(() => {
    if (!step1Valid || !step2Valid || !step3Valid || submitting) {
      return;
    }

    // 合并所有步骤的数据
    const formData = {
      ...step1Data,
      ...step2Data,
      ...step3Data
    };
    
    console.log('提交的表单数据:', formData);
    
    // 重置所有状态 - 需要重置多个状态
    setStep1Data({
      name: '',
      email: '',
      phone: '',
      age: ''
    });
    setStep2Data({
      country: '',
      province: '',
      city: '',
      address: '',
      zipCode: ''
    });
    setStep3Data({
      theme: 'light',
      notifications: false,
      newsletter: false,
      language: 'zh-CN'
    });
    setStep1Valid(false);
    setStep2Valid(false);
    setStep3Valid(false);
    setCurrentStep(1);
    setSubmitting(false);
    alert('表单提交成功！');
  }, [step1Valid, step2Valid, step3Valid, step1Data, step2Data, step3Data, submitting]);

  // 重置表单 - 需要重置所有状态
  const resetForm = useCallback(() => {
    setStep1Data({
      name: '',
      email: '',
      phone: '',
      age: ''
    });
    setStep2Data({
      country: '',
      province: '',
      city: '',
      address: '',
      zipCode: ''
    });
    setStep3Data({
      theme: 'light',
      notifications: false,
      newsletter: false,
      language: 'zh-CN'
    });
    setStep1Valid(false);
    setStep2Valid(false);
    setStep3Valid(false);
    setCurrentStep(1);
    setSubmitting(false);
  }, []);

  // 渲染当前步骤 - 需要传递大量的props
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Form
            data={step1Data}
            setData={setStep1Data}
            valid={step1Valid}
            setValid={setStep1Valid}
          />
        );
      case 2:
        return (
          <Step2Form
            data={step2Data}
            setData={setStep2Data}
            valid={step2Valid}
            setValid={setStep2Valid}
          />
        );
      case 3:
        return (
          <Step3Form
            data={step3Data}
            setData={setStep3Data}
            valid={step3Valid}
            setValid={setStep3Valid}
          />
        );
      default:
        return (
          <Step1Form
            data={step1Data}
            setData={setStep1Data}
            valid={step1Valid}
            setValid={setStep1Valid}
          />
        );
    }
  };

  // 检查是否可以进入下一步
  const canGoNext = useCallback(() => {
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
  }, [currentStep, step1Valid, step2Valid, step3Valid]);

  // 检查是否可以提交
  const canSubmit = useCallback(() => {
    return step1Valid && step2Valid && step3Valid && !submitting;
  }, [step1Valid, step2Valid, step3Valid, submitting]);

  return (
    <div className="multi-step-form useState-version">
      <Steps 
        currentStep={currentStep}
        step1Valid={step1Valid}
        step2Valid={step2Valid}
        step3Valid={step3Valid}
        canGoToStep={canGoToStep}
        setCurrentStep={setCurrentStep}
      />
      
      <div className="form-container">
        {renderCurrentStep()}
        
        <div className="form-navigation">
          <div className="nav-buttons">
            {currentStep > 1 && (
              <button 
                type="button" 
                onClick={prevStep}
                className="nav-btn prev-btn"
              >
                ← 上一步
              </button>
            )}
            
            {currentStep < 3 && (
              <button 
                type="button" 
                onClick={nextStep}
                disabled={!canGoNext()}
                className="nav-btn next-btn"
              >
                下一步 →
              </button>
            )}
            
            {currentStep === 3 && (
              <button 
                type="button" 
                onClick={submitForm}
                disabled={!canSubmit()}
                className="nav-btn submit-btn"
              >
                提交表单
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
