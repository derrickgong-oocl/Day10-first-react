import React, { useEffect } from 'react';
import '../zustand-version/StepForm.css';

const Step3Form = ({ data, setData, valid, setValid }) => {
  // 验证表单
  const validateForm = (formData) => {
    const { theme, language } = formData;
    
    const themeValid = ['light', 'dark', 'auto'].includes(theme);
    const languageValid = ['zh-CN', 'en-US', 'ja-JP'].includes(language);
    
    return themeValid && languageValid;
  };

  // 处理输入变化
  const handleInputChange = (field, value) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    
    // 实时验证
    const isValid = validateForm(newData);
    setValid(isValid);
  };

  // 处理复选框变化
  const handleCheckboxChange = (field, checked) => {
    const newData = { ...data, [field]: checked };
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
        <h3>步骤 3: 偏好设置 (useState版本)</h3>
        <p>请设置您的个人偏好选项</p>

      </div>

      <div className="form-content">
        <div className="form-group">
          <label htmlFor="theme">主题设置 *</label>
          <select
            id="theme"
            value={data.theme}
            onChange={(e) => handleInputChange('theme', e.target.value)}
          >
            <option value="light">浅色主题</option>
            <option value="dark">深色主题</option>
            <option value="auto">跟随系统</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="language">语言设置 *</label>
          <select
            id="language"
            value={data.language}
            onChange={(e) => handleInputChange('language', e.target.value)}
          >
            <option value="zh-CN">简体中文</option>
            <option value="en-US">English</option>
            <option value="ja-JP">日本語</option>
          </select>
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={data.notifications}
              onChange={(e) => handleCheckboxChange('notifications', e.target.checked)}
            />
            <span className="checkmark"></span>
            接收推送通知
          </label>
          <p className="checkbox-description">接收重要的系统通知和更新提醒</p>
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={data.newsletter}
              onChange={(e) => handleCheckboxChange('newsletter', e.target.checked)}
            />
            <span className="checkmark"></span>
            订阅新闻通讯
          </label>
          <p className="checkbox-description">定期接收产品更新和行业资讯</p>
        </div>

        <div className="preferences-summary">
          <h4>当前设置预览</h4>
          <div className="summary-item">
            <span>主题：</span>
            <span className="summary-value">
              {data.theme === 'light' ? '浅色主题' : 
               data.theme === 'dark' ? '深色主题' : '跟随系统'}
            </span>
          </div>
          <div className="summary-item">
            <span>语言：</span>
            <span className="summary-value">
              {data.language === 'zh-CN' ? '简体中文' : 
               data.language === 'en-US' ? 'English' : '日本語'}
            </span>
          </div>
          <div className="summary-item">
            <span>通知：</span>
            <span className="summary-value">
              {data.notifications ? '开启' : '关闭'}
            </span>
          </div>
          <div className="summary-item">
            <span>新闻通讯：</span>
            <span className="summary-value">
              {data.newsletter ? '订阅' : '不订阅'}
            </span>
          </div>
        </div>

        <div className="form-actions">
          <div className="validation-status">
            {valid && <span className="success">✓ 偏好设置验证通过</span>}
            {!valid && (
              <span className="error">⚠ 请检查偏好设置</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3Form;
