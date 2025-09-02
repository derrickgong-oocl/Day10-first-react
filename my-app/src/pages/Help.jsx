import './Help.css';

export default function Help() {
  return (
    <section className="help-page">
      <h2>帮助中心</h2>
      <p>欢迎使用 Sally Ride 的待办清单应用！以下是常见问题解答：</p>

      <article className="help-section">
        <h3>📌 如何添加待办事项？</h3>
        <p>在首页输入框中输入任务内容，点击“添加”按钮即可。</p>
      </article>

      <article className="help-section">
        <h3>✅ 如何标记任务为完成？</h3>
        <p>点击任务前的复选框即可切换完成状态。</p>
      </article>

      <article className="help-section">
        <h3>🔍 如何过滤已完成任务？</h3>
        <p>勾选“过滤已完成的待办事项”复选框，列表将只显示未完成任务。</p>
      </article>

      <article className="help-section">
        <h3>📱 是否支持移动端？</h3>
        <p>是的，本应用采用响应式设计，在手机和平板上也能良好显示。</p>
      </article>

      <article className="help-section">
        <h3>💾 数据会丢失吗？</h3>
        <p>目前数据存储在浏览器内存中，刷新页面后初始数据会重置。未来版本将支持本地保存。</p>
      </article>

      <footer className="help-footer">
        <p>仍遇到问题？请前往 <a href="/contact">联系页面</a> 告诉我们！</p>
      </footer>
    </section>
  );
}