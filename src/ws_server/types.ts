export interface WSMessage {
  type: string;
  data: any;
  id?: number;
}