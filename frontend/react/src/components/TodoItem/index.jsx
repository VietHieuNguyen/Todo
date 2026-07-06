
function TodoItem({ task, onToggleComplete, onEdit, onDelete }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return "Không có thời hạn"
    const date = new Date(dateStr)
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const getStatusText = (status) => {
    switch (status) {
      case "finish": return "Hoàn thành"
      case "doing": return "Đang làm"
      default: return "Chưa bắt đầu"
    }
  }

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "finish"

  return (
    <div className={`todo-item ${task.status === "finish" ? "completed" : ""}`}>
      <div className="todo-checkbox">
        <input 
          type="checkbox" 
          checked={task.status === "finish"}
          onChange={() => onToggleComplete(task._id, task.status)}
        />
      </div>

      <div className="todo-content">
        <div className="todo-header">
          <span className="todo-title">{task.title}</span>
          <span className={`status-badge ${task.status}`}>
            {getStatusText(task.status)}
          </span>
        </div>
        
        {task.description && <p className="todo-desc">{task.description}</p>}
        
        <div className="todo-due">
          <span className={isOverdue ? "overdue" : ""}>
            Hạn: {formatDate(task.dueDate)} {isOverdue && "(Quá hạn!)"}
          </span>
        </div>
      </div>

      <div className="todo-actions">
        <button onClick={(e) => { e.preventDefault(); onEdit(task); }} className="btn-edit">Sửa</button>
        <button onClick={(e) => { e.preventDefault(); onDelete(task._id); }} className="btn-delete">Xóa</button>
      </div>
    </div>
  )
}

export default TodoItem
