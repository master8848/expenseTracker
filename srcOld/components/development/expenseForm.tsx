import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/utils/funcs/database";
import { id, tx } from "@instantdb/react";
import { toast } from "sonner";
import { DatePicker } from "../ui/date-picker";

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
    .optional(),
  Date: z.string(),
  Description: z.string().optional(),
});

type formType = z.infer<typeof FormSchema>;

const defaultValue = (): Partial<formType> => ({
  Date: new Date().toString(),
  Amount: 0,
  Catagory: "",
  Description: "",
});

interface EditValues {
  edit: true;
  editId: string;
  data: Record<string, any>;
}
type IExpenseProps = (
  | EditValues
  | {
      edit?: false;
    }
) & {
  onSubmit?: () => Promise<void> | void;
};
const ExpenseForm = (props: IExpenseProps) => {
  const form = useForm<formType>({
    resolver: zodResolver(FormSchema),
    defaultValues: props.edit
      ? {
          Amount: props.data.amount,
          Catagory: props.data.category,
          Date: props.data.date,
          Description: props.data.description,
        }
      : defaultValue(),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    db.transact(
      tx.expense[props.edit === true ? props?.editId : id()].update({
        updated_at: new Date().toString(),
        category: data.Catagory,
        created_at: props.edit ? undefined : new Date().toString(),
        description: data.Description,
        date: data.Date,
        amount: data.Amount,
      }),
    );

    toast(
      props.edit ? "Expense edited Sucessfully" : "Expense added Sucessfully",
    );
    if (props.edit) props.onSubmit?.();
    form.reset(defaultValue());
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" grid gap-4 w-full"
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
                <Input type="text" {...field} value={field.value || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <DatePicker
          control={form.control}
          name="Date"
          label="Date"
        ></DatePicker>
        <FormField
          control={form.control}
          name="Description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} value={field.value || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full bg-red-800 hover:bg-red-600" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ExpenseForm;
