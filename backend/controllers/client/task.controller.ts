import { Request, Response } from "express"
import { createTaskService, getTaskService, updateTaskService } from "../../services/client/task.service";
import { ITask } from "../../model/task.model";
//[GET] /tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const keyword = req.query.keyword as string | undefined;
    const sortKey = req.query.sortKey as string | undefined;
    const status = req.query.status as string | undefined;
    const page = parseInt(req.query.page as string);
    const result = await getTaskService(keyword, sortKey, status, page)
    res.status(200).json({
      code: 200,
      data: result.data,
      pagination: result.pagination,
      message: result.message
    })
  } catch (error: any) {
    res.status(400).json({
      code: 400,
      message: `Lỗi: ${error.message}`
    })
  }
}

//[POST] /tasks
export const createTask = async (req: Request, res: Response) => {
  try {
    const task: Partial<ITask> = {
      title: req.body.title,
      description: req.body.description,
    }
    if (req.body.dueDate) {
      task.dueDate = new Date(req.body.dueDate)
    }
    const result = await createTaskService(task)

    res.status(201).json({
      code: 201,
      data: result.data,
      message: result.message
    })
  } catch (error: any) {
    res.status(400).json({
      code: 400,
      message: `Lỗi: ${error.message}`
    })
  }
}

//[PATCH] /tasks/update/:taskId
export const updateTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId as string;
    const taskData: Partial<ITask> = {}
    if (req.body.title !== undefined) taskData.title = req.body.title;
    if (req.body.description !== undefined) taskData.description = req.body.description;
    if (req.body.dueDate !== undefined) taskData.dueDate = new Date(req.body.dueDate);
    if (req.body.status !== undefined) taskData.status = req.body.status;

    const result = await updateTaskService(taskId, taskData)
    res.status(200).json({
      code: 200,
      data: result.data,
      message: result.message
    })
  } catch (error: any) {
    res.status(404).json({
      code: 404,
      message: `Lỗi: ${error.message}`
    })
  }
}
//[PATCH] /tasks/delete/:taskId
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId as string;
    const taskData: Partial<ITask> = {
      isDeleted: true,
    }
    const result = await updateTaskService(taskId, taskData)
    res.status(200).json({
      code: 200,
      data: result.data,
      message: result.message
    })
  } catch (error: any) {
    res.status(404).json({
      code: 404,
      message: `Lỗi: ${error.message}`
    })
  }
}

//[PATCH] /tasks/toggle-complete/:taskId
export const completeTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId as string;
    const currentStatus = req.body.currentStatus as string;
    const newStatus = currentStatus === "finish" ? "initial" : "finish";
    const taskData: Partial<ITask> = {
      status: newStatus,
    }
    const result = await updateTaskService(taskId, taskData)
    res.status(200).json({
      code: 200,
      data: result.data,
      message: result.message
    })
  } catch (error: any) {
    res.status(404).json({
      code: 404,
      message: `Lỗi: ${error.message}`
    })
  }
}
