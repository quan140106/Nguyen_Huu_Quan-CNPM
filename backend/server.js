const express = require('express')
const cors = require('cors')
const Database = require('better-sqlite3')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = 5000

// ========================================
// MIDDLEWARE
// ========================================

app.use(cors())
app.use(express.json())

// ========================================
// DATABASE
// ========================================

const dataDir = path.join(__dirname, 'data')

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

const dbPath = path.join(dataDir, 'teammanager.db')

const db = new Database(dbPath)

console.log('========================================')
console.log('HI MrD BACKEND')
console.log('========================================')
console.log('Database đã kết nối.')
console.log(`Database: ${dbPath}`)


// ========================================
// USERS
// ========================================

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT,
    password TEXT,
    role TEXT NOT NULL DEFAULT 'staff',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)


// ========================================
// MENU
// ========================================

db.exec(`
  CREATE TABLE IF NOT EXISTS menu (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT,
    price REAL NOT NULL DEFAULT 0,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'available',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)


// ========================================
// TABLES
// ========================================

db.exec(`
  CREATE TABLE IF NOT EXISTS tables (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    table_number INTEGER NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'empty',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)


// ========================================
// ORDERS
// ========================================

db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_code TEXT NOT NULL UNIQUE,
    table_id INTEGER,
    staff_id INTEGER,
    total REAL NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (table_id)
      REFERENCES tables(id),

    FOREIGN KEY (staff_id)
      REFERENCES users(id)
  )
`)


// ========================================
// ORDER ITEMS
// ========================================

db.exec(`
  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    menu_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    price REAL NOT NULL DEFAULT 0,

    FOREIGN KEY (order_id)
      REFERENCES orders(id),

    FOREIGN KEY (menu_id)
      REFERENCES menu(id)
  )
`)


// ========================================
// INVENTORY
// ========================================

db.exec(`
  CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT DEFAULT 'Nguyên liệu',
    quantity REAL NOT NULL DEFAULT 0,
    unit TEXT DEFAULT 'kg',
    min_quantity REAL NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)


// ========================================
// KIỂM TRA DATABASE CŨ
// Nếu inventory cũ chưa có category
// thì tự động thêm cột
// ========================================

try {

  const inventoryColumns = db
    .prepare(`PRAGMA table_info(inventory)`)
    .all()

  const hasCategory = inventoryColumns.some(
    column => column.name === 'category'
  )

  if (!hasCategory) {

    console.log('Đang thêm cột category vào inventory...')

    db.exec(`
      ALTER TABLE inventory
      ADD COLUMN category TEXT DEFAULT 'Nguyên liệu'
    `)

    console.log('Đã thêm cột category.')

  }

} catch (error) {

  console.error(
    'Lỗi kiểm tra database inventory:',
    error
  )

}


// ========================================
// PAYMENTS
// ========================================

db.exec(`
  CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    amount REAL NOT NULL DEFAULT 0,
    method TEXT NOT NULL DEFAULT 'cash',
    status TEXT NOT NULL DEFAULT 'paid',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (order_id)
      REFERENCES orders(id)
  )
`)


// ========================================
// TÀI KHOẢN QUẢN LÝ
// ========================================

const managerExists = db
  .prepare(`
    SELECT id
    FROM users
    WHERE email = ?
  `)
  .get('manager@himrd.vn')

if (!managerExists) {

  db.prepare(`
    INSERT INTO users
    (name, email, phone, password, role)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    'Quản lý',
    'manager@himrd.vn',
    '0901 234 567',
    '123456',
    'manager'
  )

}


// ========================================
// TÀI KHOẢN NHÂN VIÊN
// ========================================

const staffExists = db
  .prepare(`
    SELECT id
    FROM users
    WHERE email = ?
  `)
  .get('staff@himrd.vn')

if (!staffExists) {

  db.prepare(`
    INSERT INTO users
    (name, email, phone, password, role)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    'Nhân viên',
    'staff@himrd.vn',
    '0902 345 678',
    '123456',
    'staff'
  )

}


// ========================================
// MENU MẪU
// ========================================

const menuCount = db
  .prepare(`
    SELECT COUNT(*) AS count
    FROM menu
  `)
  .get()

