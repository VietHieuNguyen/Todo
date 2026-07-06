import Task, { ITask } from "../../model/task.model";
import { ObjectPagination } from "../../types/pagination.type";

export const findAll = async (findQuery: any, sortQuery: any, objectPagination: ObjectPagination): Promise<ITask[]> => {
  return Task.find(findQuery)
    .sort(sortQuery)
    .skip(objectPagination.skip || 0)
    .limit(objectPagination.limits);
};

export const findById = async (id: string): Promise<ITask | null> => {
  return Task.findById(id);
}

export const create = async (taskData: Partial<ITask>): Promise<ITask> => {
  return Task.create(taskData);
}

export const updateById = async (id: string, data: Partial<ITask>): Promise<ITask | null> => {
  return Task.findByIdAndUpdate(id, data, { new: true, runValidators: true })
}

export const countDocument = async (findQuery: any) => {
  return Task.countDocuments(findQuery);
}