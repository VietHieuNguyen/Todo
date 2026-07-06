import { paginationHelper } from "../../helpers/pagination";
import { ITask } from "../../model/task.model";
import { countDocument, create, findAll, findById, updateById } from "../../repositories/client/task.repo"

const VALID_STATUSES = ['initial', 'doing', 'finish'] as const;
const VALID_SORT_KEYS = ['createdAt', 'dueDate', 'title', 'status'] as const;

export const getTaskService = async (
  keyword?: string,
  sortKey?: string,
  status?: string,
  page?: number
) => {
  const findQuery: any = {
    isDeleted: false
  }
  if (keyword) {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const keyRegex = new RegExp(escaped, "i");

    findQuery.title = keyRegex;
  }
  if (status) {
    if (!VALID_STATUSES.includes(status as any)) {
      throw new Error("Trạng thái không hợp lệ. Chỉ chấp nhận: initial, doing, finish")
    }
    findQuery.status = status;
  }
  const sortQuery: any = {}
  if (sortKey) {
    if (!VALID_SORT_KEYS.includes(sortKey as any)) {
      throw new Error("Sort key không hợp lệ. Chỉ chấp nhận: createdAt, dueDate, title, status")
    }
    sortQuery[sortKey] = -1;
  } else {
    sortQuery.createdAt = -1;
  }
  const countDocuments = await countDocument(findQuery)
  const objectPagination = paginationHelper(
    {
      currentPage: 1,
      limits: 4
    },
    countDocuments,
    page
  )
  const result = await findAll(findQuery, sortQuery, objectPagination);
  return {
    data: result,
    pagination: objectPagination,
    message: "Lấy thành công"
  }
}

export const createTaskService = async (task: Partial<ITask>) => {
  if (!task || !task.title || task.title.trim() === "") {
    throw new Error("Tiêu đề không được để trống")
  }

  if (task.dueDate && isNaN(new Date(task.dueDate).getTime())) {
    throw new Error("Ngày hết hạn không hợp lệ")
  }

  const result = await create(task)
  return {
    data: result,
    message: "Tạo thành công"
  }
}

export const updateTaskService = async (taskId: string, taskData: Partial<ITask>) => {

  const task = await findById(taskId)
  if (!task) {
    throw new Error("Không tìm thấy task")
  }

  if (task.isDeleted) {
    throw new Error("Task đã bị xóa")
  }

  if (taskData.status && !VALID_STATUSES.includes(taskData.status)) {
    throw new Error("Trạng thái không hợp lệ. Chỉ chấp nhận: initial, doing, finish")
  }

  if (taskData.title !== undefined && taskData.title.trim() === "") {
    throw new Error("Tiêu đề không được để trống")
  }

  if (taskData.dueDate && isNaN(new Date(taskData.dueDate).getTime())) {
    throw new Error("Ngày hết hạn không hợp lệ")
  }

  const result = await updateById(taskId, taskData)
  return {
    data: result,
    message: "Cập nhật thành công"
  }
}