import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

let config = new pulumi.Config()
let stack = pulumi.getStack();
const stackRef = new pulumi.StackReference("engineerpalsux/infrastructure/infra");
const secgroup = stackRef.getOutput("ruleId");
const publicSubnet = stackRef.getOutput("subnetId");

let server = [];
server.push(new aws.ec2.Instance(`proxy-website-${ stack }`, {
    ami: config.require("id-ami-ubuntu"),
    instanceType: "t3.small",
    keyName: config.require("key-name"),
    subnetId: publicSubnet,
    vpcSecurityGroupIds: [ secgroup ],
    tags: {
        Name: `proxy-website-${ stack }`,
        Environment: `${ stack }`,
        Pulumi: "true",
    },
}));