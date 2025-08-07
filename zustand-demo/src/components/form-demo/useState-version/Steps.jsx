import React from 'react';
import '../shared/SharedStyles.css';
import './UseStateSpecific.css';

const Steps = ({ 
  currentStep, 
  step1Valid, 
  step2Valid, 
  step3Valid,
  step1Loading,
  step2Loading,
  step3Loading,
  canGoToStep,
  setCurrentStep 
}) => {
  const steps = [
    { id: 1, title: '基本信息', description: '填写个人基本信息' },
    { id: 2, title: '地址信息', description: '填写详细地址信息' },
    { id: 3, title: '偏好设置', description: '设置个人偏好选项' }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'pending';
  };

  const getStepIcon = (stepId) => {
    const status = getStepStatus(stepId);
    const loading = stepId === 1 ? step1Loading : stepId === 2 ? step2Loading : step3Loading;
    const valid = stepId === 1 ? step1Valid : stepId === 2 ? step2Valid : step3Valid;

    if (loading) return '⏳';
    if (status === 'completed') return '✓';
    if (status === 'current') return valid ? '✓' : '⚠';
    return stepId;
  };

  const handleStepClick = (stepId) => {
    if (canGoToStep(stepId)) {
      setCurrentStep(stepId);
    }
  };

  return (
    <div className="steps-container">
      <div className="steps-header">
        <p>当前步骤: {currentStep}/3</p>
      </div>
      
      <div className="steps">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div 
              className={`step ${getStepStatus(step.id)} ${canGoToStep(step.id) ? 'clickable' : 'disabled'}`}
              onClick={() => handleStepClick(step.id)}
            >
              <div className="step-icon">
                {getStepIcon(step.id)}
              </div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {step.id === 1 && step1Valid && <span className="valid-indicator">✓ 已验证</span>}
                {step.id === 2 && step2Valid && <span className="valid-indicator">✓ 已验证</span>}
                {step.id === 3 && step3Valid && <span className="valid-indicator">✓ 已验证</span>}
              </div>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`step-connector ${getStepStatus(step.id + 1) === 'completed' ? 'completed' : ''}`} />
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="steps-progress">
        <div 
          className="progress-bar" 
          style={{ width: `${(currentStep / 3) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Steps;
