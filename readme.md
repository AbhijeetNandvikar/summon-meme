### This is a fun cli app which shows you a new meme from reddit and much more...

### Steps I followed to buid this...

- init package.json
- init git repo/add .gitignore
- install required packages...
  - node-fetch: A light weight tool to make fetch request from node environment.
  - open: To open downloaded image
  - terminal-image: Displays png/jpg images in terminal.
  - chalk: To beautify the terminal output.
  - yargs: Yargs helps you build interactive command line tools, by parsing arguments and generating an elegant user interface.
- create index.js file and add `#! usr/bin/env node` at the start of this file, this string is called hashbang.
- update the bin field in package.json as given here.
