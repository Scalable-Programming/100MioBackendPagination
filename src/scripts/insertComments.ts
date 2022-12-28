import { CommentingDataProvider } from "./../dataProvider/comments/index";
import _ from "lodash";

const NUMBER_OF_COMMENTS = 100000000;
const NUMBERS_PER_INSERT = 100000;

const NUMBER_OF_INSERT_STEPS = NUMBER_OF_COMMENTS / NUMBERS_PER_INSERT;

const dataProvider = new CommentingDataProvider();
dataProvider.init();

const getRandomDate = () => {
  const startDate = new Date("1976-01-01");
  const endDate = new Date("2027-01-01");

  return new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );
};

const insertCommentsReq = async (step: number = 0, parents: string[] = []) => {
  if (step === NUMBER_OF_INSERT_STEPS) {
    return;
  }

  const newParents = await dataProvider.insertBulkComments(
    _.range(NUMBERS_PER_INSERT).map((index) => ({
      message: `Message number ${index + step * NUMBERS_PER_INSERT}`,
      createdAt: getRandomDate(),
      parentId:
        parents.length === 0 || Math.random() < 0.5
          ? undefined
          : parents[Math.floor(Math.random() * parents.length)],
    }))
  );

  await insertCommentsReq(
    step + 1,
    parents.length === 0
      ? Object.values(newParents.insertedIds).map((objectId) =>
          objectId.toString()
        )
      : parents
  );
};

const insertComments = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await insertCommentsReq();
};

insertComments();
