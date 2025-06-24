import { Form, TimePicker } from "antd";
import { Controller, useFormContext } from "react-hook-form";
type TTimePicker = {
  label: string;
  name: string;
};
const PHTimePicker = ({ label, name }: TTimePicker) => {
  const { control } = useFormContext();
  return (
    <Form.Item label={label}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TimePicker style={{ width: "100%" }} size="large" {...field} />
        )}
      />
    </Form.Item>
  );
};

export default PHTimePicker;
