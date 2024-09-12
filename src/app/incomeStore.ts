import { create } from "zustand";

import { persist } from "zustand/middleware";
import { ITranscationIdentity } from "./entity";

interface incomeStoreType {
  incomes: ITranscationIdentity[];
  addIncome: (toAddTransction: ITranscationIdentity) => void;
}

export const useIncomeStore = create<incomeStoreType>()(
  persist(
    (set) => ({
      incomes: [],
      addIncome: (toAddIncome) =>
        set((state) => ({ incomes: [...state.incomes, toAddIncome] })),
    }),
    { name: "incomeValues" }
  )
);
