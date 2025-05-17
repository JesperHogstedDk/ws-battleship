export type User = {
    index: number,
    name: string,
    password: string
} | any;

export type WSMessage = {
    type: string;
    data: string | any;
    id: number;
}
