import { Col, DatePicker, Form, FormInstance, Input, Row, Select } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { RoomInterface } from "../../interfaces/roomInterface";
import { ScheduleInterface } from "../../interfaces/scheduleInterface";
import { UserInterface } from "../../interfaces/userInterface";
import style from "../../pages/schedule/style.module.css";
import { api } from "../../service/api";
import { ResponseListInterface } from "../../interfaces/responseInterface";

interface ScheduleEditFormProps {
	form: FormInstance;
	schedule?: ScheduleInterface;
	saveForm: (values: any) => void;
	loading?: boolean;
	setLoading?: (loading: boolean) => void;
	defaultDate?: dayjs.Dayjs;
}

export const dateTimeFormat = "DD/MM/YYYY HH:00";

export default function ScheduleForm({ schedule, form, saveForm, loading, setLoading, defaultDate }: ScheduleEditFormProps) {
	const [userFetching, setUserFetching] = useState(false);
	const [roomFetching, setRoomFetching] = useState(false);

	const [userOptions, setUserOptions] = useState<UserInterface[]>();
	const [roomOptions, setRoomOptions] = useState<RoomInterface[]>();

	useEffect(() => {
		if (!schedule) return;

		form.setFieldsValue({
			id: schedule?.id,
			name: schedule?.name,
			roomId: schedule?.roomId,
			responsibleId: schedule?.responsibleId,
			bookingStart: dayjs(schedule?.bookingStart, dateTimeFormat),
			bookingEnd: dayjs(schedule?.bookingEnd, dateTimeFormat),
		});
	}, [schedule]);

	useEffect(() => {
		if (defaultDate) {
			const startFormat = defaultDate?.format("DD/MM/YYYY 08:00");
			const endFormat = defaultDate?.format("DD/MM/YYYY 09:00");

			form.setFieldsValue({
				bookingStart: dayjs(startFormat, "DD/MM/YYYY HH:00"),
				bookingEnd: dayjs(endFormat, "DD/MM/YYYY HH:00"),
			});
		}

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

	const fetchUserOptions = async () => {
		setUserFetching(true);

		try {
			const { success, data } = await api.get<ResponseListInterface<UserInterface>>("/user/");
			if (success) setUserOptions(data);
		} catch {}

		setUserFetching(false);
	};

	const fetchRoomOptions = async () => {
		setRoomFetching(true);

		try {
			const { success, data } = await api.get<ResponseListInterface<RoomInterface>>("/room/");
			if (success) setRoomOptions(data);
		} catch {}

		setRoomFetching(false);
	};

	const disabledDate: RangePickerProps["disabledDate"] = (current) => current.add(1, "day") <= dayjs().endOf("day");

	const disabledDateTime = () => ({
		disabledHours: () => range(0, 8).concat(range(19, 24)),
		disabledMinutes: () => range(0, 60),
	});

	const onOk = (value: dayjs.Dayjs) => {
		var newValue = value.add(1, "h");
		form.setFieldValue("bookingEnd", newValue);
	};

	return (
		<>
			<h1>Agendamento</h1>

			<Form form={form} layout="vertical" onFinish={(values) => saveForm(values)} disabled={loading}>
				{schedule && (
					<Form.Item name="id" label="Id">
						<Input disabled />
					</Form.Item>
				)}

				<Form.Item
					name="name"
					label="Nome"
					rules={[
						{
							required: true,
							message: "Nome é obrigatório",
						},
					]}
				>
					<Input type="text" placeholder="Nome" />
				</Form.Item>

				<Form.Item
					label="Responsável"
					name={"responsibleId"}
					rules={[
						{
							required: true,
							message: "Responsável é obrigatório",
						},
					]}
				>
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

				<Form.Item
					label="Sala"
					name={"roomId"}
					rules={[
						{
							required: true,
							message: "Sala é obrigatório",
						},
					]}
				>
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
						<Form.Item
							name="bookingStart"
							label="Começa em"
							rules={[
								{
									required: true,
									message: "Data de início é obrigatório",
								},
							]}
						>
							<DatePicker
								className={style.date_picker}
								showTime
								allowClear={false}
								disabledTime={disabledDateTime}
								// disabledDate={disabledDate}
								onOk={(dayjs) => onOk(dayjs)}
								format={dateTimeFormat}
							/>
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item
							name="bookingEnd"
							label="Termina em"
							rules={[
								{
									required: true,
									message: "Data de término é obrigatório",
								},
							]}
						>
							<DatePicker
								className={style.date_picker}
								showTime
								allowClear={false}
								disabledTime={disabledDateTime}
								disabledDate={disabledDate}
								format={dateTimeFormat}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</>
	);
}
