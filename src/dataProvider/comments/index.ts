import { config } from "./../../config";
import { Comment, PaginationProps } from "./types";
import { Collection, Document, MongoClient, ObjectId } from "mongodb";

const COLLECTION_NAME = "comments";

interface CommentSchema extends Comment, Document {}

export class CommentingDataProvider {
  #client: MongoClient;
  #collection: Collection<CommentSchema>;

  constructor() {
    this.#client = new MongoClient(config.mongoUrl);
  }

  init() {
    this.#client
      .connect()
      .then(() => {
        console.log("Successfully connected to mongodb");
        const db = this.#client.db(config.mongoDatabaseName);

        this.#collection = db.collection(COLLECTION_NAME);

        this.#collection.createIndex({ parentId: 1 });
        this.#collection.createIndex({ createdAt: 1, _id: 1 });
      })
      .catch(console.log);
  }

  #getCollection() {
    if (!this.#collection) {
      throw new Error("Collection not found");
    }

    return this.#collection;
  }

  async getComments({
    perPage,
    lastCommentId,
    parentId,
    sortBy,
    sortValue,
    lastSortValue,
  }: PaginationProps) {
    const mongoDbSortValue = sortValue === 1 ? "$gt" : "$lt";

    const aggregations = [
      // Find records that match the parentId
      {
        $match: {
          parentId,
        },
      },
      // Filter those comments based on lastCommentId
      lastCommentId
        ? sortBy === "createdAt" && !!lastSortValue
          ? {
              $match: {
                $or: [
                  {
                    createdAt: {
                      [mongoDbSortValue]: new Date(lastSortValue),
                    },
                  },
                  {
                    $and: [
                      {
                        createdAt: {
                          $eq: new Date(lastSortValue),
                        },
                      },
                      {
                        _id: {
                          [mongoDbSortValue]: new ObjectId(lastCommentId),
                        },
                      },
                    ],
                  },
                ],
              },
            }
          : {
              $match: {
                _id: {
                  [mongoDbSortValue]: new ObjectId(lastCommentId),
                },
              },
            }
        : null,
      // Sort it based on mongoDbSortValue
      {
        $sort:
          sortBy === "createdAt"
            ? {
                createdAt: sortValue,
                _id: sortValue,
              }
            : {
                [sortBy]: sortValue,
              },
      },
      // Limit our query
      {
        $limit: perPage,
      },

      // // We can append a filed to all of our records
      {
        $addFields: {
          id: {
            $toString: "$_id",
          },
        },
      },
      {
        $graphLookup: {
          from: COLLECTION_NAME,
          startWith: "$id",
          connectFromField: "id",
          connectToField: "parentId",
          as: "children",
        },
      },
      // Delete $id
      {
        $project: {
          id: 0,
        },
      },
    ];

    return this.#getCollection()
      .aggregate(aggregations.filter((aggregation) => !!aggregation))
      .toArray();
  }

  async insertBulkComments(comments: Comment[]) {
    return this.#getCollection().insertMany(comments);
  }
}
