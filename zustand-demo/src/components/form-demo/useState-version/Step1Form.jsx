import React, { useEffect } from 'react';
import '../zustand-version/StepForm.css';
import { validateStep1Form } from '../validateUtils';

const Step1Form = ({ data, setData, valid, setValid }) => {
  // 处理输入变化
  const handleInputChange = (field, value) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    
    // 实时验证
    const isValid = validateStep1Form(newData);
    setValid(isValid);
  };

  // 组件挂载时进行初始验证
  useEffect(() => {
    const isValid = validateStep1Form(data);
    setValid(isValid);
  }, []);

  return (
    <div className="step-form">
      <div className="form-header">
        <h3>步骤 1: 基本信息 (useState版本)</h3>
        <p>请填写您的个人基本信息</p>

      </div>

      <div className="form-content">
        <div className="form-group">
          <label htmlFor="name">姓名 *</label>
          <input
            type="text"
            id="name"
            value={data.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="请输入您的姓名"
            className={data.name && data.name.trim().length < 2 ? 'error' : ''}
          />
          {data.name && data.name.trim().length < 2 && (
            <span className="error-message">姓名至少需要2个字符</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">邮箱 *</label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="请输入您的邮箱地址"
            className={data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ? 'error' : ''}
          />
          {data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) && (
            <span className="error-message">请输入有效的邮箱地址</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">手机号 *</label>
          <input
            type="tel"
            id="phone"
            value={data.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="请输入您的手机号"
            className={data.phone && !/^1[3-9]\d{9}$/.test(data.phone) ? 'error' : ''}
          />
          {data.phone && !/^1[3-9]\d{9}$/.test(data.phone) && (
            <span className="error-message">请输入有效的手机号</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="age">年龄 *</label>
          <input
            type="number"
            id="age"
            value={data.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            placeholder="请输入您的年龄"
            min="18"
            max="100"
            className={data.age && (parseInt(data.age) < 18 || parseInt(data.age) > 100) ? 'error' : ''}
          />
          {data.age && (parseInt(data.age) < 18 || parseInt(data.age) > 100) && (
            <span className="error-message">年龄必须在18-100之间</span>
          )}
        </div>

        <div className="form-actions">
          <div className="validation-status">
            {valid && <span className="success">✓ 表单验证通过</span>}
            {!valid && data.name && (
              <span className="error">⚠ 请检查表单填写</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1Form;
