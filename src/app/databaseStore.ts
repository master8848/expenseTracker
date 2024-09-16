import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  appId: string | null;
  appUri: undefined | string;
  setInstantDb: (params: { appId: string; appUri: string | undefined }) => void;
}

const useDatabaseStore = create<ThemeState>()(
  persist(
    (set) => ({
      appId: null,
      appUri: undefined,
      setInstantDb: ({
        appId,
        appUri,
      }: {
        appId: string;
        appUri: string | undefined;
      }) => {
        set({ appId, appUri });
      },
    }),
    { name: "instantDb" },
  ),
);

export default useDatabaseStore;
