import { RestfulItem } from "@/app/types/RestfulItem";

export const vlanif: RestfulItem[] = [
  {
    url: "vlan/vlan_entries/interfaceInfo",
    method: "GET",
    prefix: "",
    args: {},
    note: "获取全部三层 vlan",
  },
  {
    url: "vlan/vlan_entries/interfaceInfo",
    method: "GET",
    prefix: "",
    args: {
      vlanId: "",
      interfaceIp: "",
      mac: "",
      interfaceIpV6: "",
      vlanDesc: "",
      mtu: "",
      status: "",
    },
    note: "获取三层 vlan",
  },
  {
    url: "vlan/vlan_entries/interfaceInfo",
    method: "POST",
    prefix: "interfaceInfo",
    args: {
      vlanId: "1",
      interfaceIp: "",
      mac: "",
      interfaceIpV6: "",
      vlanDesc: "",
      mtu: "",
      status: "",
    },
    note: "创建 vlan",
  },
  {
    url: "vlan/vlan_entries/interfaceInfo",
    method: "DELETE",
    prefix: "interfaceInfo",
    args: { vlanId: "1" },
    note: "删除 vlan",
  },
];
