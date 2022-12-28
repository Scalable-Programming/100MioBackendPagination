import { commentingController } from "../../controllers/comments/index";
import { validateRequest } from "../../middleware/validateRequest";
import { GetCommentsRequestSchema } from "../../validations/comments";
import Express from "express";

const router = Express.Router();

router.get(
  "/comments",
  validateRequest(GetCommentsRequestSchema, "query"),
  async (req, res) => {
    try {
      const {
        parentId,
        lastCommentId,
        perPage,
        sortBy,
        sortValue,
        lastSortValue,
      } = req.body;
      const comments = await commentingController.getComments({
        parentId,
        lastCommentId,
        perPage,
        sortBy,
        sortValue,
        lastSortValue,
      });

      res.status(200).json({ comments });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

export { router };
