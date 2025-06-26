import { fork } from "child_process";

const child = fork("./child.ts");

console.log(process.execArgv);
