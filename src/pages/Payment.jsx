import { useState } from 'react'

function Payment() {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      table: 'Bàn 05',
      total: 350000,
      status: 'unpaid',
    },
    {
      id: 'ORD-002',
      table: 'Bàn 02',
      total: 520000,
      status: 'paid',
    },
    {
      id: 'ORD-003',
      table: 'Bàn 08',
      total: 280000,
      status: 'paid',
    },
    {
      id: 'ORD-004',
      table: 'Bàn 03',
      total: 410000,
      status: 'unpaid',
    },
  ])

  const [search, setSearch] = useState('')

  const [selectedOrder, setSelectedOrder] = useState(null)

  const formatMoney = (number) => {
    return number.toLocaleString('vi-VN') + 'đ'
  }

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(search.toLowerCase()) ||
    order.table.toLowerCase().includes(search.toLowerCase())
  )

  const openPayment = (order) => {
    setSelectedOrder({
      ...order,
      customerMoney: order.total,
    })
  }

  const payOrder = () => {
    if (!selectedOrder) return

    const customerMoney = Number(
      selectedOrder.customerMoney
    )

    if (customerMoney < selectedOrder.total) {
      alert('Số tiền khách đưa chưa đủ.')
      return
    }

    setOrders(
      orders.map((order) =>
        order.id === selectedOrder.id
          ? {
              ...order,
              status: 'paid',
            }
          : order
      )
    )

    setSelectedOrder(null)
  }

  return (
    <section className="dashboard">

      {/* Header */}

      <div className="welcome">

        <div>
          <h2>Thanh toán</h2>

          <p>
            Quản lý hóa đơn và thanh toán của khách hàng.
          </p>
        </div>

      </div>

      {/* Statistics */}

      <div className="stats-grid">

        <div className="stat-card">
          <span>Tổng hóa đơn</span>

          <strong>
            {orders.length}
          </strong>

          <small>
            Trong ngày
          </small>
        </div>

        <div className="stat-card">
          <span>Chưa thanh toán</span>

          <strong>
            {
              orders.filter(
                (order) => order.status === 'unpaid'
              ).length
            }
          </strong>

          <small>
            Cần xử lý
          </small>
        </div>

        <div className="stat-card">
          <span>Đã thanh toán</span>

          <strong>
            {
              orders.filter(
                (order) => order.status === 'paid'
              ).length
            }
          </strong>

          <small>
            Hoàn tất
          </small>
        </div>

        <div className="stat-card">
          <span>Doanh thu</span>

          <strong>
            {formatMoney(
              orders
                .filter(
                  (order) => order.status === 'paid'
                )
                .reduce(
                  (sum, order) =>
                    sum + order.total,
                  0
                )
            )}
          </strong>

          <small>
            Đã thu
          </small>
        </div>

      </div>

      {/* Search */}

      <div className="panel payment-filter">

        <div className="payment-search">

          <input
            type="text"
            placeholder="🔍 Tìm mã đơn hoặc số bàn..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      {/* Orders */}

      <div className="panel">

        <div className="panel-header">

          <div>
            <h3>Danh sách hóa đơn</h3>

            <p>
              Các hóa đơn trong ngày
            </p>
          </div>

        </div>

        <div className="payment-list">

          {filteredOrders.map((order) => (

            <div
              className="payment-row"
              key={order.id}
            >

              <div className="payment-order">

                <strong>
                  #{order.id}
                </strong>

                <span>
                  🪑 {order.table}
                </span>

              </div>

              <div className="payment-total">

                {formatMoney(order.total)}

              </div>

              <div
                className={`payment-status ${
                  order.status
                }`}
              >

                {order.status === 'paid'
                  ? 'ĐÃ THANH TOÁN'
                  : 'CHƯA THANH TOÁN'}

              </div>

              {order.status === 'unpaid' ? (

                <button
                  className="pay-button"
                  onClick={() =>
                    openPayment(order)
                  }
                >
                  💳 Thanh toán
                </button>

              ) : (

                <button
                  className="print-button"
                  onClick={() =>
                    window.print()
                  }
                >
                  🖨️ In hóa đơn
                </button>

              )}

            </div>

          ))}

        </div>

      </div>

      {/* Payment Modal */}

      {selectedOrder && (

        <div className="modal-overlay">

          <div className="payment-modal">

            <div className="modal-header">

              <div>

                <h3>
                  Thanh toán hóa đơn
                </h3>

                <p>
                  #{selectedOrder.id} · {selectedOrder.table}
                </p>

              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedOrder(null)
                }
              >
                ✕
              </button>

            </div>

            <div className="payment-detail">

              <span>
                Tổng tiền
              </span>

              <strong>
                {formatMoney(
                  selectedOrder.total
                )}
              </strong>

            </div>

            <div className="form-group">

              <label>
                Tiền khách đưa
              </label>

              <input
                type="number"
                value={
                  selectedOrder.customerMoney
                }
                onChange={(e) =>
                  setSelectedOrder({
                    ...selectedOrder,
                    customerMoney:
                      e.target.value,
                  })
                }
              />

            </div>

            <div className="payment-change">

              <span>
                Tiền thừa
              </span>

              <strong>
                {formatMoney(
                  Math.max(
                    0,
                    Number(
                      selectedOrder.customerMoney
                    ) -
                      selectedOrder.total
                  )
                )}
              </strong>

            </div>

            <div className="modal-actions">

              <button
                className="cancel-button"
                onClick={() =>
                  setSelectedOrder(null)
                }
              >
                Hủy
              </button>

              <button
                className="primary-button"
                onClick={payOrder}
              >
                ✅ Xác nhận thanh toán
              </button>

            </div>

          </div>

        </div>

      )}

    </section>
  )
}

export default Payment