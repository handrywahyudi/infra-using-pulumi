import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

let main = [];
let publicsubnet = [];

main.push(new aws.ec2.Vpc("main", {
    cidrBlock: "10.60.0.0/16",
}));

publicsubnet.push(new aws.ec2.Subnet("public", {
    vpcId: main[0].id,
    cidrBlock: "10.60.1.0/24",
    tags: {
        Name: "Main",
    },
}));

export const mainVpc = main[0];
export const publicSubnet = publicsubnet[0];