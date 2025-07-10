import { RestfulItem } from "@/app/types/RestfulItem";

export const ffswitch: RestfulItem[] = [
  {
    url: "system/sysinfolist/ffswitchlist",
    method: "GET",
    prefix: "",
    args: {},
    note: "获取转发表项变化",
  },
  {
    url: "system/sysinfolist/ffswitchlist",
    method: "POST",
    prefix: "ffswitchlist",
    args: { enable: "1", type: "2", delay: "0" },
    note: "设置转发表项变化",
  },
];
