import Router from "express";
import FileController from "../controller/file.controller.js";
const router = Router();
const controller = new FileController();
router.post('/file', controller.createFile);
router.get('/files', controller.getFiles);
router.get('/file/:secret', controller.getFile);
router.put('/file', controller.updateFile);
router.delete('/file/:id', controller.deleteFile);
export default router;
//# sourceMappingURL=file.routes.js.map