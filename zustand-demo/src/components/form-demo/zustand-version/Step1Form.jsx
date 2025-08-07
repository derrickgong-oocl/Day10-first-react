import React, { useEffect } from 'react';
import { useFormStore } from '../../../stores/formStore';
import './StepForm.css';

const Step1Form = () => {
  const { 
    step1Data, 
    step1Valid,
    updateStep1Data, 
    updateStep1Valid
  } = useFormStore();

  // 验证表单
  const validateForm = (data) => {
    const { name, email, phone, age } = data;
    
    const nameValid = name.trim().length >= 2;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneValid = /^1[3-9]\d{9}$/.test(phone);
    const ageValid = age && parseInt(age) >= 18 && parseInt(age) <= 100;
    
    return nameValid && emailValid && phoneValid && ageValid;
  };

  // 处理输入变化
  const handleInputChange = (field, value) => {
    const newData = { ...step1Data, [field]: value };
    updateStep1Data(newData);
    
    // 实时验证
    const isValid = validateForm(newData);
    updateStep1Valid(isValid);
  };

  // 组件挂载时进行初始验证
  useEffect(() => {
    const isValid = validateForm(step1Data);
    updateStep1Valid(isValid);
  }, []);

  return (
    <div className="step-form">
      <div className="form-header">
        <h3>步骤 1: 基本信息</h3>
        <p>请填写您的个人基本信息</p>
      </div>

      <div className="form-content">
        <div className="form-group">
          <label htmlFor="name">姓名 *</label>
          <input
            type="text"
            id="name"
            value={step1Data.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="请输入您的姓名"
            className={step1Data.name && step1Data.name.trim().length < 2 ? 'error' : ''}
          />
          {step1Data.name && step1Data.name.trim().length < 2 && (
            <span className="error-message">姓名至少需要2个字符</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">邮箱 *</label>
          <input
            type="email"
            id="email"
            value={step1Data.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="请输入您的邮箱地址"
            className={step1Data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(step1Data.email) ? 'error' : ''}
          />
          {step1Data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(step1Data.email) && (
            <span className="error-message">请输入有效的邮箱地址</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">手机号 *</label>
          <input
            type="tel"
            id="phone"
            value={step1Data.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="请输入您的手机号"
            className={step1Data.phone && !/^1[3-9]\d{9}$/.test(step1Data.phone) ? 'error' : ''}
          />
          {step1Data.phone && !/^1[3-9]\d{9}$/.test(step1Data.phone) && (
            <span className="error-message">请输入有效的手机号</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="age">年龄 *</label>
          <input
            type="number"
            id="age"
            value={step1Data.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            placeholder="请输入您的年龄"
            min="18"
            max="100"
            className={step1Data.age && (parseInt(step1Data.age) < 18 || parseInt(step1Data.age) > 100) ? 'error' : ''}
          />
          {step1Data.age && (parseInt(step1Data.age) < 18 || parseInt(step1Data.age) > 100) && (
            <span className="error-message">年龄必须在18-100之间</span>
          )}
        </div>

        <div className="form-actions">
          <div className="validation-status">
            {step1Valid && <span className="success">✓ 表单验证通过</span>}
            {!step1Valid && step1Data.name && (
              <span className="error">⚠ 请检查表单填写</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1Form;
