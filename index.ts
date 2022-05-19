import "./vpc";
import "./secgroup";
import "./ec2";
import { mainRule } from "./secgroup";
import { mainVpc, publicSubnet } from "./vpc";

export const vpcId = mainVpc.id;
export const ruleId = mainRule.id;
export const subnetId = publicSubnet.id;