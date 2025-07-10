import { RestfulItem } from "@/app/types/RestfulItem";

export const systemtime: RestfulItem[] = [
  {
    url: "system/sys_set/systemtime",
    method: "DELETE",
    prefix: "systemtime",
    args: { time: "10:15:01", date: "2020/01/31" },
    note: "系统时间配置",
  },
];
