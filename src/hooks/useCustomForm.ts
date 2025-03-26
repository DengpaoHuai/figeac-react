import { FieldValues, useForm, UseFormProps } from "react-hook-form";

const useCustomForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
>(
  props: UseFormProps<TFieldValues, TContext>
) => {
  const initialValues = props.defaultValues;

  return useForm<TFieldValues>({
    ...props,
    defaultValues: initialValues,
  });
};

export default useCustomForm;
