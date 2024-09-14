import { create } from "zustand";

import supabase from "@/utils/funcs/superbase";
import { persist } from "zustand/middleware";
import { ITranscationIdentity } from "../types/entity";

interface incomeStoreType {
  incomes: ITranscationIdentity[];
  addIncome: (toAddTransction: ITranscationIdentity) => void;
}

export const useIncomeStore = create<incomeStoreType>()(
  persist(
    (set) => ({
      incomes: [],
      addIncome: (toAddIncome) => {
        supabase.from("expense").insert({
          amount: toAddIncome.amount,
          catagory: toAddIncome.catagory || "",
          updated_at: Date().toString(),
          date: new Date(toAddIncome.time).toString(),
          description: toAddIncome.description,
        });
        set((state) => ({ incomes: [...state.incomes, toAddIncome] }));
      },
    }),
    { name: "incomeValues" }
  )
);
