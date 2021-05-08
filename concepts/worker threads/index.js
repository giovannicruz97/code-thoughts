const { Worker } = require("worker_threads");
const { payloads } = require("./payloads.json");

const LEADING_ZEROES = 4;
const final = [];
let finishedWorkers = 0;
for (const payload of payloads) {
  const worker = new Worker("./worker.js", { env: { LEADING_ZEROES } });

  worker.once("message", (message) => {
    final.push(message);
    finishedWorkers += 1;
    if (finishedWorkers === payloads.length) {
      console.log(final);
    }
  });

  worker.on("error", console.error);

  console.log(
    `Starting worker with ID ${worker.threadId} and sending payload "${payload}"`
  );
  worker.postMessage(payload);
}
