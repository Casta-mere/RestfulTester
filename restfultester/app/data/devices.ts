import { RestfulItem } from "@/app/types/RestfulItem";

export const devices: RestfulItem[] = [
  {
    url: "system/sysinfolist/sysinfolist",
    method: "GET",
    prefix: "vrflist",
    args: {
      slotId: "",
    },
    note: "批量获取设备信息",
  },
];
