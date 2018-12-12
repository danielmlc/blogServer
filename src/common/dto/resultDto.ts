
export class Result<T> {
    code: number;
    message: string;
    success: boolean;
    result?: Partial<T>;
}