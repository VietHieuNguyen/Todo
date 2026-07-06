import { useEffect, useState } from "react";

function FilterGroup({ 
  onKeywordChange, 
  status, 
  onStatusChange,
  sortKey,
  onSortKeyChange
}) 
{
  const [inputValue, setInputValue] = useState("");
  
  useEffect(() => {
    const timer = setTimeout(() => onKeywordChange(inputValue), 300);
    return () => clearTimeout(timer);
  }, [inputValue]);
  return (
    <div className="filter-group-container">
      <div className="search-box">
        <input 
          type="text" 
          placeholder="Tìm kiếm công việc..."
          value={inputValue} onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <div className="filter-status">
        <select 
          value={status || ""} 
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="initial">Chưa bắt đầu</option>
          <option value="doing">Đang thực hiện</option>
          <option value="finish">Đã hoàn thành</option>
        </select>
      </div>

      <div className="sort-box">
        <select 
          value={sortKey || "createdAt"} 
          onChange={(e) => onSortKeyChange(e.target.value)}
        >
          <option value="createdAt">Mới nhất</option>
          <option value="dueDate">Hạn chót gần nhất</option>
          <option value="title">Tên công việc (A-Z)</option>
        </select>
      </div>
    </div>
  )
}

export default FilterGroup
