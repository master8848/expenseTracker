import LoanForm from "@/components/development/loanForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__transaction/loan")({
  component: App,
});

function App() {
  return (
    <div className="w-72">
      <h1 className="text-2xl mb-6">Add loan Entry</h1>
      <LoanForm></LoanForm>
    </div>
  );
}

export default App;
