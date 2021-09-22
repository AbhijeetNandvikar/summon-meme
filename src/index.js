#! /usr/bin/env node
import fetch from "node-fetch";
import open from "open";
import terminalImage from "terminal-image";
import yargs from "yargs";
import keypress from "keypress";
import chalk from "chalk";
import main from "./main.js";

const argv = yargs(process.argv).argv;

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

let inputString = "";

// listen for the "keypress" event
process.stdin.on("keypress", function (ch, key) {
  // Here we are setting up the input conditions
  if (
    (key && key.ctrl && key.name == "c") ||
    (key && key.ctrl && key.name == "z")
  ) {
    // This is exit condition
    process.stdout.write(`\n` + "Thanks for using this tool" + `\n`);
    process.stdin.pause();
  } else if (key && key.name === "return") {
    // call main function on pressing enter
    if (inputString.length) main(inputString);
    inputString = "";
    // process.stdout.write(`\n` + chalk.green.bold("summon-meme: $ "));
  } else if (key && key.name == "backspace") {
    // clearline on pressing backspace
    inputString = inputString.slice(0, -1);
    process.stdout.clearLine("\r");
    process.stdout.write(
      `\r` + chalk.green.bold("summon-meme: $ ") + inputString
    );
  } else if (ch) {
    // output character
    inputString = inputString += ch;
    process.stdout.write(ch);
  }
});

// This allows full control over text input
process.stdin.setRawMode(true);
process.stdin.resume();

process.stdout.write(chalk.green.bold("summon-meme: $ "));

// (async (subReddit = "wholesomememes", count = 1) => {
//   let result = await fetch(
//     `https://meme-api.herokuapp.com/gimme/${subReddit}/${count}`
//   );
//   console.log(await result.json());
// })();
