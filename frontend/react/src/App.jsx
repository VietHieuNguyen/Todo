import { useState, useEffect } from 'react'
import { get, create, patch } from './util/res'
import FilterGroup from './components/FilterGroup'
import TodoList from './components/TodoList'
import Pagination from './components/Pagination'
import TodoForm from './components/TodoForm'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({ currentPage: 1, totalPage: 1 })

  const [keyword, setKeyword] = useState("")
  const [status, setStatus] = useState("")
  const [sortKey, setSortKey] = useState("createdAt")
  const [page, setPage] = useState(1)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState(null)

  const fetchTasks = async () => {
    setLoading(true)
    try {
      let path = `tasks?page=${page}`
      if (keyword) path += `&keyword=${encodeURIComponent(keyword)}`
      if (status) path += `&status=${status}`
      if (sortKey) path += `&sortKey=${sortKey}`

      const res = await get(path)
      if (res && res.code === 200) {
        setTasks(res.data)
        setPagination(res.pagination || { currentPage: page, totalPage: 1 })
      }
    } catch (error) {
      console.error("Lỗi khi tải công việc:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [keyword, status, sortKey, page])

  const handleCreateOrUpdateTask = async (formData) => {
    try {
      if (taskToEdit) {
        const res = await patch(`tasks/update/${taskToEdit._id}`, formData)
        if (res && res.code === 200) {
          setIsModalOpen(false)
          fetchTasks()
        } else {
          alert(res.message || "Cập nhật thất bại")
        }
      } else {
        const res = await create("tasks", formData)
        if (res && res.code === 201) {
          setIsModalOpen(false)
          fetchTasks()
        } else {
          alert(res.message || "Thêm mới thất bại")
        }
      }
    } catch (error) {
      console.error("Lỗi lưu dữ liệu:", error)
    }
  }

  const handleToggleComplete = async (taskId, currentStatus) => {
    try {
      const res = await patch(`tasks/toggle-complete/${taskId}`, { currentStatus })
      if (res && res.code === 200) {
        setTasks(prev => prev.map(t =>
          t._id === taskId ? { ...t, status: res.data.status } : t
        ))
      }
    } catch (error) {
      console.error("Lỗi thay đổi trạng thái hoàn thành:", error)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa công việc này?")) {
      try {
        const res = await patch(`tasks/delete/${taskId}`)
        if (res && res.code === 200) {
          setTasks(prev => prev.filter(t => t._id !== taskId))
        }
      } catch (error) {
        console.error("Lỗi khi xóa công việc:", error)
      }
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Danh Sách Công Việc</h1>
        <button 
          className="btn btn-primary add-task-btn"
          onClick={() => {
            setTaskToEdit(null) 
            setIsModalOpen(true)
          }}
        >
          + Thêm công việc
        </button>
      </header>


      <FilterGroup 
        onKeywordChange={(val) => { setKeyword(val); setPage(1); }} 
        status={status}
        onStatusChange={(val) => { setStatus(val); setPage(1); }}
        sortKey={sortKey}
        onSortKeyChange={setSortKey}
      />

      <TodoList 
        tasks={tasks}
        loading={loading}
        onToggleComplete={handleToggleComplete}
        onEdit={(task) => {
          setTaskToEdit(task) 
          setIsModalOpen(true) 
        }}
        onDelete={handleDeleteTask}
      />

      
      <Pagination 
        pagination={pagination}
        onPageChange={setPage}
      />

      <TodoForm 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateOrUpdateTask}
        taskToEdit={taskToEdit}
      />
    </div>
  )
}

export default App
