import { DatePicker, Form } from "antd";
import { Controller, useFormContext } from "react-hook-form";
type TDatePicker = {
  name: string;
  label: string;
};
const PHDatePicker = ({ name, label }: TDatePicker) => {
  const { control } = useFormContext();
  return (
    <div>
      <Form.Item label={label}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <DatePicker style={{ width: "100%" }} size="large" {...field} />
          )}
        />
      </Form.Item>
    </div>
  );
};

export default PHDatePicker;
