import { RestfulItem } from "@/app/types/RestfulItem";

export const vrf: RestfulItem[] = [
  {
    url: "vrf/vrflist/vrflist",
    method: "GET",
    prefix: "vrflist",
    args: {},
    note: "获取全部 vrf",
  },
  {
    url: "vrf/vrflist/vrflist",
    method: "GET",
    prefix: "vrflist",
    args: {
      vrfName: "",
      vrfInterface: "",
      vsysId: "",
      vsysName: "",
      vrfId: "",
    },
    note: "批量获取设备 vrf",
  },
  {
    url: "vrf/vrflist/vrflist",
    method: "POST",
    prefix: "vrflist",
    args: {
      vrfName: "wxg",
      vrfId: "",
      vrfInterface: "",
    },
    note: "添加 vrf",
  },
  {
    url: "vrf/vrflist/modvrf",
    method: "PUT",
    prefix: "modvrf",
    args: {
      vrfName: "wxg",
      addInterface: "virtualif2_1",
      delInterface: "virtualif1_1",
    },
    note: "增量修改 vrf",
  },
  {
    url: "/vrf/vrflist/vrflist",
    method: "PUT",
    prefix: "vrflist",
    args: {
      vrfName: "wxg",
      vrfInterface: "virtualif1_1, virtualif2_1",
    },
    note: "修改 vrf",
  },
  {
    url: "vrf/vrflist/vrflist",
    method: "DELETE",
    prefix: "vrflist",
    args: {
      vrfName: "wxg",
    },
    note: "删除 vrf",
  },
  {
    url: "vrf/vrflist/newvirtualifconf",
    method: "PUT",
    prefix: "newvirtualifconf",
    args: {
      vsysName: "PublicSystem",
      vrfName: "",
      enable: "1",
    },
    note: "vrf新增虚拟接口对",
  },
];
