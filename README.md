# Ứng Dụng Quản Lý Công Việc (Todo List)

Ứng dụng quản lý công việc Full-stack, xây dựng bằng **React + Vite** (Frontend) và **Express + TypeScript + MongoDB** (Backend).

## 🔗 Demo Online

*   **Backend API**: [https://todo-376r.onrender.com/](https://todo-376r.onrender.com/)
*   **Frontend Webapp**: [https://todo-eight-nu-79.vercel.app/](https://todo-eight-nu-79.vercel.app/)

## Cấu Trúc Thư Mục

```
Todo/
├── backend/                  # Backend API
│   ├── config/               # Cấu hình kết nối Database
│   ├── controllers/          # Nhận request, trả response
│   ├── helpers/              # Hàm bổ trợ (pagination)
│   ├── model/                # Mongoose Schema & Interface
│   ├── repositories/         # Truy vấn trực tiếp MongoDB
│   ├── routes/               # Định tuyến API endpoints
│   ├── services/             # Xử lý logic nghiệp vụ & validation
│   ├── tests/                # Unit Test
│   ├── types/                # TypeScript type definitions
│   ├── .env.example          # File cấu hình môi trường mẫu
│   ├── Dockerfile            # Đóng gói Backend bằng Docker
│   ├── index.ts              # Entry point
│   └── tsconfig.json         # Cấu hình TypeScript
│
├── frontend/react/           # Frontend React
│   ├── src/
│   │   ├── components/       # UI Components
│   │   │   ├── FilterGroup/  # Tìm kiếm, lọc, sắp xếp
│   │   │   ├── Pagination/   # Phân trang
│   │   │   ├── TodoForm/     # Form thêm/sửa công việc
│   │   │   ├── TodoItem/     # Hiển thị từng công việc
│   │   │   └── TodoList/     # Danh sách công việc
│   │   ├── util/res.js       # API helper (GET/POST/PATCH)
│   │   ├── App.jsx           # Component chính
│   │   ├── App.css           # Styles
│   │   └── main.jsx          # Entry point
│   ├── Dockerfile            # Đóng gói Frontend bằng Docker (Nginx)
│   └── index.html
│
├── docker-compose.yml        # Chạy toàn bộ hệ thống bằng 1 lệnh
└── README.md
```

## Yêu Cầu Hệ Thống

- **Node.js** >= 18
- **MongoDB** (Local hoặc MongoDB Atlas)
- **Docker Desktop** (nếu muốn chạy bằng Docker)

## Hướng Dẫn Cài Đặt & Chạy

### 1. Clone dự án

```bash
git clone <repository-url>
cd Todo
```

### 2. Cài đặt & chạy Backend

```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt dependencies
npm install
```

Tạo file `.env` trong thư mục `backend/` (có thể copy từ `.env.example`):

```env
MONGO_URL=mongodb://localhost:27017/todo-app
PORT=3000
```

> **Lưu ý:** Thay `MONGO_URL` bằng chuỗi kết nối MongoDB của bạn (local hoặc Atlas).

```bash
# Khởi chạy server
npm run start
```

Server sẽ chạy tại: **http://localhost:3000**

### 3. Cài đặt & chạy Frontend

Mở một terminal mới:

```bash
# Di chuyển vào thư mục frontend
cd frontend/react

# Cài đặt dependencies
npm install

# Khởi chạy ứng dụng
npm run dev
```

Frontend sẽ chạy tại: **http://localhost:5173**

### 4. Chạy bằng Docker

Nếu máy đã cài sẵn Docker Desktop, chỉ cần chạy duy nhất 1 lệnh ở thư mục gốc:

```bash
docker-compose up --build
```

* Ứng dụng sẽ tự động tải MongoDB, build Backend & Frontend.
* Truy cập ứng dụng tại: **http://localhost** (cổng mặc định 80).
* Backend API tại: **http://localhost:3000**

### 5. Chạy Unit Test

Dự án sử dụng **Vitest** để viết unit test cho các logic phụ trợ:

```bash
cd backend
npm run test
```

Kết quả mong đợi:

```
 ✓ tests/pagination.test.ts (5 tests)
   ✓ nên tính toán đúng totalPage và skip đối với trang 1
   ✓ nên tính toán đúng skip đối với trang 2
   ✓ nên giới hạn trang được yêu cầu về trang cuối nếu số trang quá lớn
   ✓ nên giới hạn trang được yêu cầu về trang 1 nếu số trang nhỏ hơn 1
   ✓ nên trả về ít nhất 1 totalPage ngay cả khi tổng số bản ghi là 0

 Test Files  1 passed (1)
      Tests  5 passed (5)
```

## Kiến Trúc Backend (3 Lớp: Presentation - Business - Data Access)

```
Request → Routes → Controllers (Presentation) → Services (Business) → Repositories (Data Access) → MongoDB
```


| Lớp               | Thư mục       | Vai trò                                                 |
| ------------------ | --------------- | -------------------------------------------------------- |
| **Presentation**   | `controllers/`  | Nhận request từ client, định dạng và trả response |
| **Business Logic** | `services/`     | Xử lý logic nghiệp vụ, validation dữ liệu          |
| **Data Access**    | `repositories/` | Truy vấn trực tiếp database                           |
