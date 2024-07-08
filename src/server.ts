import express from "express";
import { routes } from "./route";
import { errorHandler } from "./middlewares/error-handler";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

app.listen(3000, () => {
    console.log("server running on port 3000");
});
