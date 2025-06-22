import { Form, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";
type TLable = {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
};
const PHSelect = ({ name, label, options, disabled }: TLable) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            size="large"
            disabled={disabled}
            defaultValue="Select"
            style={{ width: "100%" }}
            options={options}
          />
          {error ? <span style={{ color: "red" }}>{error?.message}</span> : ""}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
