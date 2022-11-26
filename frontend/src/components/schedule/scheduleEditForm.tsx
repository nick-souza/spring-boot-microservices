import { Col, DatePicker, Form, FormInstance, Input, Row, Select, SelectProps, Spin } from "antd";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { RoomInterface } from "../../interfaces/roomInterface";
import { ScheduleInterface } from "../../interfaces/scheduleInterface";
import { UserInterface } from "../../interfaces/userInterface";
import style from "../../pages/schedule/style.module.css";
import { api } from "../../service/api";

interface ScheduleEditFormProps {
	form: FormInstance;
	schedule?: ScheduleInterface;
	saveForm: (values: any) => void;
	loading?: boolean;
	setLoading?: (loading: boolean) => void;
}

export const dateTimeFormat = "DD/MM/YYYY HH:mm";

export default function ScheduleEditForm({ schedule, form, saveForm, loading, setLoading }: ScheduleEditFormProps) {
	const [userFetching, setUserFetching] = useState(false);
	const [roomFetching, setRoomFetching] = useState(false);
	const [userOptions, setUserOptions] = useState<UserInterface[]>();
	const [roomOptions, setRoomOptions] = useState<RoomInterface[]>();

	useEffect(() => {
		form.setFieldsValue({
			id: schedule?.id,
			roomId: schedule?.roomId,
			responsibleId: schedule?.responsibleId,
			bookingStart: dayjs(schedule?.bookingStart, dateTimeFormat),
			bookingEnd: dayjs(schedule?.bookingEnd, dateTimeFormat),
		});
	}, [schedule]);

	useEffect(() => {
		fetchUserOptions();
		fetchRoomOptions();
	}, []);

	const range = (start: number, end: number) => {
		const result = [];
		for (let i = start; i < end; i++) {
			result.push(i);
		}
		return result;
	};

	const fetchUserOptions = () => {
		setUserFetching(true);
		api
			.get("/user/")
			.then((res) => {
				if (res.data.success) setUserOptions(res?.data?.data);
			})
			.finally(() => setUserFetching(false));
	};

	const fetchRoomOptions = () => {
		setRoomFetching(true);
		api
			.get("/room/")
			.then((res) => {
				if (res.data.success) setRoomOptions(res.data.data);
			})
			.finally(() => setRoomFetching(false));
	};

	const disabledDate: RangePickerProps["disabledDate"] = (current) => {
		return current.add(1, "day") <= dayjs().endOf("day");
	};

	const disabledDateTime = () => ({
		disabledHours: () => range(0, 8).concat(range(19, 23)),
		disabledMinutes: () => range(0, 60),
	});

	// FIXME: Check how to extract the date from date picker::
	const onChange = (value: DatePickerProps["value"], dateString: [string, string] | string) => {
		console.log("Selected Time: ", value);
		console.log("Formatted Selected Time: ", dateString);
	};

	const onOk = (value: DatePickerProps["value"] | RangePickerProps["value"]) => {
		const date = dayjs(value?.toString(), dateTimeFormat);
		console.log("OnOK", date);
	};

	const ok = (date: dayjs.Dayjs) => {
		console.log(date.format(dateTimeFormat));
	};

	return (
		<>
			<h1>{"Agendamento"}</h1>
			<Form form={form} layout="vertical" onFinish={(values) => saveForm(values)} disabled={loading}>
				<Form.Item name="id" label="Id">
					<Input disabled />
				</Form.Item>

				<Form.Item label="Responsável" name={"responsibleId"}>
					<Select loading={userFetching} filterOption={false} showSearch>
						{userOptions?.map((item, index) => (
							<Select.Option key={`${item.id}_${index}`} value={item.id} label={item.name} data={item}>
								{item.name}
							</Select.Option>
						))}
						{userFetching && (
							<Select.Option value={""} disabled>
								{"Carregando"}
							</Select.Option>
						)}
					</Select>
				</Form.Item>

				<Form.Item label="Sala" name={"roomId"}>
					<Select loading={roomFetching} filterOption={false} showSearch>
						{roomOptions?.map((item, index) => (
							<Select.Option key={`${item.id}_${index}`} value={item.id} label={item.name} data={item}>
								{item.name}
							</Select.Option>
						))}
						{roomFetching && (
							<Select.Option value={""} disabled>
								{"Carregando"}
							</Select.Option>
						)}
					</Select>
				</Form.Item>

				<Row gutter={[16, 16]}>
					<Col span={12}>
						<Form.Item name="bookingStart" label="Começa em">
							<DatePicker
								className={style.date_picker}
								showTime
								disabledTime={disabledDateTime}
								disabledDate={disabledDate}
								onChange={onChange}
								onOk={(dayjs) => ok(dayjs)}
								format={dateTimeFormat}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item name="bookingEnd" label="Termina em">
							<DatePicker
								className={style.date_picker}
								showTime
								disabledTime={disabledDateTime}
								disabledDate={disabledDate}
								onChange={onChange}
								onOk={onOk}
								format={dateTimeFormat}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</>
	);
}
