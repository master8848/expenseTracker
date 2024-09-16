import IncomeForm from "@/components/development/incomeForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__transaction/income")({
  component: App,
});

function App() {
  return (
    <div className="w-72">
      <h1 className="text-2xl mb-6">Register Income</h1>
      <IncomeForm></IncomeForm>
    </div>
  );
}
