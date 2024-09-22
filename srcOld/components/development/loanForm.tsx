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
import { Switch } from "../ui/switch";

const minLimit = 1;
const FormSchema = z.object({
  Amount: z.number().min(minLimit, {
    message: `Cannot spent less than ${minLimit} amount`,
  }),
  ReturnDate: z.string(),
  Person: z
    .string()
    .min(3, "Name /Contact cannot be less than 3 character long"),

  Given: z.boolean(),
  Date: z.string(),
  Description: z.string().optional(),
});
type formType = z.infer<typeof FormSchema>;
const defaultValue = (): Partial<formType> => ({
  Date: new Date().toString(),
  Amount: 0,
  Description: "",
  Person: "",
  ReturnDate: new Date().toString(),
  Given: true,
});
interface EditValues {
  edit?: true;
  editId: string;
  data: Record<string, any>;
}
type ILoanProps = (
  | EditValues
  | {
      edit?: false;
    }
) & {
  onSubmit?: () => Promise<void> | void;
};
const LoanForm = (props: ILoanProps) => {
  const form = useForm<formType>({
    resolver: zodResolver(FormSchema),
    defaultValues: props.edit
      ? {
          Description: props.data.description,
          Date: props.data.date,
          Amount: props.data.amount,
          ReturnDate: props.data.return_date,
          Person: props.data.person,
          Given: props.data.given,
        }
      : defaultValue(),
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    db.transact(
      tx.loan[props.edit === true ? props?.editId : id()].update({
        updated_at: new Date().toString(),
        created_at: props.edit ? undefined : new Date().toString(),
        description: data.Description,
        date: data.Date,
        amount: data.Amount,
        return_date: data.ReturnDate,
        person: data.Person,
        given: data.Given,
      }),
    );

    toast(props.edit ? "Loan edited Sucessfully" : "Loan added Sucessfully");
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
          name="Given"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Given Money</FormLabel>
              <FormControl>
                <Switch
                  className="ml-4"
                  checked={field.value}
                  {...field}
                  value={""}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="Given"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intrest</FormLabel>
              <FormControl>
              <Switch className="ml-4" checked={field.value} {...field} value={""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="Person"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Person</FormLabel>
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
        <DatePicker
          control={form.control}
          name="ReturnDate"
          label="Return Date"
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
        <Button
          className="w-full bg-purple-800 hover:bg-purple-600"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LoanForm;
