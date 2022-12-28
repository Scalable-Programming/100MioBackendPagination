export interface Comment {
  createdAt: Date;
  message: string;
  parentId?: string;
}

export interface PaginationProps {
  perPage: number;
  lastCommentId?: string;
  sortBy: "createdAt" | "_id";
  sortValue: 1 | -1;
  parentId?: string;
  lastSortValue?: string
}
