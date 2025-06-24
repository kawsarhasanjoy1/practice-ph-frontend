import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
type TLable = {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
  mode?: "multiple" | undefined;
  setId: any;
};
const PHSelectWithWatch = ({
  name,
  label,
  options,
  disabled,
  mode,
  setId,
}: TLable) => {
  const { control } = useFormContext();
  const watchValue = useWatch({
    control,
    name,
  });
  useEffect(() => {
    setId(watchValue);
  }, [watchValue]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            mode={mode}
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

export default PHSelectWithWatch;
