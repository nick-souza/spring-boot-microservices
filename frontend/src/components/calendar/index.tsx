import { useEffect, useRef, useState } from "react";
import { Calendar, Navigate, View, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Button } from "antd";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

// @ts-ignore
import * as dates from "react-big-calendar/lib/utils/dates";
import { ScheduleInterface } from "../../interfaces/scheduleInterface";
import { api } from "../../service/api";
import { ResponseListInterface } from "../../interfaces/responseInterface";

const datesBigCalendar = dates;
const localizer = momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(Calendar);

interface MoveEvent {
	event: Event;
	start: string | Date;
	end: string | Date;
	isAllDay: boolean;
}

export default function BigCalendar() {
	const [viewCalendar, setViewCalendar] = useState<View>(Views.MONTH);
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");
	const [title, setTitle] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const [schedules, setSchedules] = useState<ScheduleInterface[]>();

	// const [calendarAPI, setCalendarAPI] = useState<any>(null);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setLoading(true);

		try {
			const { success, data } = await api.get<ResponseListInterface<ScheduleInterface>>(`/schedule/`);
			if (success) setSchedules(data);
		} catch {
			// TODO: Notify error
		}

		setLoading(false);
	};

	const allEvents = [
		{
			id: 0,
			title: "All Day Event very long title",
			start: new Date(2022, 11, 1, 5, 40, 0),
			end: new Date(2022, 11, 1, 5, 40, 0),
		},
		{
			id: 1,
			title: "Long Event",
			start: new Date(2022, 3, 7),
			end: new Date(2022, 3, 10),
		},

		{
			id: 2,
			title: "DTS STARTS",
			start: new Date(2022, 2, 13, 0, 0, 0),
			end: new Date(2022, 2, 20, 0, 0, 0),
		},

		{
			id: 3,
			title: "DTS ENDS",
			start: new Date(2022, 10, 6, 0, 0, 0),
			end: new Date(2022, 10, 13, 0, 0, 0),
		},

		{
			id: 4,
			title: "Some Event",
			start: new Date(2022, 3, 9, 0, 0, 0),
			end: new Date(2022, 3, 9, 0, 0, 0),
		},
		{
			id: 5,
			title: "Conference",
			start: new Date(2022, 3, 11),
			end: new Date(2022, 3, 13),
			desc: "Big conference for important people",
		},
		{
			id: 6,
			title: "Meeting",
			start: new Date(2022, 3, 12, 10, 30, 0, 0),
			end: new Date(2022, 3, 12, 12, 30, 0, 0),
			desc: "Pre-meeting meeting, to prepare for the meeting",
		},
		{
			id: 7,
			title: "Lunch",
			start: new Date(2022, 3, 12, 12, 0, 0, 0),
			end: new Date(2022, 3, 12, 13, 0, 0, 0),
			desc: "Power lunch",
		},
		{
			id: 8,
			title: "Meeting",
			start: new Date(2022, 3, 12, 14, 0, 0, 0),
			end: new Date(2022, 3, 12, 15, 0, 0, 0),
		},
		{
			id: 9,
			title: "Happy Hour",
			start: new Date(2022, 3, 12, 17, 0, 0, 0),
			end: new Date(2022, 3, 12, 17, 30, 0, 0),
			desc: "Most important meal of the day",
		},
		{
			id: 10,
			title: "Dinner",
			start: new Date(2022, 3, 12, 20, 0, 0, 0),
			end: new Date(2022, 3, 12, 21, 0, 0, 0),
		},
		{
			id: 11,
			title: "Birthday Party",
			start: new Date(2022, 3, 13, 7, 0, 0),
			end: new Date(2022, 3, 13, 10, 30, 0),
		},
		{
			id: 12,
			title: "Late Night Event",
			start: new Date(2022, 3, 17, 19, 30, 0),
			end: new Date(2022, 3, 18, 2, 0, 0),
		},
		{
			id: 13,
			title: "Multi-day Event",
			start: new Date(2022, 3, 20, 19, 30, 0),
			end: new Date(2022, 3, 22, 2, 0, 0),
		},
		{
			id: 14,
			title: "Today",
			start: new Date(new Date()),
			end: new Date(new Date()),
		},
	];

	const handleDragAndDrop = (moveEvent: MoveEvent) => {
		console.log(moveEvent);
	};

	// let calendarAPI: any = null;
	const calendarAPI: any = useRef();

	useEffect(() => {
		console.log("🌟🌟");
		console.log("UseEffect", calendarAPI);
	}, [calendarAPI]);

	const moveEvent1 = (event: any) => {
		event.start = event?.start;
		event.end = event?.end;
	};

	return (
		<>
			<Button type="text" onClick={() => calendarAPI.current.onNavigate(Navigate.PREVIOUS)}>
				<i className="uil-angle-left-b"></i>
			</Button>
			<span>{title}</span>
			<Button
				type="text"
				onClick={() => {
					console.log("calendarAPI", calendarAPI);
					calendarAPI.current.onNavigate(Navigate.NEXT);
				}}
			>
				<i className="uil-angle-right-b"></i>
			</Button>
			<Button onClick={() => calendarAPI.current.onNavigate(Navigate.TODAY)}>{"today"}</Button>

			<DragAndDropCalendar
				// date={new Date(Date.now())}
				localizer={localizer}
				defaultView={viewCalendar}
				views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
				// onSelectEvent={(event, e) => openPreview(event, e)}
				// onSelectSlot={(info) => {
				// 	sendEvent({
				// 		name: TrackEventName.new,
				// 		type: TrackEventType.activity,
				// 		location: TrackEventLocation.calendar_day,
				// 	});
				// 	addNewActivity(info.start);
				// }} // openNew({start_date: info.start } as Activity)}

				// @ts-ignore
				// prettier-ignore
				messages={{ showMore: (count) => ( <span style={{ marginLeft: "7px" }}> +{count} {("activities")}</span>),}}
				// onShowMore={(events, date) => {
				// 	setSelectedDate(date);
				// 	setShowMoreVisible(true);
				// }}

				onEventDrop={(moveEvent: any) => moveEvent1(moveEvent)}
				// popup
				// popupOffset={15}
				onDrillDown={(date, view) => ""}
				resizable={false}
				doShowMoreDrillDown
				selectable={true}
				onView={(view) => console.log("On view: ", view)}
				onNavigate={(date, view) => {
					console.log(date);
					console.log(view);

					// const start_date = datesBigCalendar.firstVisibleDay(date, localizer);
					// const end_date = datesBigCalendar.lastVisibleDay(date, localizer);
					// setStartDate(start_date);
					// setEndDate(end_date);
				}}
				tooltipAccessor={(event) => ""}
				eventPropGetter={(event: any) => ({
					allDay: event?.allDay,
					// className: currentView == "week" ? style.eventColorInWeekView : style.eventColor,
					style: event.style,
				})}
				events={allEvents}
				// draggableAccessor="isDraggable"
				// draggableAccessor={(isDraggable) => true}
				// startAccessor="start"
				// endAccessor="end"
				style={{ height: "calc(100vh - 111.5px)" }}
				components={{
					toolbar: (props) => {
						console.log(props);

						if (props) calendarAPI.current = props;

						// if (props && props != calendarAPI) setCalendarAPI(props);

						console.log("calendarAPI", calendarAPI);
						setTimeout(() => {
							setTitle(props.label);
						}, 100);
						return null;
					},
				}}
			/>
		</>
	);
}
