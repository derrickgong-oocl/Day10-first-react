import React, { useEffect } from 'react';
import '../zustand-version/StepForm.css';

const Step2Form = ({ data, setData, valid, setValid }) => {
  // 验证表单
  const validateForm = (formData) => {
    const { country, province, city, address, zipCode } = formData;
    
    const countryValid = country.trim().length > 0;
    const provinceValid = province.trim().length > 0;
    const cityValid = city.trim().length > 0;
    const addressValid = address.trim().length >= 5;
    const zipCodeValid = /^\d{6}$/.test(zipCode);
    
    return countryValid && provinceValid && cityValid && addressValid && zipCodeValid;
  };

  // 处理输入变化
  const handleInputChange = (field, value) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    
    // 实时验证
    const isValid = validateForm(newData);
    setValid(isValid);
  };

  // 验证表单
  // 组件挂载时进行初始验证
  useEffect(() => {
    const isValid = validateForm(data);
    setValid(isValid);
  }, []);

  return (
    <div className="step-form">
      <div className="form-header">
        <h3>步骤 2: 地址信息 (useState版本)</h3>
        <p>请填写您的详细地址信息</p>

      </div>

      <div className="form-content">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="country">国家 *</label>
            <select
              id="country"
              value={data.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className={data.country && data.country.trim().length === 0 ? 'error' : ''}
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
              value={data.province}
              onChange={(e) => handleInputChange('province', e.target.value)}
              className={data.province && data.province.trim().length === 0 ? 'error' : ''}
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
              value={data.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="请输入城市名称"
              className={data.city && data.city.trim().length === 0 ? 'error' : ''}
            />
          </div>

          <div className="form-group">
            <label htmlFor="zipCode">邮编 *</label>
            <input
              type="text"
              id="zipCode"
              value={data.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              placeholder="请输入6位邮编"
              maxLength="6"
              className={data.zipCode && !/^\d{6}$/.test(data.zipCode) ? 'error' : ''}
            />
            {data.zipCode && !/^\d{6}$/.test(data.zipCode) && (
              <span className="error-message">请输入6位数字邮编</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">详细地址 *</label>
          <textarea
            id="address"
            value={data.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="请输入详细地址，包括街道、门牌号等"
            rows="3"
            className={data.address && data.address.trim().length < 5 ? 'error' : ''}
          />
          {data.address && data.address.trim().length < 5 && (
            <span className="error-message">详细地址至少需要5个字符</span>
          )}
        </div>

        <div className="form-actions">
          <div className="validation-status">
            {valid && <span className="success">✓ 地址信息验证通过</span>}
            {!valid && data.country && (
              <span className="error">⚠ 请检查地址信息填写</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2Form;
