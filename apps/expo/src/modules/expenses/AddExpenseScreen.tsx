import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View, TouchableOpacity } from "react-native";
import { InputField } from "../../components/InputField";
import { Text } from "../../components/Text";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "../../components/Button";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { trpc } from "../../utils/trpc";
import { CalendarIcon } from "react-native-heroicons/outline";

type FormValues = {
  description: string;
  date: Date;
  amount: string;
};

export const AddExpenseScreen = () => {
  const ctx = trpc.useContext();
  const [calenderOpen, setCalenderOpen] = useState(false);

  const household = trpc.household.get.useQuery();
  const addExpense = trpc.expense.add.useMutation({
    async onSuccess(data) {
      if (household.data?.household) {
        const id = household.data?.household?.id;
        const expenses = ctx.expense.getHousehold.getData({ household_id: id });
        ctx.expense.getHousehold.setData([...(expenses || []), data], { household_id: id });
      }
    },
  });
  const form = useForm<FormValues>({ defaultValues: { date: new Date() } });

  const openCalender = () => setCalenderOpen(true);

  const handleSubmit = form.handleSubmit(values => {
    if (!household.data?.household?.id) {
      return null;
    }
    console.log("valeus", values);
    const amountNr = parseInt(values.amount, 10);

    addExpense.mutate({ ...values, amount: amountNr });
  });

  const dateValue = form.watch("date")?.toString() || "";

  return (
    <DefaultLayout>
      <FormProvider {...form}>
        <InputField rules={{ required: true }} name="description" label="Beskrivning" />
        <InputField keyboardType="numeric" rules={{ required: true }} name="amount" label="Pengar" />
        <TouchableOpacity onPress={openCalender}>
          <View className="flex flex-row">
            <Text>date: {dateValue.toLocaleUpperCase()}</Text>
            <CalendarIcon height={32} width={32} color="black" />
          </View>
        </TouchableOpacity>
      </FormProvider>
      {calenderOpen && (
        <DateTimePicker
          onChange={event => {
            if (event.type !== "dismissed" && event.nativeEvent.timestamp)
              form.setValue("date", new Date(event.nativeEvent.timestamp));
            setCalenderOpen(false);
          }}
          value={new Date()}
        />
      )}
      <View className="my-2" />
      <Button onPress={handleSubmit}>Lägg till utgift</Button>
    </DefaultLayout>
  );
};
