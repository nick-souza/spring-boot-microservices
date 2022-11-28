export interface ScheduleInterface {
	id: number;
	name: string;
	roomId: number;
	room: string;
	responsibleId: number;
	responsible: string;
	bookingStart: string;
	bookingEnd: string;
}