if (menuCount.count === 0) {

  const insertMenu = db.prepare(`
    INSERT INTO menu
    (name, category, price, description, status)
    VALUES (?, ?, ?, ?, ?)
  `)

  insertMenu.run(
    'Cơm gà',
    'Món chính',
    65000,
    'Cơm gà truyền thống',
    'available'
  )

  insertMenu.run(
    'Mì bò',
    'Món chính',
    55000,
    'Mì bò sốt đậm đà',
    'available'
  )

  insertMenu.run(
    'Nước cam',
    'Đồ uống',
    30000,
    'Nước cam tươi',
    'available'
  )

  insertMenu.run(
    'Cà phê',
    'Đồ uống',
    25000,
    'Cà phê Việt Nam',
    'available'
  )

}


// ========================================
// 12 BÀN MẪU
// ========================================

const tableCount = db
  .prepare(`
    SELECT COUNT(*) AS count
    FROM tables
  `)
  .get()

if (tableCount.count === 0) {

  const insertTable = db.prepare(`
    INSERT INTO tables
    (table_number, status)
    VALUES (?, ?)
  `)

  for (let i = 1; i <= 12; i++) {
    insertTable.run(i, 'empty')
  }

}


// ========================================
// API KIỂM TRA SERVER
// ========================================

app.get('/', (req, res) => {

  res.json({
    message: 'HI MrD Backend đang hoạt động!',
    database: 'SQLite',
    status: 'OK'
  })

})


// ========================================
// USERS
// ========================================

app.get('/api/users', (req, res) => {

  try {

    const users = db
      .prepare(`
        SELECT
          id,
          name,
          email,
          phone,
          role,
          created_at
        FROM users
        ORDER BY id DESC
      `)
      .all()

    res.json(users)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      message: 'Không thể lấy danh sách tài khoản'
    })

  }

})


// ========================================
// MENU - LẤY
// ========================================

app.get('/api/menu', (req, res) => {

  try {

    const menu = db
      .prepare(`
        SELECT *
        FROM menu
        ORDER BY id DESC
      `)
      .all()

    res.json(menu)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      message: 'Không thể lấy thực đơn'
    })

  }

})


// ========================================
// MENU - THÊM
// ========================================

