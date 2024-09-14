import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useExpenseStore } from "@/app/expenseStore";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: App,
});

const minLimit = 1;
const FormSchema = z.object({
  Amount: z.number().min(minLimit, {
    message: `Cannot spent less than ${minLimit} amount`,
  }),
  Catagory: z
    .string()
    .min(3, {
      message: `length should be 3 letter`,
    })
    .max(50, "Max letter reached")
    .nullable(),
  Date: z.string(),
  Description: z.string().nullable(),
});
function App() {
  const addExpense = useExpenseStore((c) => c.addExpense);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Date: new Date().toString(),
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    addExpense({
      amount: data.Amount,
      time: new Date(),
      catagory: data.Catagory || undefined,
      description: data.Description || undefined,
      date: data.Date,
    });
    toast("Expense added Sucessfully");
    form.reset({ Amount: 0 });
  }

  return (
    <div className=" flex w-full h-full items-center justify-center bg-red-200 dark:bg-red-950">
      <div className="">
        <h1 className="text-2xl mb-6">Register Expense</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" grid gap-4 w-72"
          >
            <FormField
              control={form.control}
              name="Amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      autoFocus
                      placeholder="100"
                      type="number"
                      {...field}
                      onChange={(value) =>
                        field.onChange(value.target.valueAsNumber)
                      }
                    />
                  </FormControl>
                  <FormDescription>Your Expenses For Today</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Catagory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catagory</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      value={field.value || ""}
                    
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                    
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          
            <Button className="w-full" type="submit">
              Submit
            </Button>
            <Button
              variant="outline"
              className="w-full"
              type="submit"
              onClick={(ev) => {
                ev.preventDefault();
                navigate({ to: "/income", from: "/" });
              }}
            >
              Register Income
            </Button>

            <FormField
              control={form.control}
              name="Description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      
                      {...field}
                    value={field.value||""}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}

export default App;
