import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type PHInputProps = {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
};

const PHInput = ({ name, type = "text", label, placeholder }: PHInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = (errors[name]?.message as string) || "";
  return (
    <div style={{ marginBottom: "16px" }}>
      <Form.Item label={label}>
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              size="large"
              type={type}
              placeholder={placeholder || label || name}
              status={errorMessage ? "error" : ""}
            />
          )}
        />
        {errorMessage && <small style={{ color: "red" }}>{errorMessage || errors?.root?.message}</small>}
      </Form.Item>
    </div>
  );
};

export default PHInput;
