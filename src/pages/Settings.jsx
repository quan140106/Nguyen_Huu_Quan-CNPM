import { useState } from 'react'

function Settings() {

  const [restaurantName, setRestaurantName] =
    useState('HI MrD Restaurant')

  const [phone, setPhone] =
    useState('0901 234 567')

  const [address, setAddress] =
    useState('Đà Nẵng, Việt Nam')

  const [currency, setCurrency] =
    useState('VND')

  const [notifications, setNotifications] =
    useState(true)

  const [saved, setSaved] =
    useState(false)

  const [showAccountEdit, setShowAccountEdit] =
    useState(false)

  const [showPassword, setShowPassword] =
    useState(false)

  const [logoutMessage, setLogoutMessage] =
    useState(false)

  const [accountName, setAccountName] =
    useState('Quản lý')

  const [email, setEmail] =
    useState('manager@himrd.vn')

  const [accountPhone, setAccountPhone] =
    useState('0901 234 567')

  const [password, setPassword] =
    useState('')

  const [newPassword, setNewPassword] =
    useState('')

  const saveSettings = () => {

    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2000)
  }

  const saveAccount = () => {

    setShowAccountEdit(false)

    alert('Đã cập nhật thông tin tài khoản.')
  }

  const changePassword = () => {

    if (!password || !newPassword) {
      alert('Vui lòng nhập đầy đủ thông tin.')
      return
    }

    alert('Đổi mật khẩu thành công.')

    setPassword('')
    setNewPassword('')
    setShowPassword(false)
  }

  const logout = () => {

    const confirmLogout =
      window.confirm(
        'Bạn có chắc muốn đăng xuất không?'
      )

    if (confirmLogout) {

      setLogoutMessage(true)

      setTimeout(() => {
        setLogoutMessage(false)
      }, 2000)
    }
  }

  return (
    <section className="dashboard">

      {/* HEADER */}

      <div className="welcome">

        <div>

          <h2>Cài đặt</h2>

          <p>
            Quản lý thông tin và thiết lập hệ thống.
          </p>

        </div>

      </div>


      <div className="settings-grid">


        {/* THÔNG TIN NHÀ HÀNG */}

        <div className="panel settings-card">

          <div className="settings-title">

            <div className="settings-icon">
              🏪
            </div>

            <div>

              <h3>
                Thông tin nhà hàng
              </h3>

              <p>
                Thông tin hiển thị trên hệ thống.
              </p>

            </div>

          </div>


          <div className="form-group">

            <label>
              Tên nhà hàng
            </label>

            <input
              value={restaurantName}
              onChange={(e) =>
                setRestaurantName(e.target.value)
              }
            />

          </div>


          <div className="form-group">

            <label>
              Số điện thoại
            </label>

            <input
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />

          </div>


          <div className="form-group">

            <label>
              Địa chỉ
            </label>

            <input
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
            />

          </div>

        </div>


        {/* THANH TOÁN */}

        <div className="panel settings-card">

          <div className="settings-title">

            <div className="settings-icon">
              💰
            </div>

            <div>

              <h3>
                Thanh toán
              </h3>

              <p>
                Thiết lập đơn vị tiền tệ.
              </p>

            </div>

          </div>


          <div className="form-group">

            <label>
              Đơn vị tiền tệ
            </label>

            <select
              value={currency}
              onChange={(e) =>
                setCurrency(e.target.value)
              }
            >

              <option value="VND">
                Việt Nam (₫)
              </option>

              <option value="USD">
                USD ($)
              </option>

            </select>

          </div>


          <div className="setting-info">

            <span>
              Đơn vị hiện tại
            </span>

            <strong>
              {currency === 'VND'
                ? 'Việt Nam Đồng (₫)'
                : 'US Dollar ($)'}
            </strong>

          </div>

        </div>


        {/* THÔNG BÁO */}

        <div className="panel settings-card">

          <div className="settings-title">

            <div className="settings-icon">
              🔔
            </div>

            <div>

              <h3>
                Thông báo
              </h3>

              <p>
                Quản lý thông báo của hệ thống.
              </p>

            </div>

          </div>


          <div className="setting-toggle">

            <div>

              <strong>
                Thông báo đơn hàng
              </strong>

              <span>
                Nhận thông báo khi có đơn mới.
              </span>

            </div>


            <button
              className={`toggle ${
                notifications ? 'on' : ''
              }`}
              onClick={() =>
                setNotifications(!notifications)
              }
            >

              <span></span>

            </button>

          </div>

        </div>


        {/* TÀI KHOẢN */}

        <div className="panel settings-card">

          <div className="settings-title">

            <div className="settings-icon">
              👤
            </div>

            <div>

              <h3>
                Tài khoản
              </h3>

              <p>
                Thông tin tài khoản quản lý.
              </p>

            </div>

          </div>


          <div className="account-info">

            <div className="account-avatar">
              M
            </div>

            <div>

              <strong>
                {accountName}
              </strong>

              <span>
                Quản trị viên
              </span>

            </div>

          </div>


          <button
            className="secondary-button"
            onClick={() =>
              setShowAccountEdit(true)
            }
          >
            ✏️ Chỉnh sửa thông tin
          </button>

        </div>


        {/* QUẢN LÝ TÀI KHOẢN */}

        <div className="panel settings-card">

          <div className="settings-title">

            <div className="settings-icon">
              🔐
            </div>

            <div>

              <h3>
                Quản lý tài khoản
              </h3>

              <p>
                Thông tin và quyền tài khoản.
              </p>

            </div>

          </div>


          <div className="account-detail">

            <div className="account-detail-row">

              <span>
                Họ và tên
              </span>

              <strong>
                {accountName}
              </strong>

            </div>


            <div className="account-detail-row">

              <span>
                Email
              </span>

              <strong>
                {email}
              </strong>

            </div>


            <div className="account-detail-row">

              <span>
                Số điện thoại
              </span>

              <strong>
                {accountPhone}
              </strong>

            </div>


            <div className="account-detail-row">

              <span>
                Vai trò
              </span>

              <span className="role-badge">
                Quản trị viên
              </span>

            </div>

          </div>

        </div>


        {/* BẢO MẬT */}

        <div className="panel settings-card">

          <div className="settings-title">

            <div className="settings-icon">
              🔑
            </div>

            <div>

              <h3>
                Bảo mật
              </h3>

              <p>
                Bảo vệ tài khoản quản lý.
              </p>

            </div>

          </div>


          <button
            className="secondary-button"
            onClick={() =>
              setShowPassword(true)
            }
          >
            🔑 Đổi mật khẩu
          </button>

        </div>


        {/* ĐĂNG XUẤT */}

        <div className="panel settings-card logout-card">

          <div className="settings-title">

            <div className="settings-icon">
              🚪
            </div>

            <div>

              <h3>
                Đăng xuất
              </h3>

              <p>
                Đăng xuất khỏi tài khoản quản lý.
              </p>

            </div>

          </div>


          <button
            className="logout-button"
            onClick={logout}
          >
            🚪 Đăng xuất
          </button>


          {logoutMessage && (

            <div className="logout-message">
              ✅ Đã đăng xuất
            </div>

          )}

        </div>

      </div>


      {/* LƯU CÀI ĐẶT */}

      <div className="settings-save">

        {saved && (

          <span className="save-message">
            ✅ Đã lưu thay đổi
          </span>

        )}


        <button
          className="primary-button"
          onClick={saveSettings}
        >
          💾 Lưu thay đổi
        </button>

      </div>


      {/* MODAL CHỈNH SỬA TÀI KHOẢN */}

      {showAccountEdit && (

        <div className="modal-overlay">

          <div className="payment-modal">

            <div className="modal-header">

              <div>

                <h3>
                  Chỉnh sửa tài khoản
                </h3>

                <p>
                  Cập nhật thông tin quản lý.
                </p>

              </div>


              <button
                className="modal-close"
                onClick={() =>
                  setShowAccountEdit(false)
                }
              >
                ✕
              </button>

            </div>


            <div className="form-group">

              <label>
                Họ và tên
              </label>

              <input
                value={accountName}
                onChange={(e) =>
                  setAccountName(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>
                Email
              </label>

              <input
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>
                Số điện thoại
              </label>

              <input
                value={accountPhone}
                onChange={(e) =>
                  setAccountPhone(e.target.value)
                }
              />

            </div>


            <div className="modal-actions">

              <button
                className="cancel-button"
                onClick={() =>
                  setShowAccountEdit(false)
                }
              >
                Hủy
              </button>


              <button
                className="primary-button"
                onClick={saveAccount}
              >
                💾 Lưu thông tin
              </button>

            </div>

          </div>

        </div>

      )}


      {/* MODAL ĐỔI MẬT KHẨU */}

      {showPassword && (

        <div className="modal-overlay">

          <div className="payment-modal">

            <div className="modal-header">

              <div>

                <h3>
                  Đổi mật khẩu
                </h3>

                <p>
                  Cập nhật mật khẩu tài khoản.
                </p>

              </div>


              <button
                className="modal-close"
                onClick={() =>
                  setShowPassword(false)
                }
              >
                ✕
              </button>

            </div>


            <div className="form-group">

              <label>
                Mật khẩu hiện tại
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>
                Mật khẩu mới
              </label>

              <input
                type="password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
              />

            </div>


            <div className="modal-actions">

              <button
                className="cancel-button"
                onClick={() =>
                  setShowPassword(false)
                }
              >
                Hủy
              </button>


              <button
                className="primary-button"
                onClick={changePassword}
              >
                🔑 Đổi mật khẩu
              </button>

            </div>

          </div>

        </div>

      )}

    </section>
  )
}

export default Settings