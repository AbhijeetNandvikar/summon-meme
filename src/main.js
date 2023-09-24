import fetch from "node-fetch";
import open from "open";
import terminalImage from "terminal-image";
import yargs from "yargs";
import keypress from "keypress";
import chalk from "chalk";
import fs from "fs";

const getRedditData = async (subReddit = "wholesomememes", count = 1) => {
  const results = await fetch(
    `https://meme-api.com/gimme/${subReddit}/${count}`
  );
  return results.json();
};

const main = (input) => {
  const flagArr = input.match(/--[a-zA-Z]+/g);
  const inputArr = input.match(/[0-9a-zA-Z-]+/g);
  // main commands
  if (inputArr[0] === "get-meme") {
    let actionPipeline = createActionsPipeline(flagArr);
    console.log(`\n` + "action pipeline =>", actionPipeline);
    executeActions(actionPipeline, inputArr);
  } else if (inputArr[0] === "help") {
    console.log(
      "\n" +
        chalk.yellow.bold(
          "## summon-meme is a fun cli app which shows you a new meme from reddit and much more..." +
            "\n"
        )
    );
    console.log(chalk.yellow.bold("## There are two main commands"));
    console.log(
      chalk.yellow.bold("1. get-meme: ") +
        chalk.yellow("will open a ramdom meme for you.")
    );
    console.log(
      chalk.yellow.bold("2. help: ") + chalk.yellow("will show how to use it.")
    );
    console.log("\n");
    console.log(
      chalk.yellow.bold(
        "## User can customize the output by passing multiple arguments eg: subreddit name, number of memes you want to fetch"
      )
    );
    console.log(
      chalk.yellow.bold(
        "User have to specify the type of argument using flags."
      )
    );
    console.log(
      chalk.yellow("eg: get-meme cat --subreddit"),
      "here cat is the name of subreddit"
    );
    console.log(
      chalk.yellow("eg: get-meme cat 4 --subreddit --count"),
      "Here 4 is number of image you want to fetch"
    );
    console.log("\n" + chalk.yellow.bold("## Other important flags are"));
    console.log(
      chalk.yellow.bold("1. --save: ") +
        chalk.yellow("to save a meme to local machine")
    );
    console.log(
      chalk.yellow.bold("2. --visit: ") +
        chalk.yellow("to open the meme  post on reddit")
    );
    console.log(
      chalk.yellow.bold("3. --json: ") +
        chalk.yellow("to print the result to console")
    );
    process.stdout.write(chalk.green.bold("summon-meme: $ "));
  } else if (inputArr[0] === "exit") {
    process.stdout.write(
      `\n` +
        "Thanks for using this app!!" +
        `\n` +
        "Visit " +
        chalk.yellow("https://github.com/AbhijeetNandvikar/summon-meme") +
        " to check source code, leave a start if you like this project." +
        "\n"
    );
    process.stdin.pause();
  } else {
    console.log(
      chalk.red.bold(
        "\n" + "please enter a valid command, for more info type 'help'" + "\n"
      )
    );
    process.stdout.write(chalk.green.bold("summon-meme: $ "));
  }
};

const executeActions = async (cmdArr, inputArr) => {
  try {
    let subreddit =
      cmdArr.indexOf("ADD_SUBREDDIT") !== -1
        ? inputArr[cmdArr.indexOf("ADD_SUBREDDIT") + 1]
        : undefined;
    let count =
      cmdArr.indexOf("ADD_COUNT") !== -1
        ? inputArr[cmdArr.indexOf("ADD_COUNT") + 1]
        : undefined;
    let data = await getRedditData(subreddit, count);
    try {
      for (let i = 0; i < cmdArr.length; i++) {
        try {
          switch (cmdArr[i]) {
            case "PRINT_RESULT_JSON": {
              console.log(data);
              break;
            }
            case "DOWNLOAD": {
              downloadImageWrapper(data);
              break;
            }
            case "OPEN_IMAGE": {
              // console.log("api result =>", data);
              openImages(data);
              // data?.memes?.forEach(async (url) => {});

              break;
            }
            case "VISIT_PAGE": {
              visitPage(data);
              break;
            }
          }
        } catch (err) {
          chalk.red.bold("Opps! error occured") + `\n` + "message:" + err;
        }
      }
      process.stdout.write(chalk.green.bold("summon-meme: $ "));
    } catch (err) {
      console.log(
        chalk.red.bold("Opps! error occured") + `\n` + "message:" + err
      );
      console.log(
        chalk.red.bold(
          "please report this issue at https://github.com/AbhijeetNandvikar/summon-meme"
        )
      );
      process.stdout.write(chalk.green.bold("summon-meme: $ "));
    }
  } catch (error) {
    console.log(error);
  }
};

const createActionsPipeline = (flags) => {
  let actionPipeline = [];
  //   actionPipeline.push("GET_MEME")
  flags?.forEach((flag) => {
    switch (flag) {
      case "--subreddit": {
        actionPipeline.push("ADD_SUBREDDIT");
        break;
      }
      case "--count": {
        actionPipeline.push("ADD_COUNT");
        break;
      }
      case "--json": {
        actionPipeline.push("PRINT_RESULT_JSON");
        break;
      }
      case "--save": {
        actionPipeline.push("DOWNLOAD");
      }
      case "--visit": {
        actionPipeline.push("VISIT_PAGE");
      }
    }
  });
  actionPipeline.push("OPEN_IMAGE");
  return actionPipeline;
};

const openImages = async (data) => {
  try {
    if (data.memes) {
      for (let j = 0; j < data?.memes?.length; j++) {
        await open(data?.memes[j]?.url, {
          app: {
            name: [open.apps.chrome, open.apps.firefox, open.apps.edge],
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const visitPage = async (data) => {
  try {
    if (data.memes) {
      for (let j = 0; j < data?.memes?.length; j++) {
        await open(data?.memes[j]?.postLink, {
          app: {
            name: [open.apps.chrome, open.apps.firefox, open.apps.edge],
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const downloadImageWrapper = (data) => {
  if (data.memes) {
    for (let j = 0; j < data?.memes?.length; j++) {
      download(data?.memes[j]?.title, data?.memes[j]?.url);
    }
  }
};

async function download(name, url) {
  try {
    const response = await fetch(url);
    const buffer = await response.buffer();
    fs.writeFile(`./${name}.jpg`, buffer, () => {
      console.log("finished downloading!");
      process.stdout.write(chalk.green.bold("summon-meme: $ "));
    });
  } catch (error) {
    console.log(error);
  }
}

export default main;
