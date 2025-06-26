import fs from "node:fs/promises";

let data: Buffer;

// fs.readFile("./eve.ts")
//   .then((buf) => {
//     data = buf;
//     console.log(data.toString());
//   })
//   .catch(console.error);
// .

data = await fs.readFile("./eve.ts");

const someting = data.toJSON();

let file = Buffer.alloc(someting.data.length, "1");

console.log(file.toString());

// console.log(someting.data);
// console.log(data.length);
// console.log(data.toString());
// console.log(data.toReversed());
