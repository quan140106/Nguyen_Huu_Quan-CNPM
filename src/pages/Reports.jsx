import { useState } from 'react'

function Reports() {
  const [period, setPeriod] = useState('today')

  const reports = {
    today: {
      revenue: 5250000,
      orders: 42,
      customers: 118,
    },
    week: {
      revenue: 32850000,
      orders: 286,
      customers: 764,
    },
    month: {
      revenue: 124500000,
      orders: 1086,
      customers: 3240,
    },
  }

  const data = reports[period]

  const formatMoney = (number) => {
    return number.toLocaleString('vi-VN') + 'đ'
  }

  const topFoods = [
    {
      name: 'Cơm gà',
      orders: 124,
      revenue: 8060000,
      icon: '🍗',
    },
    {
      name: 'Mì bò',
      orders: 98,
      revenue: 5390000,
      icon: '🍜',
    },
    {
      name: 'Nước cam',
      orders: 76,
      revenue: 2280000,
      icon: '🥤',
    },
    {
      name: 'Lẩu Thái',
      orders: 54,
      revenue: 13500000,
      icon: '🍲',
    },
  ]

  const tables = [
    {
      table: 'Bàn 05',
      orders: 18,
      revenue: 4250000,
    },
    {
      table: 'Bàn 03',
      orders: 15,
      revenue: 3810000,
    },
    {
      table: 'Bàn 08',
      orders: 13,
      revenue: 3240000,
    },
    {
      table: 'Bàn 02',
      orders: 11,
      revenue: 2860000,
    },
  ]

  return (
    <section className="dashboard">

      {/* Header */}

      <div className="welcome">

        <div>
          <h2>Báo cáo</h2>

          <p>
            Theo dõi tình hình kinh doanh của nhà hàng.
          </p>
        </div>

        <select
          className="report-period"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="today">
            Hôm nay
          </option>

          <option value="week">
            7 ngày qua
          </option>

          <option value="month">
            Tháng này
          </option>
        </select>

      </div>

      {/* Statistics */}

      <div className="stats-grid">

        <div className="stat-card">
          <span>
            Doanh thu
          </span>

          <strong>
            {formatMoney(data.revenue)}
          </strong>

          <small>
            ↑ 12,5% so với kỳ trước
          </small>
        </div>

        <div className="stat-card">
          <span>
            Tổng đơn hàng
          </span>

          <strong>
            {data.orders}
          </strong>

          <small>
            ↑ 8,2% so với kỳ trước
          </small>
        </div>

        <div className="stat-card">
          <span>
            Khách hàng
          </span>

          <strong>
            {data.customers}
          </strong>

          <small>
            Khách đã phục vụ
          </small>
        </div>

        <div className="stat-card">
          <span>
            Giá trị đơn trung bình
          </span>

          <strong>
            {formatMoney(
              Math.round(data.revenue / data.orders)
            )}
          </strong>

          <small>
            Trung bình / đơn
          </small>
        </div>

      </div>

      {/* Report grid */}

      <div className="report-grid">

        {/* Top foods */}

        <div className="panel">

          <div className="panel-header">

            <div>
              <h3>
                🍜 Món bán chạy
              </h3>

              <p>
                Các món được gọi nhiều nhất
              </p>
            </div>

          </div>

          <div className="report-list">

            {topFoods.map((food, index) => (

              <div
                className="report-food"
                key={food.name}
              >

                <div className="report-rank">
                  {index + 1}
                </div>

                <div className="report-food-icon">
                  {food.icon}
                </div>

                <div className="report-food-info">

                  <strong>
                    {food.name}
                  </strong>

                  <span>
                    {food.orders} đơn hàng
                  </span>

                </div>

                <strong>
                  {formatMoney(food.revenue)}
                </strong>

              </div>

            ))}

          </div>

        </div>

        {/* Tables */}

        <div className="panel">

          <div className="panel-header">

            <div>
              <h3>
                🪑 Doanh thu theo bàn
              </h3>

              <p>
                Những bàn có doanh thu cao
              </p>
            </div>

          </div>

          <div className="report-list">

            {tables.map((table) => (

              <div
                className="report-table"
                key={table.table}
              >

                <div className="table-icon">
                  🪑
                </div>

                <div className="report-table-info">

                  <strong>
                    {table.table}
                  </strong>

                  <span>
                    {table.orders} đơn hàng
                  </span>

                </div>

                <strong>
                  {formatMoney(table.revenue)}
                </strong>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Revenue overview */}

      <div className="panel revenue-panel">

        <div className="panel-header">

          <div>
            <h3>
              📊 Tổng quan doanh thu
            </h3>

            <p>
              Doanh thu theo ngày
            </p>
          </div>

          <strong className="revenue-total">
            {formatMoney(data.revenue)}
          </strong>

        </div>

        <div className="revenue-chart">

          <div className="chart-bar">
            <span>Thứ 2</span>
            <div style={{ height: '45%' }}></div>
            <strong>4,2tr</strong>
          </div>

          <div className="chart-bar">
            <span>Thứ 3</span>
            <div style={{ height: '65%' }}></div>
            <strong>5,8tr</strong>
          </div>

          <div className="chart-bar">
            <span>Thứ 4</span>
            <div style={{ height: '55%' }}></div>
            <strong>5,1tr</strong>
          </div>

          <div className="chart-bar">
            <span>Thứ 5</span>
            <div style={{ height: '78%' }}></div>
            <strong>6,9tr</strong>
          </div>

          <div className="chart-bar">
            <span>Thứ 6</span>
            <div style={{ height: '88%' }}></div>
            <strong>7,7tr</strong>
          </div>

          <div className="chart-bar">
            <span>Thứ 7</span>
            <div style={{ height: '95%' }}></div>
            <strong>8,3tr</strong>
          </div>

          <div className="chart-bar">
            <span>CN</span>
            <div style={{ height: '72%' }}></div>
            <strong>6,4tr</strong>
          </div>

        </div>

      </div>

    </section>
  )
}

export default Reports