import { RestfulItem } from "@/app/types/RestfulItem";

export const vsys: RestfulItem[] = [
  {
    url: "vfw/vsyslist/vsyslist",
    method: "GET",
    prefix: "vsyslist",
    args: {},
    note: "查看全部虚拟系统",
  },
  {
    url: "vfw/vsyslist/vsyslist",
    method: "GET",
    prefix: "vsyslist",
    args: {
      vsysName: "",
      vsysType: "",
      vsysId: "",
      vsysInfo: "",
    },
    note: "批量获取设备虚拟系统",
  },
  {
    url: "vfw/vsyslist/vsyslist",
    method: "POST",
    prefix: "vsyslist",
    args: {
      vsysName: "wxg-vsys",
      vsysType: "1",
      vsysInfo: "10.10.10.10-20.20.20.20,",
    },
    note: "添加虚拟系统",
  },
  {
    url: "vfw/vsyslist/vsyslist",
    method: "PUT",
    prefix: "vsyslist",
    args: {
      vsysName: "wxg-vsys",
      vsysType: "1",
      vsysInfo: "20.20.20.20-30.30.30.30,",
    },
    note: "修改虚拟系统",
  },
  {
    url: "vfw/vsyslist/vsyslist",
    method: "DELETE",
    prefix: "vsyslist",
    args: {
      vsysName: "wxg-vsys",
    },
    note: "删除虚拟系统",
  },
];
