import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:5000'

function Inventory() {
  const [items, setItems] = useState([])

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Tất cả')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // ========================================
  // LẤY DỮ LIỆU
  // ========================================

  const loadInventory = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(
        `${API_URL}/api/inventory`
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Không thể lấy dữ liệu kho'
        )
      }

      const formattedData = data.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category || 'Nguyên liệu',
        quantity: Number(item.quantity) || 0,
        unit: item.unit || 'kg',
        min: Number(item.min_quantity) || 0,
      }))

      setItems(formattedData)

    } catch (error) {
      console.error('Lỗi load inventory:', error)

      setError(
        error.message || 'Không thể kết nối server'
      )

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadInventory()
  }, [])

  // ========================================
  // LỌC
  // ========================================

  const filteredItems = items.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchCategory =
      category === 'Tất cả' ||
      item.category === category

    return matchSearch && matchCategory
  })

  // ========================================
  // TRẠNG THÁI
  // ========================================

  const getStockStatus = (item) => {
    if (item.quantity <= 0) {
      return 'out'
    }

    if (item.quantity <= item.min) {
      return 'low'
    }

    return 'good'
  }

  const getStatusText = (item) => {
    const status = getStockStatus(item)

    if (status === 'out') {
      return 'Hết hàng'
    }

    if (status === 'low') {
      return 'Sắp hết'
    }

    return 'Đủ hàng'
  }

  // ========================================
  // THÊM NGUYÊN LIỆU
  // ========================================

  const addItem = async () => {
    const name = window.prompt(
      'Nhập tên nguyên liệu:'
    )

    if (!name || !name.trim()) {
      return
    }

    const quantityInput = window.prompt(
      'Nhập số lượng:'
    )

    if (quantityInput === null) {
      return
    }

    const quantity = Number(quantityInput)

    if (Number.isNaN(quantity) || quantity < 0) {
      alert('Số lượng không hợp lệ.')
      return
    }

    const unit = window.prompt(
      'Nhập đơn vị (kg, lít, chai...):',
      'kg'
    )

    if (!unit || !unit.trim()) {
      return
    }

    const minInput = window.prompt(
      'Nhập mức tồn tối thiểu:',
      '5'
    )

    if (minInput === null) {
      return
    }

    const min_quantity = Number(minInput)

    if (
      Number.isNaN(min_quantity) ||
      min_quantity < 0
    ) {
      alert('Mức tồn tối thiểu không hợp lệ.')
      return
    }

    try {
      const response = await fetch(
        `${API_URL}/api/inventory`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            name: name.trim(),
            category: 'Nguyên liệu',
            quantity: quantity,
            unit: unit.trim(),
            min_quantity: min_quantity,
          }),
        }
      )

      // Không gọi response.json() mù quáng
      const text = await response.text()

      let data

      try {
        data = JSON.parse(text)
      } catch {
        console.error(
          'Server trả về:',
          text
        )

        throw new Error(
          'Server không trả về JSON hợp lệ.'
        )
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
          'Không thể thêm nguyên liệu'
        )
      }

      // Thêm món mới vào giao diện
      setItems((prevItems) => [
        {
          id: data.id,
          name: data.name,
          category:
            data.category || 'Nguyên liệu',
          quantity:
            Number(data.quantity) || 0,
          unit:
            data.unit || 'kg',
          min:
            Number(data.min_quantity) || 0,
        },

        ...prevItems,
      ])

      alert('✅ Đã thêm nguyên liệu!')

    } catch (error) {
      console.error(
        'Lỗi thêm nguyên liệu:',
        error
      )

      alert(
        error.message ||
        'Không thể thêm nguyên liệu.'
      )
    }
  }

  // ========================================
  // NHẬP THÊM
  // ========================================

  const addStock = async (id) => {
    const amountInput = window.prompt(
      'Nhập số lượng muốn thêm:'
    )

    if (amountInput === null) {
      return
    }

    const amount = Number(amountInput)

    if (
      Number.isNaN(amount) ||
      amount <= 0
    ) {
      alert('Số lượng không hợp lệ.')
      return
    }

    try {
      const response = await fetch(
        `${API_URL}/api/inventory/${id}/stock`,
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            amount: amount,
          }),
        }
      )

      const text = await response.text()

      let data

      try {
        data = JSON.parse(text)
      } catch {
        console.error(
          'Server trả về:',
          text
        )

        throw new Error(
          'Server không trả về JSON hợp lệ.'
        )
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
          'Không thể nhập kho'
        )
      }

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  Number(data.quantity) || 0,
              }
            : item
        )
      )

      alert('✅ Đã nhập thêm hàng!')

    } catch (error) {
      console.error(error)

      alert(
        error.message ||
        'Không thể nhập kho.'
      )
    }
  }

  // ========================================
  // XÓA
  // ========================================

  const deleteItem = async (id) => {
    const confirmDelete =
      window.confirm(
        'Bạn có chắc muốn xóa nguyên liệu này không?'
      )

    if (!confirmDelete) {
      return
    }

    try {
      const response = await fetch(
        `${API_URL}/api/inventory/${id}`,
        {
          method: 'DELETE',
        }
      )

      const text = await response.text()

      let data

      try {
        data = JSON.parse(text)
      } catch {
        console.error(
          'Server trả về:',
          text
        )

        throw new Error(
          'Server không trả về JSON hợp lệ.'
        )
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
          'Không thể xóa nguyên liệu'
        )
      }

      setItems((prevItems) =>
        prevItems.filter(
          (item) => item.id !== id
        )
      )

      alert('✅ Đã xóa nguyên liệu!')

    } catch (error) {
      console.error(error)

      alert(
        error.message ||
        'Không thể xóa nguyên liệu.'
      )
    }
  }

  // ========================================
  // GIAO DIỆN
  // ========================================

  return (
    <section className="dashboard">

      {/* HEADER */}

      <div className="welcome">

        <div>
          <h2>Quản lý kho</h2>

          <p>
            Theo dõi nguyên liệu và số lượng tồn kho.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={addItem}
        >
          + Thêm nguyên liệu
        </button>

      </div>


      {/* LOADING */}

      {loading && (
        <div className="panel">
          <p>
            ⏳ Đang tải dữ liệu kho...
          </p>
        </div>
      )}


      {/* ERROR */}

      {error && (
        <div className="panel">

          <p>
            ❌ {error}
          </p>

          <button
            className="primary-button"
            onClick={loadInventory}
          >
            🔄 Thử lại
          </button>

        </div>
      )}


      {!loading && !error && (
        <>

          {/* STATS */}

          <div className="stats-grid">

            <div className="stat-card">
              <span>
                Tổng mặt hàng
              </span>

              <strong>
                {items.length}
              </strong>

              <small>
                Trong kho
              </small>
            </div>


            <div className="stat-card">
              <span>
                Đủ hàng
              </span>

              <strong>
                {
                  items.filter(
                    (item) =>
                      getStockStatus(item) === 'good'
                  ).length
                }
              </strong>

              <small>
                Sẵn sàng sử dụng
              </small>
            </div>


            <div className="stat-card">
              <span>
                Sắp hết
              </span>

              <strong>
                {
                  items.filter(
                    (item) =>
                      getStockStatus(item) === 'low'
                  ).length
                }
              </strong>

              <small>
                Cần nhập thêm
              </small>
            </div>


            <div className="stat-card">
              <span>
                Hết hàng
              </span>

              <strong>
                {
                  items.filter(
                    (item) =>
                      getStockStatus(item) === 'out'
                  ).length
                }
              </strong>

              <small>
                Cần xử lý
              </small>
            </div>

          </div>


          {/* SEARCH */}

          <div className="panel inventory-filter">

            <div className="inventory-filter-row">

              <input
                type="text"
                placeholder="🔍 Tìm kiếm nguyên liệu..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >
                <option>
                  Tất cả
                </option>

                <option>
                  Thực phẩm
                </option>

                <option>
                  Nguyên liệu
                </option>

                <option>
                  Đồ uống
                </option>
              </select>

            </div>

          </div>


          {/* LIST */}

          <div className="panel">

            <div className="panel-header">

              <div>

                <h3>
                  Danh sách kho
                </h3>

                <p>
                  {filteredItems.length} mặt hàng
                </p>

              </div>

              <button
                onClick={loadInventory}
              >
                🔄 Làm mới
              </button>

            </div>


            <div className="inventory-list">

              {filteredItems.map((item) => {

                const status =
                  getStockStatus(item)

                return (
                  <div
                    className="inventory-row"
                    key={item.id}
                  >

                    <div className="inventory-icon">
                      📦
                    </div>


                    <div className="inventory-info">

                      <strong>
                        {item.name}
                      </strong>

                      <span>
                        {item.category}
                      </span>

                    </div>


                    <div className="inventory-quantity">

                      <strong>
                        {item.quantity}
                      </strong>

                      <span>
                        {item.unit}
                      </span>

                    </div>


                    <div
                      className={`stock-status ${status}`}
                    >
                      {getStatusText(item)}
                    </div>


                    <button
                      className="stock-add-button"
                      onClick={() =>
                        addStock(item.id)
                      }
                    >
                      + Nhập
                    </button>


                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteItem(item.id)
                      }
                    >
                      🗑️
                    </button>

                  </div>
                )

              })}


              {filteredItems.length === 0 && (
                <div className="empty-inventory">
                  Không tìm thấy nguyên liệu.
                </div>
              )}

            </div>

          </div>

        </>
      )}

    </section>
  )
}

export default Inventory