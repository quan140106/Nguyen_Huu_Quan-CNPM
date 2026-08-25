function ManagerDashboard() {
  return (
    <section className="dashboard">

      {/* Welcome */}
      <div className="welcome">
        <div>
          <h2>Chào mừng trở lại, Quản lý 👋</h2>

          <p>
            Đây là tình hình hoạt động của nhà hàng hôm nay.
          </p>
        </div>

        <button className="primary-button">
          + Tạo đơn hàng
        </button>
      </div>

      {/* Statistics */}
      <div className="stats-grid">

        <div className="stat-card">
          <span>Doanh thu hôm nay</span>

          <strong>5.250.000đ</strong>

          <small>
            ↑ 12,5% so với hôm qua
          </small>
        </div>

        <div className="stat-card">
          <span>Tổng số đơn</span>

          <strong>42</strong>

          <small>
            ↑ 8,2% so với hôm qua
          </small>
        </div>

        <div className="stat-card">
          <span>Bàn đang sử dụng</span>

          <strong>8</strong>

          <small>
            4 bàn đang trống
          </small>
        </div>

        <div className="stat-card">
          <span>Đơn đang xử lý</span>

          <strong>6</strong>

          <small>
            Cần chú ý
          </small>
        </div>

      </div>

      {/* Dashboard Content */}
      <div className="dashboard-grid">

        {/* Recent Orders */}
        <div className="panel">

          <div className="panel-header">
            <div>
              <h3>Đơn hàng gần đây</h3>

              <p>
                Các đơn hàng mới nhất
              </p>
            </div>

            <button>
              Xem tất cả
            </button>
          </div>

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

          </div>
        </div>

        {/* Top Products */}
        <div className="panel">

          <div className="panel-header">
            <div>
              <h3>Món bán chạy</h3>

              <p>
                Những món được gọi nhiều nhất
              </p>
            </div>
          </div>

          <div className="product-list">

            <div>
              <span>🍗</span>

              <div>
                <strong>Cơm gà</strong>

                <small>
                  124 đơn hàng
                </small>
              </div>
            </div>

            <div>
              <span>🍜</span>

              <div>
                <strong>Mì bò</strong>

                <small>
                  98 đơn hàng
                </small>
              </div>
            </div>

            <div>
              <span>🥤</span>

              <div>
                <strong>Nước cam</strong>

                <small>
                  76 đơn hàng
                </small>
              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  )
}

export default ManagerDashboard