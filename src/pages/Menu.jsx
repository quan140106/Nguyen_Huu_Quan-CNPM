import { useEffect, useState } from 'react'

function Menu() {

  // ================================
  // DỮ LIỆU
  // ================================

  const [foods, setFoods] = useState([])

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Tất cả')

  const [editingFood, setEditingFood] = useState(null)

  const [loading, setLoading] = useState(true)


  // ================================
  // LẤY MENU TỪ DATABASE
  // ================================

  const loadFoods = async () => {

    try {

      setLoading(true)

      const response = await fetch(
        'http://localhost:5000/api/menu'
      )

      if (!response.ok) {
        throw new Error('Không thể lấy menu')
      }

      const data = await response.json()

      setFoods(data)

    } catch (error) {

      console.error(error)

      alert(
        'Không thể kết nối Backend. Hãy kiểm tra server localhost:5000'
      )

    } finally {

      setLoading(false)

    }
  }


  // Chạy khi mở trang
  useEffect(() => {

    loadFoods()

  }, [])


  // ================================
  // LỌC MENU
  // ================================

  const filteredFoods = foods.filter((food) => {

    const matchSearch =
      food.name
        .toLowerCase()
        .includes(search.toLowerCase())

    const matchCategory =
      category === 'Tất cả' ||
      food.category === category

    return matchSearch && matchCategory

  })


  // ================================
  // THÊM MÓN
  // ================================

  const addFood = async () => {

    const name = window.prompt(
      'Nhập tên món:'
    )

    if (!name) return


    const priceInput = window.prompt(
      'Nhập giá món:'
    )

    if (!priceInput) return


    const price = Number(priceInput)

    if (price <= 0) {

      alert('Giá món không hợp lệ.')

      return

    }


    try {

      const response = await fetch(
        'http://localhost:5000/api/menu',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({

            name: name,

            category: 'Món chính',

            price: price,

            description: '',

            status: 'available'

          })
        }
      )


      if (!response.ok) {

        throw new Error(
          'Không thể thêm món'
        )

      }


      const newFood =
        await response.json()


      setFoods((prev) => [
        newFood,
        ...prev
      ])


      alert('Đã thêm món thành công!')


    } catch (error) {

      console.error(error)

      alert('Không thể thêm món.')

    }

  }


  // ================================
  // XÓA MÓN
  // ================================

  const deleteFood = async (id) => {

    const confirmDelete =
      window.confirm(
        'Bạn có chắc muốn xóa món này không?'
      )

    if (!confirmDelete) return


    try {

      const response = await fetch(
        `http://localhost:5000/api/menu/${id}`,
        {
          method: 'DELETE'
        }
      )


      if (!response.ok) {

        throw new Error(
          'Không thể xóa món'
        )

      }


      setFoods((prev) =>
        prev.filter(
          (food) => food.id !== id
        )
      )


    } catch (error) {

      console.error(error)

      alert('Không thể xóa món.')

    }

  }


  // ================================
  // ĐỔI TRẠNG THÁI
  // ================================

  const toggleFood = async (food) => {

    const newStatus =
      food.status === 'available'
        ? 'unavailable'
        : 'available'


    try {

      const response = await fetch(
        `http://localhost:5000/api/menu/${food.id}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({

            name: food.name,

            category: food.category,

            price: food.price,

            description:
              food.description || '',

            status: newStatus

          })
        }
      )


      if (!response.ok) {

        throw new Error(
          'Không thể cập nhật trạng thái'
        )

      }


      const updatedFood =
        await response.json()


      setFoods((prev) =>
        prev.map((item) =>
          item.id === food.id
            ? updatedFood
            : item
        )
      )


    } catch (error) {

      console.error(error)

      alert(
        'Không thể cập nhật trạng thái.'
      )

    }

  }


  // ================================
  // MỞ FORM SỬA
  // ================================

  const openEdit = (food) => {

    setEditingFood({
      ...food
    })

  }


  // ================================
  // LƯU SỬA
  // ================================

  const saveEdit = async () => {

    if (!editingFood.name.trim()) {

      alert(
        'Vui lòng nhập tên món.'
      )

      return

    }


    if (
      !editingFood.price ||
      Number(editingFood.price) <= 0
    ) {

      alert(
        'Vui lòng nhập giá hợp lệ.'
      )

      return

    }


    try {

      const response = await fetch(
        `http://localhost:5000/api/menu/${editingFood.id}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type':
              'application/json'
          },

          body: JSON.stringify({

            name: editingFood.name,

            category:
              editingFood.category,

            price:
              Number(editingFood.price),

            description:
              editingFood.description || '',

            status:
              editingFood.status ||
              'available'

          })
        }
      )


      if (!response.ok) {

        throw new Error(
          'Không thể cập nhật món'
        )

      }


      const updatedFood =
        await response.json()


      setFoods((prev) =>
        prev.map((food) =>
          food.id === updatedFood.id
            ? updatedFood
            : food
        )
      )


      setEditingFood(null)


    } catch (error) {

      console.error(error)

      alert(
        'Không thể cập nhật món.'
      )

    }

  }


  // ================================
  // GIAO DIỆN
  // ================================

  return (

    <section className="dashboard">

      {/* Header */}

      <div className="welcome">

        <div>

          <h2>
            Thực đơn
          </h2>

          <p>
            Quản lý món ăn, giá bán và trạng thái phục vụ.
          </p>

        </div>


        <button
          className="primary-button"
          onClick={addFood}
        >
          + Thêm món
        </button>

      </div>


      {/* Search */}

      <div className="panel menu-filter">

        <div className="menu-filter-row">

          <input
            type="text"
            placeholder="🔍 Tìm kiếm món ăn..."
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
              Món chính
            </option>

            <option>
              Món phụ
            </option>

            <option>
              Đồ uống
            </option>

          </select>

        </div>

      </div>


      {/* Danh sách */}

      <div className="panel">

        <div className="panel-header">

          <div>

            <h3>
              Danh sách món ăn
            </h3>

            <p>
              {filteredFoods.length} món
            </p>

          </div>


          <button
            onClick={loadFoods}
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


        {/* Menu */}

        {!loading && (

          <div className="menu-list">

            {filteredFoods.map((food) => (

              <div
                className="menu-item-card"
                key={food.id}
              >

                <div className="food-icon">
                  🍽️
                </div>


                <div className="food-info">

                  <strong>
                    {food.name}
                  </strong>

                  <span>
                    {food.category}
                  </span>

                </div>


                <div className="food-price">

                  {Number(food.price)
                    .toLocaleString('vi-VN')}đ

                </div>


                {/* Trạng thái */}

                <button
                  className={`food-status ${
                    food.status === 'available'
                      ? 'available'
                      : 'unavailable'
                  }`}
                  onClick={() =>
                    toggleFood(food)
                  }
                >

                  {food.status === 'available'
                    ? 'Đang bán'
                    : 'Hết món'}

                </button>


                {/* Sửa */}

                <button
                  className="edit-button"
                  onClick={() =>
                    openEdit(food)
                  }
                >
                  ✏️
                </button>


                {/* Xóa */}

                <button
                  className="delete-button"
                  onClick={() =>
                    deleteFood(food.id)
                  }
                >
                  🗑️
                </button>

              </div>

            ))}


            {filteredFoods.length === 0 && (

              <div className="empty-menu">

                Không tìm thấy món ăn.

              </div>

            )}

          </div>

        )}

      </div>


      {/* ================================
          MODAL SỬA
      ================================= */}

      {editingFood && (

        <div className="modal-overlay">

          <div className="edit-modal">

            <div className="modal-header">

              <div>

                <h3>
                  Sửa món ăn
                </h3>

                <p>
                  Cập nhật thông tin món ăn
                </p>

              </div>


              <button
                className="modal-close"
                onClick={() =>
                  setEditingFood(null)
                }
              >
                ✕
              </button>

            </div>


            {/* Tên */}

            <div className="form-group">

              <label>
                Tên món
              </label>

              <input
                type="text"
                value={editingFood.name}
                onChange={(e) =>
                  setEditingFood({
                    ...editingFood,
                    name: e.target.value
                  })
                }
              />

            </div>


            {/* Danh mục */}

            <div className="form-group">

              <label>
                Danh mục
              </label>

              <select
                value={
                  editingFood.category
                }
                onChange={(e) =>
                  setEditingFood({
                    ...editingFood,
                    category:
                      e.target.value
                  })
                }
              >

                <option>
                  Món chính
                </option>

                <option>
                  Món phụ
                </option>

                <option>
                  Đồ uống
                </option>

              </select>

            </div>


            {/* Giá */}

            <div className="form-group">

              <label>
                Giá bán
              </label>

              <input
                type="number"
                value={
                  editingFood.price
                }
                onChange={(e) =>
                  setEditingFood({
                    ...editingFood,
                    price:
                      e.target.value
                  })
                }
              />

            </div>


            {/* Trạng thái */}

            <div className="form-group">

              <label>
                Trạng thái
              </label>

              <select
                value={
                  editingFood.status
                }
                onChange={(e) =>
                  setEditingFood({
                    ...editingFood,
                    status:
                      e.target.value
                  })
                }
              >

                <option value="available">
                  Đang bán
                </option>

                <option value="unavailable">
                  Hết món
                </option>

              </select>

            </div>


            {/* Buttons */}

            <div className="modal-actions">

              <button
                className="cancel-button"
                onClick={() =>
                  setEditingFood(null)
                }
              >
                Hủy
              </button>


              <button
                className="primary-button"
                onClick={saveEdit}
              >
                💾 Lưu thay đổi
              </button>

            </div>

          </div>

        </div>

      )}

    </section>

  )

}

export default Menu