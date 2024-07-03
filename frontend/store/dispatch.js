import { store } from "./store";

export default function dispatch(action) {
  return store.dispatch(action);
}
