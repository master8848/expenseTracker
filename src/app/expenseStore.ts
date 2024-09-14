import { create } from "zustand";

import supabase from "@/utils/funcs/superbase";
import { persist } from "zustand/middleware";
import { ITranscationIdentity } from "../types/entity";
interface expenseStoreType {
  expensies: ITranscationIdentity[];
  addExpense: (toAddTransction: ITranscationIdentity) => void;
}

export const useExpenseStore = create<expenseStoreType>()(
  persist(
    (set) => ({
      expensies: [],
      addExpense: (toAddExpense) => {
        if (isOnline()) {
          supabase.from("expense").insert({
            amount: toAddExpense.amount,
            catagory: toAddExpense.catagory || "",
            updated_at: Date().toString(),
            date: new Date(toAddExpense.time).toString(),
            description: toAddExpense.description,
          });
        }
        set((state) => ({ expensies: [...state.expensies, toAddExpense] }));
      },
    }),
    { name: "expenseValues" }
  )
);
