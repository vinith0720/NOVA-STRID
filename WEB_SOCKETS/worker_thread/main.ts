// import { Worker, isMainThread } from "node:worker_threads";

// console.log("MAIN_THREAD :", isMainThread);

// if (isMainThread) {
//   const worker = new Worker("./worker.js", { workerData: { limit: 1e7 },execArgv:["--loader","ts"] });
//   worker.postMessage("hello from main");
//   worker.on("message", (msg) => {
//     console.log("message ffrom worker :", msg);
//   });
// }

// src/main.ts
import { Worker } from "node:worker_threads";
import { fileURLToPath, pathToFileURL } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const workerPath = pathToFileURL(resolve(__dirname, "./worker.ts")).href;

function runWorker(limit: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerPath, {
      workerData: { limit },
      execArgv: ["--loader", "ts-node/esm"], // 👈 Tells the worker to run TS
    });

    worker.on("message", (msg) => {
      console.log("✅ Worker result:", msg);
      resolve(msg.result);
    });

    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0) reject(new Error(`Worker exited with code ${code}`));
    });
  });
}

(async () => {
  console.log("🧠 Starting worker thread...");
  const result = await runWorker(1e7); // 10 million
  console.log("🎉 Computation result:", result);
})();
