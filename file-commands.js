const os = require("os"); // inbuilt nodejs
const fs = require("fs"); // fs - file system

console.log("Hello, Guvi!!!");

const marks = [40, 50, 80, 10, 70];

console.log(Math.max(...marks));

// Few objects N/A - document, window

// console.log(global);

// create package.json - npm init

// cmd apps

function double(num) {
  return num * 2;
}

console.log(process.argv);

const num = process.argv[2];

console.log("The double is: ", double(num));

// It returns the amount of free system memory in bytes
console.log("Free memory: " + os.freemem());

// It return total amount of system memory in bytes
console.log("Total memory: " + os.totalmem());

console.log(os.arch());

// async - call stack -> webapi (complete reading) -> callback Q ->
// Event loop  -> call stack

// fs.readFile("./nice.txt", "utf8", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data, " Sakthi");

//   fs.writeFile("./good.txt", data, () =>
//     console.log("Completed writing in good.txt")
//   );
// });

// // call stack - blocking operation
const data = fs.readFileSync("./nice.txt", "utf8");
// console.log(data);

// fs.copyFile("./nice.txt", "good1.txt", () => {
//   console.log("Copied nice!!!");
//   fs.rename("good.txt", "awesome.txt", () => {
//     console.log("Rename is complete!");
//   });
// });

// fs.rename("good.txt", "awesome.txt", () => {
//   console.log("Rename is complete!");
// });

// Task - fs
// Add Good night
// copy this content to another file good.txt
// rename the good.txt - awesome.txt

// writeFile - overwrite, rename, copyFile

fs.appendFile("./nice.txt", "\nGood night!!!", () => {
  console.log("Added to the file");
});

// const data = fs.readFile("./nice.txt","utf-8")
// console.log(data);
