import TodoItem from "../TodoItem" 

function TodoList({ tasks, loading, onToggleComplete, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="todo-list-loading">
        <div className="spinner"></div>
        <p>Đang tải danh sách công việc...</p>
      </div>
    )
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="todo-list-empty">
        <p>Không có công việc nào cần hiển thị.</p>
      </div>
    )
  }

  return (
    <div className="todo-list-container">
      {tasks.map((task) => (
        <TodoItem 
          key={task._id} 
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default TodoList