app.post('/api/menu', (req, res) => {

  try {

    const {
      name,
      category,
      price,
      description,
      status
    } = req.body

    if (!name || !name.trim()) {

      return res.status(400).json({
        message: 'Tên món không được để trống'
      })

    }

    const result = db.prepare(`
      INSERT INTO menu
      (name, category, price, description, status)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      name.trim(),
      category || '',
      Number(price) || 0,
      description || '',
      status || 'available'
    )

    const menu = db
      .prepare(`
        SELECT *
        FROM menu
        WHERE id = ?
      `)
      .get(result.lastInsertRowid)

    res.status(201).json(menu)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      message: 'Không thể thêm món'
    })

  }

})


// ========================================
// MENU - SỬA
// ========================================

app.put('/api/menu/:id', (req, res) => {

  try {

    const { id } = req.params

    const {
      name,
      category,
      price,
      description,
      status
    } = req.body

    if (!name || !name.trim()) {

      return res.status(400).json({
        message: 'Tên món không được để trống'
      })

    }

    const result = db.prepare(`
      UPDATE menu
      SET
        name = ?,
        category = ?,
        price = ?,
        description = ?,
        status = ?
      WHERE id = ?
    `).run(
      name.trim(),
      category || '',
      Number(price) || 0,
      description || '',
      status || 'available',
      id
    )

    if (result.changes === 0) {

      return res.status(404).json({
        message: 'Không tìm thấy món'
      })

    }

    const menu = db
      .prepare(`
        SELECT *
        FROM menu
        WHERE id = ?
      `)
      .get(id)

    res.json(menu)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      message: 'Không thể sửa món'
    })

  }

})


// ========================================
// MENU - XÓA
// ========================================

app.delete('/api/menu/:id', (req, res) => {

  try {

    const { id } = req.params

    const result = db
      .prepare(`
        DELETE FROM menu
        WHERE id = ?
      `)
      .run(id)

    if (result.changes === 0) {

      return res.status(404).json({
        message: 'Không tìm thấy món'
      })

    }

    res.json({
      message: 'Đã xóa món'
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      message: 'Không thể xóa món'
    })

  }

})


// ========================================
// TABLES - LẤY
// ========================================

app.get('/api/tables', (req, res) => {

  try {

    const tables = db
      .prepare(`
        SELECT *
        FROM tables
        ORDER BY table_number ASC
      `)
      .all()

    res.json(tables)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      message: 'Không thể lấy danh sách bàn'
    })

  }

})


// ========================================
// TABLES - THÊM
// ========================================

app.post('/api/tables', (req, res) => {

  try {

    const { table_number } = req.body

    if (
      table_number === undefined ||
      table_number === null ||
      Number(table_number) <= 0
    ) {

      return res.status(400).json({
        message: 'Số bàn không hợp lệ'
      })

    }

    const result = db.prepare(`
      INSERT INTO tables
      (table_number, status)
      VALUES (?, ?)
    `).run(
      Number(table_number),
      'empty'
    )

    const table = db
      .prepare(`
        SELECT *
        FROM tables
        WHERE id = ?
      `)
      .get(result.lastInsertRowid)

    res.status(201).json(table)

  } catch (error) {

    console.error(error)

    if (
      error.code ===
      'SQLITE_CONSTRAINT_UNIQUE'
    ) {

      return res.status(400).json({
        message: 'Số bàn này đã tồn tại'
      })

    }

    res.status(500).json({
      message: 'Không thể thêm bàn'
    })

  }

})


// ========================================
// TABLES - CẬP NHẬT
// ========================================

app.put('/api/tables/:id', (req, res) => {

  try {

    const { id } = req.params
    const { status } = req.body

    const allowedStatus = [
      'empty',
      'occupied',
      'reserved'
    ]

    if (!allowedStatus.includes(status)) {

      return res.status(400).json({
        message: 'Trạng thái bàn không hợp lệ'
      })

    }

    const result = db.prepare(`
      UPDATE tables
      SET status = ?
      WHERE id = ?
    `).run(
      status,
      id
    )

    if (result.changes === 0) {

      return res.status(404).json({
        message: 'Không tìm thấy bàn'
      })

    }

    const table = db
      .prepare(`
        SELECT *
        FROM tables
        WHERE id = ?
      `)
      .get(id)

    res.json(table)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      message: 'Không thể cập nhật bàn'
    })

  }

})


// ========================================
// TABLES - XÓA
// ========================================

app.delete('/api/tables/:id', (req, res) => {

  try {

    const { id } = req.params

    const result = db.prepare(`
      DELETE FROM tables
      WHERE id = ?
    `).run(id)

    if (result.changes === 0) {

      return res.status(404).json({
        message: 'Không tìm thấy bàn'
      })

    }

    res.json({
      message: 'Đã xóa bàn'
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      message: 'Không thể xóa bàn'
    })

  }

})


// ========================================
// INVENTORY - LẤY
// ========================================

app.get('/api/inventory', (req, res) => {

  try {

    const inventory = db
      .prepare(`
        SELECT
          id,
          name,
          category,
          quantity,
          unit,
          min_quantity,
          created_at
        FROM inventory
        ORDER BY id DESC
      `)
      .all()

    res.json(inventory)

  } catch (error) {

    console.error(
      'Lỗi GET /api/inventory:',
      error
    )

    res.status(500).json({
      message: 'Không thể lấy dữ liệu kho'
    })

  }

})


// ========================================
// INVENTORY - THÊM
// ========================================

app.post('/api/inventory', (req, res) => {

  try {

    console.log(
      'POST /api/inventory:',
      req.body
    )

    const {
      name,
      category,
      quantity,
      unit,
      min_quantity
    } = req.body

    if (!name || !name.trim()) {

      return res.status(400).json({
        message: 'Tên nguyên liệu không được để trống'
      })

    }

    const quantityNumber =
      Number(quantity)

    const minNumber =
      Number(min_quantity)

    if (
      Number.isNaN(quantityNumber) ||
      quantityNumber < 0
    ) {

      return res.status(400).json({
        message: 'Số lượng không hợp lệ'
      })

    }

    const result = db.prepare(`
      INSERT INTO inventory
      (
        name,
        category,
        quantity,
        unit,
        min_quantity
      )
      VALUES (?, ?, ?, ?, ?)
    `).run(
      name.trim(),
      category || 'Nguyên liệu',
      quantityNumber,
      unit || 'kg',
      Number.isNaN(minNumber)
        ? 0
        : minNumber
    )

    const item = db
      .prepare(`
        SELECT
          id,
          name,
          category,
          quantity,
          unit,
          min_quantity,
          created_at
        FROM inventory
        WHERE id = ?
      `)
      .get(result.lastInsertRowid)

    console.log(
      'Đã thêm nguyên liệu:',
      item
    )

    res.status(201).json(item)

  } catch (error) {

    console.error(
      'LỖI POST /api/inventory:',
      error
    )

    res.status(500).json({
      message: 'Không thể thêm nguyên liệu',
      error: error.message
    })

  }

})


// ========================================
// INVENTORY - NHẬP THÊM
// ========================================

app.put('/api/inventory/:id/stock', (req, res) => {

  try {

    const { id } = req.params
    const { amount } = req.body

    const number = Number(amount)

    if (
      Number.isNaN(number) ||
      number <= 0
    ) {

      return res.status(400).json({
        message: 'Số lượng nhập không hợp lệ'
      })

    }

    const result = db.prepare(`
      UPDATE inventory
      SET quantity = quantity + ?
      WHERE id = ?
    `).run(
      number,
      id
    )

    if (result.changes === 0) {

      return res.status(404).json({
        message: 'Không tìm thấy nguyên liệu'
      })

    }

    const item = db
      .prepare(`
        SELECT
          id,
          name,
          category,
          quantity,
          unit,
          min_quantity,
          created_at
        FROM inventory
        WHERE id = ?
      `)
      .get(id)

    res.json(item)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      message: 'Không thể nhập kho'
    })

  }

})


// ========================================
// INVENTORY - XÓA
// ========================================

app.delete('/api/inventory/:id', (req, res) => {

  try {

    const { id } = req.params

    const result = db.prepare(`
      DELETE FROM inventory
      WHERE id = ?
    `).run(id)

    if (result.changes === 0) {

      return res.status(404).json({
        message: 'Không tìm thấy nguyên liệu'
      })

    }

    res.json({
      message: 'Đã xóa nguyên liệu'
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      message: 'Không thể xóa nguyên liệu'
    })

  }

})


// ========================================
// ORDERS - LẤY
// ========================================

app.get('/api/orders', (req, res) => {

  try {

    const orders = db
      .prepare(`
        SELECT
          orders.*,
          tables.table_number,
          users.name AS staff_name

        FROM orders

        LEFT JOIN tables
          ON orders.table_id = tables.id

        LEFT JOIN users
          ON orders.staff_id = users.id

        ORDER BY orders.id DESC
      `)
      .all()

    res.json(orders)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      message: 'Không thể lấy đơn hàng'
    })

  }

})


// ========================================
// PAYMENTS - LẤY
// ========================================

app.get('/api/payments', (req, res) => {

  try {

    const payments = db
      .prepare(`
        SELECT *
        FROM payments
        ORDER BY id DESC
      `)
      .all()

    res.json(payments)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      message: 'Không thể lấy thanh toán'
    })

  }

})


// ========================================
// API KHÔNG TỒN TẠI
// ========================================

app.use((req, res) => {

  res.status(404).json({
    message: `API không tồn tại: ${req.method} ${req.originalUrl}`
  })

})


// ========================================
// XỬ LÝ JSON LỖI
// ========================================

app.use((err, req, res, next) => {

  console.error('SERVER ERROR:', err)

  res.status(500).json({
    message: 'Lỗi server',
    error: err.message
  })

})


// ========================================
// KHỞI ĐỘNG
// ========================================

app.listen(PORT, () => {

  console.log('========================================')
  console.log(
    `Backend đang chạy tại http://localhost:${PORT}`
  )
  console.log('========================================')

})