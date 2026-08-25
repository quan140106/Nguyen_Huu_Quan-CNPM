function Orders() {
  return (
    <section className="dashboard">

      {/* Page Header */}
      <div className="welcome">
        <div>
          <h2>Đơn hàng</h2>

          <p>
            Quản lý và theo dõi tất cả đơn hàng của nhà hàng.
          </p>
        </div>

        <button className="primary-button">
          + Tạo đơn hàng
        </button>
      </div>

      {/* Order Summary */}
      <div className="stats-grid">

        <div className="stat-card">
          <span>Tổng đơn hôm nay</span>
          <strong>42</strong>
          <small>↑ 8,2% so với hôm qua</small>
        </div>

        <div className="stat-card">
          <span>Đơn mới</span>
          <strong>4</strong>
          <small>Cần xử lý</small>
        </div>

        <div className="stat-card">
          <span>Đang chế biến</span>
          <strong>6</strong>
          <small>Đang thực hiện</small>
        </div>

        <div className="stat-card">
          <span>Hoàn thành</span>
          <strong>32</strong>
          <small>Đã phục vụ</small>
        </div>

      </div>

      {/* Orders Panel */}
      <div className="panel">

        <div className="panel-header">
          <div>
            <h3>Danh sách đơn hàng</h3>

            <p>
              Theo dõi trạng thái các đơn hàng
            </p>
          </div>

          <button>
            Lọc đơn hàng
          </button>
        </div>

        {/* Search */}
        <div
          style={{
            padding: '20px',
            display: 'flex',
            gap: '12px',
            borderBottom: '1px solid #e5e7eb'
          }}
        >
          <input
            type="text"
            placeholder="🔍 Tìm mã đơn hoặc số bàn..."
            style={{
              flex: 1,
              padding: '11px 14px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              outline: 'none'
            }}
          />

          <select
            style={{
              padding: '11px 14px',
              border: '1px solid #d1d5db',
              borderRadius: '8px'
            }}
          >
            <option>Tất cả trạng thái</option>
            <option>Đơn mới</option>
            <option>Đang chế biến</option>
            <option>Sẵn sàng</option>
            <option>Hoàn thành</option>
          </select>
        </div>

        {/* Orders */}
        <div className="orders-list">

          <div className="order-row">
            <strong>#ORD-001</strong>

            <span>Bàn 05</span>

            <span>350.000đ</span>

            <span className="status cooking">
              ĐANG CHẾ BIẾN
            </span>
          </div>

          <div className="order-row">
            <strong>#ORD-002</strong>

            <span>Bàn 02</span>

            <span>520.000đ</span>

            <span className="status ready">
              SẴN SÀNG
            </span>
          </div>

          <div className="order-row">
            <strong>#ORD-003</strong>

            <span>Bàn 08</span>

            <span>280.000đ</span>

            <span className="status completed">
              HOÀN THÀNH
            </span>
          </div>

          <div className="order-row">
            <strong>#ORD-004</strong>

            <span>Bàn 03</span>

            <span>410.000đ</span>

            <span className="status new">
              ĐƠN MỚI
            </span>
          </div>

          <div className="order-row">
            <strong>#ORD-005</strong>

            <span>Bàn 10</span>

            <span>760.000đ</span>

            <span className="status cooking">
              ĐANG CHẾ BIẾN
            </span>
          </div>

        </div>

      </div>

    </section>
  )
}

export default Orders