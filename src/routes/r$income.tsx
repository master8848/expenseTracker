import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useIncomeStore } from "@/app/incomeStore";
import { toast } from "sonner";

export const Route = createFileRoute("/income")({
  component: App,
});
const minLimit = 1;
const FormSchema = z.object({
  Ammount: z.number().min(minLimit, {
    message: `Cannot spent less than ${minLimit} ammount`,
  }),
});
function App() {
  const { addIncome } = useIncomeStore();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Ammount: 0,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    addIncome({ ammount: data.Ammount, time: new Date() });

    toast("Income added Sucessfully");
    form.reset({ Ammount: 0 });
  }

  return (
    <div className=" flex w-full h-[90vh] items-center justify-center">
      <div className="">
        <h1 className="text-2xl mb-6">Register Income</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" grid gap-4 w-72"
          >
            <FormField
              control={form.control}
              name="Ammount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ammount</FormLabel>
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
                  <FormDescription>Your Income For Today</FormDescription>
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
                navigate({ to: "/", from: "/income" });
              }}
            >
              Register Expense
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default App;
