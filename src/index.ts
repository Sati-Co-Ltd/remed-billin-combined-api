import cors from "cors";
import express from "express";
import apiRouter from "modules";
import morgan from "morgan";
import globalErrorHandler from "middleware/globalErrorHandler";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

const PORT = 3000;

app.use("/api", apiRouter);

app.use(globalErrorHandler);
app.listen(PORT, () => {
    console.info(`Listening on port ${PORT}`);
    console.info(`URL: http://localhost:${PORT}`);
});
