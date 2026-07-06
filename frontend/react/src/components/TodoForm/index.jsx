import { useState, useEffect } from "react"

function TodoForm({ isOpen, onClose, onSubmit, taskToEdit }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [status, setStatus] = useState("initial")
  const [error, setError] = useState("")

  const formatISOToInput = (isoString) => {
    if (!isoString) return ""
    const date = new Date(isoString)
    const yyyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, "0")
    const dd = String(date.getDate()).padStart(2, "0")
    const hh = String(date.getHours()).padStart(2, "0")
    const min = String(date.getMinutes()).padStart(2, "0")
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`
  }

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || "")
      setDescription(taskToEdit.description || "")
      setStatus(taskToEdit.status || "initial")
      setDueDate(formatISOToInput(taskToEdit.dueDate))
    } else {
      setTitle("")
      setDescription("")
      setStatus("initial")
      setDueDate("")
    }
    setError("")
  }, [taskToEdit, isOpen])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setError("Tiêu đề công việc không được để trống!")
      return
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      status
    })
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{taskToEdit ? "Cập Nhật Công Việc" : "Thêm Công Việc Mới"}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="form-error">{error}</div>}

          <div className="form-group">
            <label>Tiêu đề *</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ví dụ: Học lập trình React..."
              required
            />
          </div>

          <div className="form-group">
            <label>Mô tả chi tiết</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Chi tiết công việc cần làm..."
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Hạn chót</label>
            <input 
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {taskToEdit && (
            <div className="form-group">
              <label>Trạng thái</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="initial">Chưa bắt đầu</option>
                <option value="doing">Đang thực hiện</option>
                <option value="finish">Đã hoàn thành</option>
              </select>
            </div>
          )}

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">Hủy</button>
            <button type="submit" className="btn-submit">
              {taskToEdit ? "Lưu thay đổi" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TodoForm
