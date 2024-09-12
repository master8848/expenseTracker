import { create } from "zustand";

import { persist } from "zustand/middleware";
import { ITranscationIdentity } from "./entity";
interface expenseStoreType {
  expensies: ITranscationIdentity[];
  addExpense: (toAddTransction: ITranscationIdentity) => void;
}

export const useExpenseStore = create<expenseStoreType>()(
  persist(
    (set) => ({
      expensies: [],
      addExpense: (toAddExpense) =>
        set((state) => ({ expensies: [...state.expensies, toAddExpense] })),
    }),
    { name: "expenseValues" }
  )
);
