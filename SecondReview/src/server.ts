import express from "express";
import route from "./routes/book.route";
import { setUpSwagger } from "./swagger/swagger";

const app = express();

app.use(express.json());
setUpSwagger(app);
app.use("/", route);

app.listen("3000", () => {
  console.log(`server running on port 3000`);
});
