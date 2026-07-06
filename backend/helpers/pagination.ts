import { ObjectPagination } from "../types/pagination.type";

export const paginationHelper = (
  objectPagination: ObjectPagination,
  countDocuments: number,
  page?: number
): ObjectPagination => {
  const totalPage = Math.ceil(countDocuments / objectPagination.limits) || 1;
  objectPagination.totalPage = totalPage;

  if (page && !isNaN(page)) {
    objectPagination.currentPage = Math.max(1, Math.min(page, totalPage));
  }
  
  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limits;
  
  return objectPagination;
}