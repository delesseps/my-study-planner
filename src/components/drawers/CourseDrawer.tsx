import React, { useEffect, useCallback, useState } from "react";
import {
  Drawer,
  DatePicker,
  Input,
  Button,
  Form,
  Select,
  TimePicker,
} from "antd";
import { SelectValue } from "antd/lib/select";
import moment from "moment";

import IEvaluation from "constants/interfaces/IEvaluation";
import { Weekdays } from "constants/interfaces";
import { toTitleCase } from "utils";

const { RangePicker } = TimePicker;

interface ICourseDrawerProps {
  visible: boolean;
  setVisible: Function;

  //Edit optional Props
  course?: IEvaluation;
  index?: number;
}

const CourseDrawer: React.FC<ICourseDrawerProps> = ({
  visible = false,
  setVisible,
  course,
}) => {
  const [form] = Form.useForm();
  const [selectedDays, setSelectedDays] = useState<string[]>();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log(values);
    });
  };

  const onClose = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current < moment().startOf("day");
  };

  const handleSelectedDayChange = (days: string[]) => {
    setSelectedDays(days);
  };

  return (
    <Drawer
      destroyOnClose={true}
      title={"Add new course"}
      onClose={onClose}
      visible={visible}
      width={300}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="course"
          rules={[
            {
              required: true,
              message: "Please input the course name!",
              whitespace: true,
            },
          ]}
          label={<span>Course name</span>}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="weekday"
          label={<span>Repeats</span>}
          rules={[
            {
              required: true,
              message: "Please input at least one day!",
              type: "array",
            },
          ]}
        >
          <Select
            onChange={handleSelectedDayChange}
            mode="multiple"
            placeholder="Select day(s) of the week"
          >
            {Object.keys(Weekdays).map((key) => (
              <Select.Option key={key} value={(Weekdays as any)[key]}>
                {toTitleCase(key)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {!!selectedDays?.length &&
          selectedDays.map((day) => (
            <Form.Item key={day} label={<b>{toTitleCase(day)}</b>}>
              <Form.Item
                name={[day, "time"]}
                rules={[
                  {
                    type: "array",
                    required: true,
                    message: "Please select time!",
                  },
                ]}
              >
                {/* 
              // @ts-ignore */}
                <TimePicker.RangePicker
                  use12Hours
                  format="HH:mm"
                  minuteStep={15}
                />
              </Form.Item>

              <Form.Item
                name={[day, "classroom"]}
                rules={[
                  {
                    required: true,
                    message: "Please input the classroom!",
                    whitespace: true,
                  },
                ]}
                noStyle
              >
                <Input placeholder="Classroom" />
              </Form.Item>
            </Form.Item>
          ))}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            // loading={status === "loading"}
            // disabled={status === "loading" || status === "success"}
          >
            {course ? "Edit Course" : "Add Course"}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CourseDrawer;
