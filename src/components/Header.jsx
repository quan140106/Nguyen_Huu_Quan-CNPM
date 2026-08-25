function Header() {
  return (
    <header className="header">
      <div>
        <h1>Tổng quan</h1>
        <p>Manage Smarter. Serve Better.</p>
      </div>

      <div className="header-actions">
        <button className="icon-button">
          🔔
        </button>

        <button className="profile-button">
          <div className="user-avatar">M</div>

          <div>
            <strong>Quản lý</strong>
            <span>Quản trị viên</span>
          </div>
        </button>
      </div>
    </header>
  )
}

export default Header