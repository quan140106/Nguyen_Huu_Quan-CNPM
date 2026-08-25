function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    { id: 'dashboard', label: '📊 Tổng quan' },
    { id: 'orders', label: '🧾 Đơn hàng' },
    { id: 'tables', label: '🪑 Bàn' },
    { id: 'menu', label: '🍜 Thực đơn' },
    { id: 'inventory', label: '📦 Kho' },
    { id: 'kitchen', label: '👨‍🍳 Bếp' },
    { id: 'payment', label: '💳 Thanh toán' },
    { id: 'reports', label: '📈 Báo cáo' },
    { id: 'settings', label: '⚙️ Cài đặt' },
  ]

  return (
    <aside className="sidebar">

      {/* Brand */}
      <div className="brand">
        <div className="brand-logo">
          HI
        </div>

        <div>
          <h2>HI MrD</h2>
          <span>Quản lý nhà hàng</span>
        </div>
      </div>

      {/* Menu */}
      <nav className="sidebar-menu">

        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${
              activePage === item.id ? 'active' : ''
            }`}
            onClick={() => setActivePage(item.id)}
          >
            {item.label}
          </button>
        ))}

      </nav>

      {/* Footer */}
      <div className="sidebar-footer">

        <div className="user-avatar">
          M
        </div>

        <div>
          <strong>Quản lý</strong>
          <span>Quản trị viên</span>
        </div>

      </div>

    </aside>
  )
}

export default Sidebar