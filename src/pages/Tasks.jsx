import { useEffect, useState } from 'react'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'todo',
    assigned_to: '',
    deadline: '',
  })

  // Lấy danh sách công việc
  const loadTasks = () => {
    fetch('http://localhost:3000/api/tasks')
      .then((response) => response.json())
      .then((data) => {
        setTasks(data)
      })
      .catch((error) => {
        console.error('Lỗi tải công việc:', error)
      })
  }

  useEffect(() => {
    loadTasks()
  }, [])

  // Xử lý form
  const handleChange = (event) => {
    const { name, value } = event.target

    setForm({
      ...form,
      [name]: value,
    })
  }

  // Thêm công việc
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.title.trim()) {
      alert('Vui lòng nhập tên công việc')
      return
    }

    try {
      const response = await fetch(
        'http://localhost:3000/api/tasks',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        }
      )

      if (!response.ok) {
        throw new Error('Không thể thêm công việc')
      }

      setForm({
        title: '',
        description: '',
        status: 'todo',
        assigned_to: '',
        deadline: '',
      })

      setShowForm(false)
      loadTasks()

    } catch (error) {
      console.error(error)
      alert('Có lỗi xảy ra')
    }
  }
// Cập nhật trạng thái
const handleStatusChange = async (task, newStatus) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/tasks/${task.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          status: newStatus,
          assigned_to: task.assigned_to,
          deadline: task.deadline,
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Không thể cập nhật trạng thái')
    }

    loadTasks()
  } catch (error) {
    console.error(error)
    alert('Không thể cập nhật trạng thái')
  }
}
  // Xóa công việc
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Bạn có chắc muốn xóa công việc này?'
    )

    if (!confirmDelete) return

    try {
      await fetch(
        `http://localhost:3000/api/tasks/${id}`,
        {
          method: 'DELETE',
        }
      )

      loadTasks()

    } catch (error) {
      console.error(error)
    }
  }

  // Chia công việc theo trạng thái
  const todoTasks = tasks.filter(
    (task) => task.status === 'todo'
  )

  const doingTasks = tasks.filter(
    (task) => task.status === 'doing'
  )

  const doneTasks = tasks.filter(
    (task) => task.status === 'done'
  )

  // Hiển thị một task
  const TaskCard = ({ task }) => {
    return (
      <div className="task-card">

        <h3>{task.title}</h3>

        {task.description && (
          <p className="task-description">
            {task.description}
          </p>
        )}

        <div className="task-info">
          <span>
            👤 {task.assigned_to || 'Chưa giao'}
          </span>

          <span>
            📅 {task.deadline || 'Chưa có hạn'}
          </span>
        </div>

        <div className="task-actions">

  {task.status !== 'todo' && (
    <button
      onClick={() =>
        handleStatusChange(task, 'todo')
      }
    >
      ← Cần làm
    </button>
  )}

  {task.status !== 'doing' && (
    <button
      onClick={() =>
        handleStatusChange(task, 'doing')
      }
    >
      🔄 Đang làm
    </button>
  )}

  {task.status !== 'done' && (
    <button
      onClick={() =>
        handleStatusChange(task, 'done')
      }
    >
      ✓ Hoàn thành
    </button>
  )}

  <button
    className="delete-button"
    onClick={() => handleDelete(task.id)}
  >
    🗑️ Xóa
  </button>

</div>

      </div>
    )
  }

  // Một cột Kanban
  const Column = ({ title, tasks, className }) => {
    return (
      <div className={`kanban-column ${className}`}>

        <div className="column-header">
          <h3>{title}</h3>
          <span>{tasks.length}</span>
        </div>

        <div className="column-content">

          {tasks.length === 0 ? (
            <p className="empty-column">
              Chưa có công việc
            </p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
              />
            ))
          )}

        </div>

      </div>
    )
  }

  return (
    <div>

      {/* Header */}
      <div className="tasks-page-header">

        <div>
          <h2>Công việc</h2>
          <p>Quản lý công việc của nhóm</p>
        </div>

        <button
          className="add-task-button"
          onClick={() => setShowForm(!showForm)}
        >
          + Thêm công việc
        </button>

      </div>

      {/* Form */}
      {showForm && (
        <form
          className="task-form"
          onSubmit={handleSubmit}
        >

          <h3>Thêm công việc mới</h3>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Tên công việc"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Mô tả công việc"
          />

          <input
            type="text"
            name="assigned_to"
            value={form.assigned_to}
            onChange={handleChange}
            placeholder="Người thực hiện"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="todo">
              Cần làm
            </option>

            <option value="doing">
              Đang làm
            </option>

            <option value="done">
              Hoàn thành
            </option>
          </select>

          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
          />

          <button type="submit">
            Lưu công việc
          </button>

        </form>
      )}

      {/* Kanban */}
      <div className="kanban">

        <Column
          title="Cần làm"
          tasks={todoTasks}
          className="todo-column"
        />

        <Column
          title="Đang làm"
          tasks={doingTasks}
          className="doing-column"
        />

        <Column
          title="Hoàn thành"
          tasks={doneTasks}
          className="done-column"
        />

      </div>

    </div>
  )
}

export default Tasks