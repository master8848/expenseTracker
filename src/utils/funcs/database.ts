import useDatabaseStore from "@/app/databaseStore";
import { init } from "@instantdb/react";

// Visit https://instantdb.com/dash to get your APP_ID :)
// const APP_ID = import.meta.env.VITE_INSTANT_APP_ID;

// Optional: Declare your schema for intellisense!

export let db = init<IDBFullSchema>({
  appId: useDatabaseStore.getState()?.appId ?? "",
  devtool: false,
  apiURI: useDatabaseStore.getState()?.appUri ?? "",
});
db._core.subscribeQuery({ loan: {} }, (...arg) => {
  console.log(...arg);
});
export function updateDb() {
  db = init<IDBFullSchema>({
    appId: useDatabaseStore.getState()?.appId ?? "",
    devtool: false,
    apiURI: useDatabaseStore.getState()?.appUri ?? "",
  });
  db._core.subscribeQuery({ loan: {} }, (...arg) => {
    console.log(...arg);
  });
}
