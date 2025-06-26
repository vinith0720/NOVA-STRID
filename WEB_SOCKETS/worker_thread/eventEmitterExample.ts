import EventEmitter from "events";

export const eventEmitter = new EventEmitter();

eventEmitter.on("login", function () {
  console.log("one");
});
eventEmitter.on("event", function () {
  console.log("two");
});

eventEmitter.on("login", function () {
  console.log("three");
});

eventEmitter.emit("login");
