import Joi from "joi";

export const GetCommentsRequestSchema = Joi.object({
  lastCommentId: Joi.string().optional(),
  perPage: Joi.number().min(1).max(30).required(),
  sortValue: Joi.number().valid(1, -1).required(),
  sortBy: Joi.number().valid("createdAt", "_id").required(),
  parentId: Joi.string().optional(),
  lastSortValue: Joi.string().optional(),
});
