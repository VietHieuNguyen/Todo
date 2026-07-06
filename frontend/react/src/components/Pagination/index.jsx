

function Pagination({ pagination, onPageChange }) {
  const { currentPage, totalPage } = pagination || {}

  if (!totalPage || totalPage <= 1) return null

  const pages = []
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i)
  }

  return (
    <div className="pagination">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="page-btn prev-btn"
      >
        Trước
      </button>

      <div className="page-numbers">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`page-btn num-btn ${currentPage === page ? "active" : ""}`}
          >
            {page}
          </button>
        ))}
      </div>

      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
        className="page-btn next-btn"
      >
        Sau 
      </button>
    </div>
  )
}

export default Pagination
