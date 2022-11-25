// import { DatePicker, DatePickerProps, Form, FormInstance, Input } from "antd";
// import { RangePickerProps } from "antd/es/date-picker";
import { useEffect, useState } from "react";
import { RoomInterface } from "../../interfaces/roomInterface";
import { ScheduleInterface } from "../../interfaces/scheduleInterface";
import { DatePicker, Form, FormInstance, Input } from "antd";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";

interface ScheduleditFormProps {
	form: FormInstance;
	schedule?: ScheduleInterface;
	saveForm: (values: ScheduleInterface) => void;
	loading?: boolean;
	setLoading?: (loading: boolean) => void;
}

export default function ScheduleEditForm({ schedule, form, saveForm, loading, setLoading }: ScheduleditFormProps) {
	const { RangePicker } = DatePicker;

	useEffect(() => {
		form.setFieldsValue({
			id: schedule?.id,
			roomId: schedule?.roomId,
			responsibleId: schedule?.responsibleId,
			// bookingStart: schedule?.bookingStart,
			// bookingEnd: schedule?.bookingEnd,
		});
	}, [schedule]);

	const onChange = (value: DatePickerProps["value"] | RangePickerProps["value"], dateString: [string, string] | string) => {
		console.log("Selected Time: ", value);
		console.log("Formatted Selected Time: ", dateString);
	};

	const onOk = (value: DatePickerProps["value"] | RangePickerProps["value"]) => {
		console.log("onOk: ", value);
	};

	return (
		<>
			<h1>{"Agendamento"}</h1>
			<Form form={form} layout="vertical" onFinish={(values) => saveForm(values)} disabled={loading}>
				<Form.Item name="id" label="Id">
					<Input disabled />
				</Form.Item>

				{/* 
                    TODO: Add both select for user and room:
                */}

				<Form.Item name="bookingStart" label="Começa em">
					{/* <Input type="date" /> */}
					<DatePicker showTime onChange={onChange} onOk={onOk} />
				</Form.Item>
				<Form.Item name="bookingEnd" label="Termina em">
					<Input type="date" />
				</Form.Item>
			</Form>
		</>
	);
}
