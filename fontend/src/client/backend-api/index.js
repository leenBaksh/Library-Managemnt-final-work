import { BookApi } from "./book";
import { UserApi } from "./user";

const BackendApi = {
  book: BookApi,
  user: UserApi,
}

export default { BackendApi }