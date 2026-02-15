import express from "express";
import {PORT} from "./config/env.js";
import userRoutes from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRoutes from "./routes/subsicription.route.js";
import connecttodatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middlewawre.js";
import workflowRoutes from "./routes/workflow.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(arcjetMiddleware)

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/subscriptions', subscriptionRoutes);
app.use('/api/v1/workflow', workflowRoutes);

app.use(errorMiddleware);

app.get("/", function (req, res) {
    res.send("Welcome to the subscription tracker api");
});

app.listen(3000, async () => {
    console.log(`Subscription tracker api is running on http://localhost:${PORT}`);
    await connecttodatabase();
});

export default app;
