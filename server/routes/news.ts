import {Router} from "express";
const router = Router();

const newsList = [
   {
      id: 1,
      title: "Title 1",
      content: "The Content 1"
   },
   {
      id: 2,
      title: "Title 2",
      content: "The Content 2"
   }
];

router.get("/", (req, res) => {
   res.statusCode = 200;
   res.json(newsList);
});

export default router;