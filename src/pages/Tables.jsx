import { useEffect, useState } from 'react'

function Tables() {

  const [tables, setTables] = useState([])
  const [loading, setLoading] = useState(true)

  // ========================================
  // LẤY BÀN TỪ DATABASE
  // ========================================

  const loadTables = async () => {

    try {

      setLoading(true)

      const response = await fetch(
        'http://localhost:5000/api/tables'
      )

      if (!response.ok) {
        throw new Error('Không thể lấy danh sách bàn')
      }

      const data = await response.json()

      setTables(data)

    } catch (error) {

      console.error(error)

      alert(
        'Không thể kết nối Backend localhost:5000'
      )

    } finally {

      setLoading(false)

    }

  }


  // Chạy khi mở trang
  useEffect(() => {

    loadTables()

  }, [])


  // ========================================
  // THÊM BÀN
  // ========================================

  const addTable = async () => {

    const number = window.prompt(
      'Nhập số bàn:'
    )

    if (!number) return

    const tableNumber = Number(number)

    if (!Number.isInteger(tableNumber) || tableNumber <= 0) {

      alert('Số bàn không hợp lệ.')

      return

    }

    try {

      const response = await fetch(
        'http://localhost:5000/api/tables',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            table_number: tableNumber
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Không thể thêm bàn'
        )
      }

      setTables((prev) => [
        ...prev,
        data
      ].sort(
        (a, b) =>
          a.table_number - b.table_number
      ))

      alert('Đã thêm bàn thành công!')

    } catch (error) {

      console.error(error)

      alert(error.message)

    }

  }


  // ========================================
  // ĐỔI TRẠNG THÁI
  // ========================================

  const changeStatus = async (
    table,
    newStatus
  ) => {

    try {

      const response = await fetch(
        `http://localhost:5000/api/tables/${table.id}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            status: newStatus
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {

        throw new Error(
          data.message ||
          'Không thể cập nhật bàn'
        )

      }

      setTables((prev) =>
        prev.map((item) =>
          item.id === table.id
            ? data
            : item
        )
      )

    } catch (error) {

      console.error(error)

      alert(error.message)

    }

  }


  // ========================================
  // XÓA BÀN
  // ========================================

  const deleteTable = async (table) => {

    const confirmDelete =
      window.confirm(
        `Bạn có chắc muốn xóa ${table.table_number}?`
      )

    if (!confirmDelete) return

    try {

      const response = await fetch(
        `http://localhost:5000/api/tables/${table.id}`,
        {
          method: 'DELETE'
        }
      )

      const data = await response.json()

      if (!response.ok) {

        throw new Error(
          data.message ||
          'Không thể xóa bàn'
        )

      }

      setTables((prev) =>
        prev.filter(
          (item) =>
            item.id !== table.id
        )
      )

    } catch (error) {

      console.error(error)

      alert(error.message)

    }

  }


  // ========================================
  // HIỂN THỊ TRẠNG THÁI
  // ========================================

  const getStatusText = (status) => {

    switch (status) {

      case 'empty':
        return 'Trống'

      case 'occupied':
        return 'Đang phục vụ'

      case 'reserved':
        return 'Đã đặt'

      default:
        return 'Không xác định'

    }

  }


  // ========================================
  // CLASS TRẠNG THÁI
  // ========================================

  const getStatusClass = (status) => {

    switch (status) {

      case 'empty':
        return 'empty'

      case 'occupied':
        return 'serving'

      case 'reserved':
        return 'payment'

      default:
        return 'empty'

    }

  }


  // ========================================
  // THỐNG KÊ
  // ========================================

  const totalTables =
    tables.length

  const emptyTables =
    tables.filter(
      (table) =>
        table.status === 'empty'
    ).length

  const occupiedTables =
    tables.filter(
      (table) =>
        table.status === 'occupied'
    ).length

  const reservedTables =
    tables.filter(
      (table) =>
        table.status === 'reserved'
    ).length


  // ========================================
  // GIAO DIỆN
  // ========================================

  return (

    <section className="dashboard">

      {/* Header */}

      <div className="welcome">

        <div>

          <h2>
            Quản lý bàn
          </h2>

          <p>
            Theo dõi trạng thái và hoạt động
            của các bàn trong nhà hàng.
          </p>

        </div>

        <button
          className="primary-button"
          onClick={addTable}
        >
          + Thêm bàn
        </button>

      </div>


      {/* ================================
          THỐNG KÊ
      ================================= */}

      <div className="stats-grid">

        <div className="stat-card">

          <span>
            Tổng số bàn
          </span>

          <strong>
            {totalTables}
          </strong>

          <small>
            Tất cả bàn
          </small>

        </div>


        <div className="stat-card">

          <span>
            Bàn trống
          </span>

          <strong>
            {emptyTables}
          </strong>

          <small>
            Sẵn sàng phục vụ
          </small>

        </div>


        <div className="stat-card">

          <span>
            Đang phục vụ
          </span>

          <strong>
            {occupiedTables}
          </strong>

          <small>
            Đang có khách
          </small>

        </div>


        <div className="stat-card">

          <span>
            Đã đặt
          </span>

          <strong>
            {reservedTables}
          </strong>

          <small>
            Bàn đã đặt
          </small>

        </div>

      </div>


      {/* ================================
          DANH SÁCH BÀN
      ================================= */}

      <div className="panel">

        <div className="panel-header">

          <div>

            <h3>
              Sơ đồ bàn
            </h3>

            <p>
              Chọn trạng thái để cập nhật bàn
            </p>

          </div>

          <button
            onClick={loadTables}
          >
            🔄 Làm mới
          </button>

        </div>


        {/* Loading */}

        {loading && (

          <div className="empty-menu">
            Đang tải dữ liệu...
          </div>

        )}


        {/* Table Grid */}

        {!loading && (

          <div className="table-grid">

            {tables.map((table) => (

              <div
                key={table.id}
                className={`table-card ${
                  getStatusClass(
                    table.status
                  )
                }`}
              >

                {/* Top */}

                <div className="table-top">

                  <strong>
                    Bàn {String(
                      table.table_number
                    ).padStart(2, '0')}
                  </strong>

                  <span>
                    🪑
                  </span>

                </div>


                {/* Icon */}

                <div className="table-icon">
                  🪑
                </div>


                {/* Status */}

                <div className="table-status">

                  {getStatusText(
                    table.status
                  )}

                </div>


                {/* Buttons */}

                <div
                  className="table-actions"
                >

                  <button
                    onClick={() =>
                      changeStatus(
                        table,
                        'empty'
                      )
                    }
                  >
                    Trống
                  </button>

                  <button
                    onClick={() =>
                      changeStatus(
                        table,
                        'occupied'
                      )
                    }
                  >
                    Phục vụ
                  </button>

                  <button
                    onClick={() =>
                      changeStatus(
                        table,
                        'reserved'
                      )
                    }
                  >
                    Đặt
                  </button>

                  <button
                    className="delete-button"
                    onClick={() =>
                      deleteTable(table)
                    }
                  >
                    🗑️
                  </button>

                </div>

              </div>

            ))}


            {tables.length === 0 && (

              <div className="empty-menu">

                Chưa có bàn nào.

              </div>

            )}

          </div>

        )}

      </div>

    </section>

  )

}

export default Tables