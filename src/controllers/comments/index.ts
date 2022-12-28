import { PaginationProps } from "../../dataProvider/comments/types";
import { CommentingDataProvider } from "./../../dataProvider/comments/index";

class CommentingControllers {
  #dataProvider: CommentingDataProvider;

  constructor() {
    this.#dataProvider = new CommentingDataProvider();
    this.#dataProvider.init();
  }

  getComments(props: PaginationProps) {
    return this.#dataProvider.getComments(props);
  }
}

const commentingController = new CommentingControllers();

export { commentingController };
