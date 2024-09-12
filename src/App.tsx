import "./App.css";
import { Input } from "./components/ui/input";

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
const minLimit = 1;
const FormSchema = z.object({
  Ammount: z.number().min(minLimit, {
    message: "Cannot spent less than ${minLimit} ammount",
  }),
});
function App() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Ammount: 0,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <div className="container flex w-full h-[100vh] items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="Ammount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ammount</FormLabel>
                <FormControl>
                  <Input autoFocus placeholder="100" type="number" {...field} />
                </FormControl>
                <FormDescription>Your Expenses For Today</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Submit
          </Button>
          <Button variant="outline" className="w-full" type="submit">
            Register Income
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default App;
