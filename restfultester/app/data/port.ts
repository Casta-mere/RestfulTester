import { RestfulItem } from "@/app/types/RestfulItem";

export const port: RestfulItem[] = [
  {
    url: "vlan/vlan_entries/portInfo",
    method: "GET",
    prefix: "",
    args: {
      portName: "gige0_1",
      portType: "",
      vlans: "",
      pvid: "",
    },
    note: "获取端口链路类型",
  },
  {
    url: "vlan/vlan_entries/portInfo",
    method: "POST",
    prefix: "portInfo",
    args: {
      portName: "gige0_1",
      portType: "",
      vlans: "",
      pvid: "",
      isAppendVlan: "",
    },
    note: "设置端口链路类型",
  },
  {
    url: "vlan/vlan_entries/portInfo",
    method: "DELETE",
    prefix: "portInfo",
    args: { portName: "gige0_1", vlans: "100-200" },
    note: "删除端口指定 vlan",
  },
];
