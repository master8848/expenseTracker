import ExpenseForm from "@/components/development/expenseForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__transaction/")({
  component: App,
});

function App() {
  return (
    <div className="w-72">
      <h1 className="text-2xl mb-6">Register Expense</h1>
      <ExpenseForm></ExpenseForm>
    </div>
  );
}

export default App;
