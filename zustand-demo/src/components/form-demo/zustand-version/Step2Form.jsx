import React, { useEffect } from 'react';
import { useFormStore } from '../../../stores/formStore';
import './StepForm.css';

const Step2Form = () => {
  const { 
    step2Data, 
    step2Valid,
    updateStep2Data, 
    updateStep2Valid
  } = useFormStore();

  // 验证表单
  const validateForm = (data) => {
    const { country, province, city, address, zipCode } = data;
    
    const countryValid = country.trim().length > 0;
    const provinceValid = province.trim().length > 0;
    const cityValid = city.trim().length > 0;
    const addressValid = address.trim().length >= 5;
    const zipCodeValid = /^\d{6}$/.test(zipCode);
    
    return countryValid && provinceValid && cityValid && addressValid && zipCodeValid;
  };

  // 处理输入变化
  const handleInputChange = (field, value) => {
    const newData = { ...step2Data, [field]: value };
    updateStep2Data(newData);
    
    // 实时验证
    const isValid = validateForm(newData);
    updateStep2Valid(isValid);
  };

  // 验证表单
  // 组件挂载时进行初始验证
  useEffect(() => {
    const isValid = validateForm(step2Data);
    updateStep2Valid(isValid);
  }, []);

  return (
    <div className="step-form">
      <div className="form-header">
        <h3>步骤 2: 地址信息</h3>
        <p>请填写您的详细地址信息</p>
      </div>

      <div className="form-content">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="country">国家 *</label>
            <select
              id="country"
              value={step2Data.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className={step2Data.country && step2Data.country.trim().length === 0 ? 'error' : ''}
            >
              <option value="">请选择国家</option>
              <option value="中国">中国</option>
              <option value="美国">美国</option>
              <option value="日本">日本</option>
              <option value="韩国">韩国</option>
              <option value="其他">其他</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="province">省份 *</label>
            <select
              id="province"
              value={step2Data.province}
              onChange={(e) => handleInputChange('province', e.target.value)}
              className={step2Data.province && step2Data.province.trim().length === 0 ? 'error' : ''}
            >
              <option value="">请选择省份</option>
              <option value="北京">北京</option>
              <option value="上海">上海</option>
              <option value="广东">广东</option>
              <option value="江苏">江苏</option>
              <option value="浙江">浙江</option>
              <option value="其他">其他</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">城市 *</label>
            <input
              type="text"
              id="city"
              value={step2Data.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="请输入城市名称"
              className={step2Data.city && step2Data.city.trim().length === 0 ? 'error' : ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="zipCode">邮编 *</label>
            <input
              type="text"
              id="zipCode"
              value={step2Data.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              placeholder="请输入6位邮编"
              maxLength="6"
              className={step2Data.zipCode && !/^\d{6}$/.test(step2Data.zipCode) ? 'error' : ''}
            />
            {step2Data.zipCode && !/^\d{6}$/.test(step2Data.zipCode) && (
              <span className="error-message">请输入6位数字邮编</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">详细地址 *</label>
          <textarea
            id="address"
            value={step2Data.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="请输入详细地址，包括街道、门牌号等"
            rows="3"
            className={step2Data.address && step2Data.address.trim().length < 5 ? 'error' : ''}
          />
          {step2Data.address && step2Data.address.trim().length < 5 && (
            <span className="error-message">详细地址至少需要5个字符</span>
          )}
        </div>

        <div className="form-actions">
          <div className="validation-status">
            {step2Valid && <span className="success">✓ 地址信息验证通过</span>}
            {!step2Valid && step2Data.country && (
              <span className="error">⚠ 请检查地址信息填写</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2Form;
