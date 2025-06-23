import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type PHInputProps = {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
};

const PHInput = ({ name, type, label, placeholder }: PHInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // ✅ Traverse nested error paths like "name.firstName"
  const errorMessage = name
    .split(".")
    .reduce((acc: any, key) => acc?.[key], errors) as
    | { message?: string }
    | undefined;

  return (
    <div style={{ marginBottom: "16px" }}>
      <Form.Item label={label}>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Input
              {...field}
              size="large"
              type={type}
              placeholder={placeholder || label || name}
              status={errorMessage?.message ? "error" : ""}
            />
          )}
        />
        {errorMessage?.message && (
          <small style={{ color: "red" }}>{errorMessage.message}</small>
        )}
      </Form.Item>
    </div>
  );
};

export default PHInput;
