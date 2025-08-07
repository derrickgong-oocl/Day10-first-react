
import './Register.css';

function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // 处理表单提交逻辑
    console.log('表单提交');
  };

  const handleSendCode = () => {
    // 处理发送验证码逻辑
    console.log('发送验证码');
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
            />
          </li>
          <li>
            <label htmlFor="password">密码</label>
            <input 
              type="password" 
              id="password"
              placeholder="请输入密码" 
              required
            />
          </li>
          <li>
            <label htmlFor="confirmPassword">确认密码</label>
            <input 
              type="password" 
              id="confirmPassword"
              placeholder="请再次输入密码" 
              required
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
              />
              <button type="button" onClick={handleSendCode}>
                发送验证码
              </button>
            </div>
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
