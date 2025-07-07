export interface RestfulItem {
  url: string;
  method: "GET" | "POST" | "DELETE" | "PUT";
  prefix: string;
  args: Record<string, any>;
  note: string;
}
