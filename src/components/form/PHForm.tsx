import { Form } from "antd";
import { ReactNode } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TDefaultValue = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TPHChilde = {
  onSubmit: SubmitHandler<any>;
  children: ReactNode;
} & TDefaultValue;

const PHForm = ({ onSubmit, children, defaultValues, resolver }: TPHChilde) => {
  const formConfig: TDefaultValue = { defaultValues: {}, resolver };
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);
  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default PHForm;
