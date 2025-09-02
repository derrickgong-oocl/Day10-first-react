import './Contact.css';

export default function Contact() {
  return (
    <section className="contact-page">
      <h2>联系我们</h2>
      <p>如果您有任何建议、反馈或问题，请通过以下方式联系我们：</p>

      <div className="contact-info">
        <div className="info-item">
          <h3>📧 邮箱</h3>
          <p><a href="mailto:support@todoapp.example.com">support@todoapp.example.com</a></p>
        </div>

        <div className="info-item">
          <h3>💬 反馈表单</h3>
          <p>我们正在开发在线反馈系统，敬请期待！</p>
        </div>

        <div className="info-item">
          <h3>📍 社交媒体</h3>
          <p>
            <a href="https://twitter.com/todowithsally" target="_blank" rel="noopener noreferrer">
              Twitter @todowithsally
            </a>
            <br />
            <a href="https://github.com/sallyride-todo" target="_blank" rel="noopener noreferrer">
              GitHub 开源项目
            </a>
          </p>
        </div>

        <div className="info-item">
          <h3>🕒 工作时间</h3>
          <p>周一至周五，9:00 - 18:00（UTC-5）</p>
          <p>我们将在 24 小时内回复您的消息。</p>
        </div>
      </div>

      <div className="thank-you">
        <h3>感谢使用 Sally Ride 的待办清单！</h3>
        <p>每完成一项任务，都是向星辰迈出的一步 🚀</p>
      </div>
    </section>
  );
}