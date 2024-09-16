// Type for the "expense" table
interface Expense {
  [x: string]: string | number | undefined;
  id?: string;
  amount: number;
  description?: string;
  date: string; // ISO date string
  category?: string;
  created_at?: string; // ISO timestamp string
  updated_at: string; // ISO timestamp string
}

// Type for the "income" table
interface Income {
  [x: string]: string | number | undefined;
  id?: string;
  amount: number;
  description?: string;
  date: string; // ISO date string
  category?: string;
  created_at?: string; // ISO timestamp string
  updated_at: string; // ISO timestamp string
}

// Type for the "loans" table
interface Loan {
  [x: string]: string | number | undefined | boolean;
  id?: string;
  person: string;
  amount: number;
  description?: string;
  date: string; // ISO date string
  return_date: string; // ISO date string
  given: boolean;
  created_at: string; // ISO timestamp string
  updated_at: string; // ISO timestamp string
}
// Type for the "loans" table
interface Catagory {
  [x: string]: string | number | undefined | boolean;
  id?: string;
}

interface IDBFullSchema {
  [key: string]: any;
  expense: Expense;
  income: Income;
  loan: Loan;
}

type Cursor = [string, string, any, number];
