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

export const dataMap: Record<string, any[]> = {
  vrf,
  vsys,
  devices,
  systemtime,
  staticroute,
  strategyroutev4,
  strategyroutev6,
  ffswitch,
  vlan,
  vlanif,
  port,
  etherport,
};
