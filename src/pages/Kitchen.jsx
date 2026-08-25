import { useState } from 'react'

function Kitchen() {

  const [orders, setOrders] = useState([
    {
      id: 'ORD-004',
      table: 'Bàn 03',
      time: '14:05',
      status: 'new',
      items: [
        { name: 'Cơm gà', quantity: 2 },
        { name: 'Nước cam', quantity: 2 },
      ],
    },
    {
      id: 'ORD-005',
      table: 'Bàn 05',
      time: '14:10',
      status: 'cooking',
      items: [
        { name: 'Mì bò', quantity: 2 },
        { name: 'Cơm gà', quantity: 1 },
      ],
    },
    {
      id: 'ORD-006',
      table: 'Bàn 08',
      time: '14:15',
      status: 'cooking',
      items: [
        { name: 'Lẩu Thái', quantity: 1 },
        { name: 'Nước cam', quantity: 3 },
      ],
    },
    {
      id: 'ORD-007',
      table: 'Bàn 02',
      time: '14:20',
      status: 'ready',
      items: [
        { name: 'Mì bò', quantity: 1 },
        { name: 'Khoai tây chiên', quantity: 1 },
      ],
    },
  ])

  const changeStatus = (id, newStatus) => {

    setOrders(
      orders.map((order) =>
        order.id === id
          ? {
              ...order,
              status: newStatus,
            }
          : order
      )
    )
  }

  const getStatusText = (status) => {

    switch (status) {

      case 'new':
        return 'ĐƠN MỚI'

      case 'cooking':
        return 'ĐANG CHẾ BIẾN'

      case 'ready':
        return 'SẴN SÀNG'

      case 'completed':
        return 'HOÀN THÀNH'

      default:
        return ''
    }
  }

  const getNextAction = (order) => {

    switch (order.status) {

      case 'new':
        return (
          <button
            className="kitchen-action cooking-action"
            onClick={() =>
              changeStatus(
                order.id,
                'cooking'
              )
            }
          >
            🔥 Bắt đầu chế biến
          </button>
        )

      case 'cooking':
        return (
          <button
            className="kitchen-action ready-action"
            onClick={() =>
              changeStatus(
                order.id,
                'ready'
              )
            }
          >
            ✅ Báo món sẵn sàng
          </button>
        )

      case 'ready':
        return (
          <button
            className="kitchen-action complete-action"
            onClick={() =>
              changeStatus(
                order.id,
                'completed'
              )
            }
          >
            🏁 Hoàn thành
          </button>
        )

      default:
        return null
    }
  }

  return (
    <section className="dashboard">

      {/* Header */}

      <div className="welcome">

        <div>

          <h2>Bếp</h2>

          <p>
            Theo dõi và xử lý các đơn hàng trong bếp.
          </p>

        </div>

        <button
          className="primary-button"
          onClick={() => window.location.reload()}
        >
          🔄 Làm mới
        </button>

      </div>

      {/* Statistics */}

      <div className="stats-grid">

        <div className="stat-card">

          <span>
            Đơn mới
          </span>

          <strong>
            {
              orders.filter(
                (order) =>
                  order.status === 'new'
              ).length
            }
          </strong>

          <small>
            Chờ bếp nhận
          </small>

        </div>

        <div className="stat-card">

          <span>
            Đang chế biến
          </span>

          <strong>
            {
              orders.filter(
                (order) =>
                  order.status === 'cooking'
              ).length
            }
          </strong>

          <small>
            Đang xử lý
          </small>

        </div>

        <div className="stat-card">

          <span>
            Sẵn sàng
          </span>

          <strong>
            {
              orders.filter(
                (order) =>
                  order.status === 'ready'
              ).length
            }
          </strong>

          <small>
            Chờ phục vụ
          </small>

        </div>

        <div className="stat-card">

          <span>
            Hoàn thành
          </span>

          <strong>
            {
              orders.filter(
                (order) =>
                  order.status === 'completed'
              ).length
            }
          </strong>

          <small>
            Đã xử lý
          </small>

        </div>

      </div>

      {/* Kitchen Board */}

      <div className="kitchen-board">

        {/* New */}

        <div className="kitchen-column">

          <div className="kitchen-column-header new-header">

            <h3>
              🆕 Đơn mới
            </h3>

            <span>
              {
                orders.filter(
                  (order) =>
                    order.status === 'new'
                ).length
              }
            </span>

          </div>

          <div className="kitchen-orders">

            {orders
              .filter(
                (order) =>
                  order.status === 'new'
              )
              .map((order) => (

                <KitchenOrder
                  key={order.id}
                  order={order}
                  getStatusText={getStatusText}
                  getNextAction={getNextAction}
                />

              ))}

          </div>

        </div>

        {/* Cooking */}

        <div className="kitchen-column">

          <div className="kitchen-column-header cooking-header">

            <h3>
              🔥 Đang chế biến
            </h3>

            <span>
              {
                orders.filter(
                  (order) =>
                    order.status === 'cooking'
                ).length
              }
            </span>

          </div>

          <div className="kitchen-orders">

            {orders
              .filter(
                (order) =>
                  order.status === 'cooking'
              )
              .map((order) => (

                <KitchenOrder
                  key={order.id}
                  order={order}
                  getStatusText={getStatusText}
                  getNextAction={getNextAction}
                />

              ))}

          </div>

        </div>

        {/* Ready */}

        <div className="kitchen-column">

          <div className="kitchen-column-header ready-header">

            <h3>
              ✅ Sẵn sàng
            </h3>

            <span>
              {
                orders.filter(
                  (order) =>
                    order.status === 'ready'
                ).length
              }
            </span>

          </div>

          <div className="kitchen-orders">

            {orders
              .filter(
                (order) =>
                  order.status === 'ready'
              )
              .map((order) => (

                <KitchenOrder
                  key={order.id}
                  order={order}
                  getStatusText={getStatusText}
                  getNextAction={getNextAction}
                />

              ))}

          </div>

        </div>

        {/* Completed */}

        <div className="kitchen-column">

          <div className="kitchen-column-header completed-header">

            <h3>
              🏁 Hoàn thành
            </h3>

            <span>
              {
                orders.filter(
                  (order) =>
                    order.status === 'completed'
                ).length
              }
            </span>

          </div>

          <div className="kitchen-orders">

            {orders
              .filter(
                (order) =>
                  order.status === 'completed'
              )
              .map((order) => (

                <KitchenOrder
                  key={order.id}
                  order={order}
                  getStatusText={getStatusText}
                  getNextAction={getNextAction}
                />

              ))}

          </div>

        </div>

      </div>

    </section>
  )
}


/* ORDER CARD */

function KitchenOrder({
  order,
  getStatusText,
  getNextAction,
}) {

  return (

    <div className="kitchen-card">

      <div className="kitchen-card-header">

        <strong>
          #{order.id}
        </strong>

        <span>
          {order.time}
        </span>

      </div>

      <div className="kitchen-table">

        🪑 {order.table}

      </div>

      <div className="kitchen-items">

        {order.items.map((item, index) => (

          <div
            className="kitchen-item"
            key={index}
          >

            <span>
              {item.name}
            </span>

            <strong>
              x{item.quantity}
            </strong>

          </div>

        ))}

      </div>

      <div className="kitchen-status">

        {getStatusText(order.status)}

      </div>

      {getNextAction(order)}

    </div>
  )
}

export default Kitchen