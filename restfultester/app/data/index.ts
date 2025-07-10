import { vrf } from "./vrf";
import { vsys } from "./vsys";
import { devices } from "./devices";
import { systemtime } from "./systemtime";
import { staticroute } from "./staticroute";
import { strategyroutev4 } from "./strategyroutev4";
import { strategyroutev6 } from "./strategyroutev6";
import { ffswitch } from "./ffswitch";
import { vlan } from "./vlan";
import { vlanif } from "./vlanif";
import { port } from "./port";
import { etherport } from "./etherport";

import { RestfulItem } from "@/app/types/RestfulItem";
export interface DataGroup {
  label: string;
  items: RestfulItem[];
}

export const dataMap: Record<string, DataGroup> = {
  vrf: { label: "VRF", items: vrf },
  vsys: { label: "VSYS", items: vsys },
  devices: { label: "获取设备信息", items: devices },
  systemtime: { label: "系统时间配置", items: systemtime },
  staticroute: { label: "静态路由", items: staticroute },
  strategyroutev4: { label: "策略路由 IPv4", items: strategyroutev4 },
  strategyroutev6: { label: "策略路由 IPv6", items: strategyroutev6 },
  ffswitch: { label: "转发表项", items: ffswitch },
  vlan: { label: "二层 VLAN", items: vlan },
  vlanif: { label: "三层 VLAN 接口", items: vlanif },
  port: { label: "端口链路类型", items: port },
  etherport: { label: "物理接口", items: etherport },
};
