import { useRegisterStore } from '../stores/registerStore';
import './Register.css';


function VerificationCodeButton() {
  const {sendVerificationCode, verificationCodeState} = useRegisterStore();

  const handleSendCode = () => {
    sendVerificationCode();
    // 处理发送验证码逻辑
    console.log('发送验证码');
  };
  
  return (
    <button 
      type="button" 
      onClick={handleSendCode}
      disabled={verificationCodeState.isLoading}
    >
      {verificationCodeState.isLoading ? `${verificationCodeState.countdown}s后重发` : '发送验证码'}
    </button>
  );
}

function Register() {
  const { formData, onUpdateFormData } = useRegisterStore();
  const handleSubmit = (formData) => {
    e.preventDefault();
    // 处理表单提交逻辑
    console.log('表单提交');
  };

  return (
    <div className="Register">
      <h1>用户注册</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <label htmlFor="username">用户名</label>
            <input 
              type="text" 
              id="username"
              placeholder="请输入用户名" 
              required
              onChange={(e) => onUpdateFormData('username', e.target.value)}
              value={formData.username}
            />
          </li>
          <li>
            <label htmlFor="password">密码</label>
            <input 
              type="password" 
              id="password"
              placeholder="请输入密码" 
              required
              onChange={(e) => onUpdateFormData('password', e.target.value)}
              value={formData.password}
            />
          </li>
          <li>
            <label htmlFor="phone">手机号</label>
            <div className="phone-input-group">
              <input 
                type="tel" 
                id="phone"
                placeholder="请输入手机号" 
                required
                onChange={(e) => onUpdateFormData('phone', e.target.value)}
                value={formData.phone}
              />
              <VerificationCodeButton />
            </div>
          </li>
          <li>
            <label htmlFor="verificationCode">手机验证码</label>
            <input 
              type="text" 
              id="verificationCode"
              placeholder="请输入手机验证码" 
              required
              onChange={(e) => onUpdateFormData('verificationCode', e.target.value)}
              value={formData.verificationCode}
            />
          </li>
        </ul>
        <button type="submit">
          注册
        </button>
      </form>
    </div>
  );
}

export default Register;
