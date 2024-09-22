//

import useDatabaseStore from "@/app/databaseStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define Zod schema for validation
const formSchema = z.object({
  applicationId: z.string().min(1, "Application ID is required"),
  hostedUrl: z.string().url("Please enter a valid URL").optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function DbCredentialsForm() {
  const { setInstantDb } = useDatabaseStore((c) => c);
  const navigate = useNavigate();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicationId: import.meta.env.DEV
        ? (import.meta.env.VITE_INSTANT_APP_ID ?? "")
        : "",
      hostedUrl: undefined,
    },
  });

  // Handle form submission
  const onSubmit = (data: FormData) => {
    navigate({
      to: "/",
    });
    setInstantDb({ appId: data.applicationId, appUri: data.hostedUrl });
  };

  return (
    <Card className="max-w-md mx-auto h-screen grid">
      <CardHeader>
        <h2 className="text-lg font-bold">Enter Application Details</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Application ID Field (Required) */}
            <FormField
              control={form.control}
              name="applicationId"
              render={({ field }) => (
                <FormItem>
                  <Label>Application ID</Label>
                  <FormControl>
                    <Input placeholder="Enter Application ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Hosted URL Field (Optional) */}
            <FormField
              control={form.control}
              name="hostedUrl"
              render={({ field }) => (
                <FormItem>
                  <Label>Self Hosted URL (Optional) </Label>
                  <FormControl>
                    <Input
                      placeholder="Enter Hosted URL (Optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Example URL Information */}
            <div className="text-sm text-gray-500">
              <p>
                Visit{" "}
                <a
                  href="https://www.instantdb.com/dash"
                  target="_blank"
                  className="text-blue-500 underline"
                >
                  this link
                </a>{" "}
                to get your application URL.
              </p>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">
          Make sure to fill the required fields correctly.
        </p>
      </CardFooter>
    </Card>
  );
}
