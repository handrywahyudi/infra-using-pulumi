import * as pulumi from "@pulumi/pulumi";

function getStackInfra(stackName: string) {
    if (stackName === "infra") {
        return true;
    } else {
        return false;
    }
}

function getStackDev(stackName: string) {
    if (stackName === "dev") {
        return true;
    } else {
        return false;
    }
}

let stack = pulumi.getStack();
export const envInfra = getStackInfra(stack);
export const envDev = getStackDev(stack);