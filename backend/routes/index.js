
const apiV1 = requires("express")()
import { router as bookRouter } from "./book";
import { router as userRouter } from "./users";

apiV1.use("/book", bookRouter);
apiV1.use("/user", userRouter);

export default { apiV1 }