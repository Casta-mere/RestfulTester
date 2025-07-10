import { RestfulItem } from "@/app/types/RestfulItem";

export const vlan: RestfulItem[] = [
  {
    url: "vlan/vlan_entries/vlanPortInfo",
    method: "GET",
    prefix: "",
    args: {},
    note: "获取全部二层 vlan",
  },
  {
    url: "vlan/vlan_entries/vlanPortInfo",
    method: "GET",
    prefix: "",
    args: {
      vlanId: "",
      vlanDesc: "",
      portList: "",
    },
    note: "获取二层 vlan",
  },
  {
    url: "vlan/vlan_entries/vlanInfo",
    method: "POST",
    prefix: "vlanInfo",
    args: {
      vlanId: "",
      extension: "",
    },
    note: "创建 vlan",
  },
  {
    url: "vlan/vlan_entries/vlanInfo",
    method: "DELETE",
    prefix: "vlanInfo",
    args: { vlanId: "" },
    note: "删除 vlan",
  },
];
