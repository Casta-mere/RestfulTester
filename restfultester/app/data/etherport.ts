import { RestfulItem } from "@/app/types/RestfulItem";

export const etherport: RestfulItem[] = [
  {
    url: "netmode/netmode/netmode",
    method: "GET",
    prefix: "",
    args: {
      portname: "",
      portdesc: "",
      portmode: "",
      portiptype: "",
      portip: "",
      portip6: "",
      portpid: "",
      portvlan: "",
      portstatus: "",
      vsysname: "",
      username: "",
      passwd: "",
      reconnect: "",
      route: "",
      pppoeid: "",
      "ds-lite": "",
    },
    note: "批量获取在线模式接口信息",
  },
  {
    url: "netmode/switchport/ethlist",
    method: "GET",
    prefix: "",
    args: {
      ifname: "",
    },
    note: "获取物理口",
  },
  {
    url: "netmode/switchport/switchport",
    method: "PUT",
    prefix: "switchport",
    args: {
      ifname: "",
      ifmode: "",
    },
    note: "修改物理口工作模式",
  },
  {
    url: "port/ifip/ifip",
    method: "DELETE",
    prefix: "switchport",
    args: { ifname: "", ip4str: "" },
    note: "修改物理口 ip 地址",
  },
];
