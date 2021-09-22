### This package is a fun CLI app which serves you fresh memes anytime...

**Installation:**

```
npm i summon-meme -g
summon-meme
```

**Or to use it directly run following command:**

```
npx summon-meme
```

the program will start running

**Note: This app works with node version 14 and above because it uses ES module syntax.**

**There are two main commands**

1.  **get-meme:** To open a ramdom meme for you.
2.  **help:** Shows how to use the app.
3.  **exit:** To exit the app.

**User can customize the output by passing multiple arguments eg: subreddit name, number of memes you want to fetch**

User have to specify the type of argument using flags.

- eg: `get-meme catmemes --subreddit` This will show you memes from catmemes subreddit.
- eg: `get-meme catmemes 4 --subreddit --count` This will show you 4 memes from catmemes subreddit.

**Other important flags are**

1. **--save:** to save the meme to local machine.
2. **--visit:** to open the meme post on reddit.
3. **--json:** to print the result to console.

**I am using meme API made by https://github.com/D3vd/Meme_Api. Check out this page to learn more about it**
