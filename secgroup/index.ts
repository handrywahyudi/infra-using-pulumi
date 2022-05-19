import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { envInfra } from "../env";
import { mainVpc } from "../vpc";

let rule = [];
if (envInfra) {
    rule.push(new aws.ec2.SecurityGroup("allowSSH", {
        description: "Allow SSH inbound traffic",
        vpcId: mainVpc.id,
        ingress: [{
            description: "SSH from VPC",
            fromPort: 22,
            toPort: 22,
            protocol: "tcp",
            cidrBlocks: [mainVpc.cidrBlock],
        }],
        egress: [{
            fromPort: 0,
            toPort: 0,
            protocol: "-1",
            cidrBlocks: ["0.0.0.0/0"],
            ipv6CidrBlocks: ["::/0"],
        }],
        tags: {
            Name: "allow_ssh",
        },
    }));
}

export const mainRule = rule[0];