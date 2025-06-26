// import { parentPort } from "node:worker_threads";

// parentPort?.on("message", (msg) => {
//   console.log("message in worker file ", msg);
//   parentPort?.postMessage("ping from worker");
// });

// src/worker.ts
import { parentPort, workerData } from "node:worker_threads";

function computeSum(limit: number): number {
  let sum = 0;
  for (let i = 0; i < limit; i++) sum += i;
  return sum;
}

const result = computeSum(workerData.limit);
parentPort?.postMessage({ result });
