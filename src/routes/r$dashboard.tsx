import { useExpenseStore } from "@/app/expenseStore";
import { useIncomeStore } from "@/app/incomeStore";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { DateTime } from "luxon";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ITranscationIdentity } from "@/app/entity";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { expensies } = useExpenseStore();
  const { incomes } = useIncomeStore();
  const showIncomes = useMemo(() => incomes.length !== 0, [incomes.length]);
  const showExpense = useMemo(() => expensies.length !== 0, [expensies.length]);
  if (!showExpense && !showIncomes)
    return (
      <div className="flex text-lg justify-center items-center h-[90vh]">
        <div className="">
          Please add expenses or income
          <Link
            className="underline block text-center py-4 bg-gray-100 dark:bg-gray-800 rounded-md my-4 p-3"
            to="/income"
          >
            Income Page={">"}
          </Link>
          <Link
            className="underline block text-center py-4 bg-gray-100 dark:bg-gray-800 rounded-md my-4 p-3"
            to="/income"
          >
            Expense Page={">"}
          </Link>
        </div>
      </div>
    );
  return (
    <div className="w-80  mx-auto my-10 grid gap-4">
      {showIncomes ? (
        <div className="bg-green-200  dark:bg-green-800 p-4  grid gap-4">
          Incomes:
          {incomes.map((c, i) => (
            <IndivisualEntry
              ammount={c.ammount}
              time={c.time}
              key={c.ammount + "Income" + i}
            />
          ))}
        </div>
      ) : null}
      {showExpense ? (
        <div className="bg-red-200  dark:bg-red-800 p-4  grid gap-4">
          Incomes:
          {expensies.map((c, i) => (
            <IndivisualEntry
              ammount={c.ammount}
              time={c.time}
              key={c.ammount + "Expense" + i}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function IndivisualEntry({ ammount, time }: ITranscationIdentity) {
  const formattedTime = useMemo(() => {
    const luxnDate = DateTime.fromJSDate(
      time instanceof Date ? time : new Date(time)
    );

    return luxnDate.toFormat("yy-MM-dd, HH:mm");
  }, [time]);
  return (
    <Card className="w-full py-5 relative">
      <CardContent>
        <Label>
          Ammout={"> "}Rs {ammount}
        </Label>
        <br />
        <span className="text-gray-600 text-xs absolute">{formattedTime}</span>
      </CardContent>
    </Card>
  );
}
