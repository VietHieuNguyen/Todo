import { describe, it, expect } from "vitest";
import { paginationHelper } from "../helpers/pagination";
import { ObjectPagination } from "../types/pagination.type";

describe("Bộ test cho paginationHelper", () => {
  it("nên tính toán đúng totalPage và skip đối với trang 1", () => {
    const initPagination: ObjectPagination = {
      currentPage: 1,
      limits: 6
    };
    const count = 15; 
    const result = paginationHelper(initPagination, count, 1);

    expect(result.totalPage).toBe(3);
    expect(result.currentPage).toBe(1);
    expect(result.skip).toBe(0);
  });

  it("nên tính toán đúng skip đối với trang 2", () => {
    const initPagination: ObjectPagination = {
      currentPage: 1,
      limits: 6
    };
    const count = 15;
    const result = paginationHelper(initPagination, count, 2);

    expect(result.totalPage).toBe(3);
    expect(result.currentPage).toBe(2);
    expect(result.skip).toBe(6);
  });

  it("nên giới hạn trang được yêu cầu về trang cuối nếu số trang quá lớn", () => {
    const initPagination: ObjectPagination = {
      currentPage: 1,
      limits: 5
    };
    const count = 12; 
    const result = paginationHelper(initPagination, count, 5); 

    expect(result.totalPage).toBe(3);
    expect(result.currentPage).toBe(3);
    expect(result.skip).toBe(10);
  });

  it("nên giới hạn trang được yêu cầu về trang 1 nếu số trang nhỏ hơn 1", () => {
    const initPagination: ObjectPagination = {
      currentPage: 1,
      limits: 5
    };
    const count = 10;
    const result = paginationHelper(initPagination, count, -2); 

    expect(result.totalPage).toBe(2);
    expect(result.currentPage).toBe(1); 
    expect(result.skip).toBe(0);
  });

  it("nên trả về ít nhất 1 totalPage ngay cả khi tổng số bản ghi là 0", () => {
    const initPagination: ObjectPagination = {
      currentPage: 1,
      limits: 6
    };
    const count = 0;
    const result = paginationHelper(initPagination, count, 1);

    expect(result.totalPage).toBe(1);
    expect(result.currentPage).toBe(1);
    expect(result.skip).toBe(0);
  });
});
