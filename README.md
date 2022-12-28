# Run guide

- `npm install`
- `docker-compose up -d`
- `cp .env.template .env`
- `npm run compile`
- `npm run start`

### GET /comments

|            Name | Required |       Type        | Description                                         |
| --------------: | :------: | :---------------: | --------------------------------------------------- |
|       `perPage` | required |      number       | Number of comments returned in pagination           |
|        `sortBy` | required |      1 or -1      | Determine ascending or descending sorting           |
|     `sortValue` | required | createdAt or \_id | Field on which we are doing sorting                 |
|      `parentId` | optional |      string       | parentId of comments                                |
| `lastCommentId` | optional |      string       | Last comment \_id in previous request               |
| `lastSortValue` | optional |      string       | Last createdAt value if we are sorting on createdAt |

**Example request**

`http://localhost:3001/comments?perPage=3&sortBy=createdAt&lastCommentId=63aa029d209070de2a49db5a&sortValue=1&lastSortValue=1998-08-08T05:01:22.599Z`

**Example response**

```
{
  "comments": [
    {
      "_id": "63aa029d209070de2a49db5f",
      "message": "Message number 2011997",
      "createdAt": "1998-08-08T05:01:22.599Z",
      "parentId": null,
      "children": []
    },
    {
      "_id": "63aa06037fd8684d6cb4238f",
      "message": "Message number 681991",
      "createdAt": "1998-08-08T05:01:22.799Z",
      "parentId": null,
      "children": []
    },
    {
      "_id": "63aa08d31ce585e25d058db8",
      "message": "Message number 2897805",
      "createdAt": "1998-08-08T05:01:23.209Z",
      "parentId": null,
      "children": []
    }
  ]
}
```
