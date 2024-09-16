"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormLabel, FormMessage } from "./form";
import { Input } from "./input";

interface DatePickerProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  errorText?: string;
}

export function DatePicker<TFieldValues extends FieldValues>({
  name,
  control,
  label,
}: DatePickerProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Popover>
          <PopoverTrigger asChild>
            <div>
              <FormLabel className="text-left! ">{label}</FormLabel>
              <div className="relative">
                <Input
                  className="text-left pl-10 pr-4 py-2"
                  readOnly
                  value={
                    field.value ? format(field.value, "PPP") : "Pick a date"
                  }
                ></Input>
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              initialFocus
            />
          </PopoverContent>
          <FormMessage />
        </Popover>
      )}
    />
  );
}
