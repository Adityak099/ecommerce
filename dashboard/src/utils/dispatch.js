import { store } from "../store/store";
export default function dispatch(action) {
  store.dispatch(action);
}
