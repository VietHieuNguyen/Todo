import { Router } from "express";
import * as controller from "../../controllers/client/task.controller";

const router: Router = Router();

router.get("/", controller.getTasks);

router.post("/", controller.createTask)

router.patch("/update/:taskId", controller.updateTask)

router.patch("/delete/:taskId", controller.deleteTask)

router.patch("/toggle-complete/:taskId", controller.completeTask)

export default router;