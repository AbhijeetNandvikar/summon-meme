#! /usr/bin/env node
import fetch from "node-fetch";
import open from "open";
import terminalImage from "terminal-image";
import yargs from "yargs";
import keypress from "keypress";
import chalk from "chalk";

const argv = yargs(process.argv).argv;

const getRedditData = async (subReddit = "wholesomememes", count = 1) => {
  fetch(`https://meme-api.herokuapp.com/gimme/${subReddit}/${count}`);
};

const cliEngine = (argv) => {};

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// function inputString(){
//     let input = ""
//     return getInputString = () => input

// }

let inputString = "";

// listen for the "keypress" event
process.stdin.on("keypress", function (ch, key) {
  if (key && key.ctrl && key.name == "c") {
    process.stdout.write(`\n`);
    process.stdout.write("Thanks for using this tool");
    process.stdout.write(`\n`);
    process.stdin.pause();
  } else if (key && key.ctrl && key.name == "z") {
    process.stdout.write(`\n`);
    process.stdout.write("Thanks for using this tool");
    process.stdout.write(`\n`);
    process.stdin.pause();
  } else if (key && key.name === "return") {
    cliEngine(inputString);
    inputString = "";
    process.stdout.write(`\n`);
    process.stdout.write(chalk.green.bold("summon-meme: $ "));
  } else if (key && key.name == "backspace") {
    process.stdout.clearLine("\r");
    process.stdout.write(`\r`);
    process.stdout.write(chalk.green.bold("summon-meme: $ "));
  } else if (ch) {
    inputString = inputString += ch;
    process.stdout.write(ch);
  }
  //   process.stdout.write("keypressed : ", key, ch);
});

process.stdin.setRawMode(true);
process.stdin.resume();

process.stdout.write(chalk.green.bold("summon-meme: $ "));
