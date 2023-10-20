export interface ResponseListInterface<T> {
	data: T[];
	errorMessage: string;
	statusCode: number;
	success: boolean;
}

export interface ResponseInterface<T> {
	data: T;
	errorMessage: string;
	statusCode: number;
	success: boolean;
}

export interface ResponseBoolInterface {
	errorMessage: string;
	statusCode: number;
	success: boolean;
}
