import "dotenv/config";
import express, { Application } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import { goalRouter } from "./features/goal/goalRouter";
import { userRouter } from "./features/user/userRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { protect } from "./middlewares/authMiddleware";

const PORT = process.env.PORT || 8080;

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

app.get("/", (_req, res) => {
  return res.json(`Server is Live`);
});

app.use("/v1/api/goal", protect, goalRouter);
app.use("/v1/api/auth", userRouter);

app.use(errorMiddleware);

app.listen(PORT, () =>
  console.info(`Server is running at 'http://localhost:${PORT}'`)
);
