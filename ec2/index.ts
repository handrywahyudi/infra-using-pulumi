import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import { envInfra, envDev } from "../env";

let config = new pulumi.Config()
let server = [];
let stack = pulumi.getStack()
const stackRef = new pulumi.StackReference("engineerpalsux/infrastructure/infra");
const secgroup = stackRef.getOutput("ruleId");
const mainVpc = stackRef.getOutput("vpcId");
const publicSubnet = stackRef.getOutput("subnetId");

if (envDev) {
    server.push(new aws.ec2.Instance("proxy-website-test", {
        ami: config.require("id-ami-ubuntu"),
        instanceType: "t3.small",
        keyName: config.require("key-name"),
        subnetId: publicSubnet,
        vpcSecurityGroupIds: [ secgroup ],
        tags: {
            Name: "proxy-website-test",
            Environment: "development",
            Pulumi: "true",
        },
    }));
}