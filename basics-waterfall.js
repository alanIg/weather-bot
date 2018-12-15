/*------------------------------------
This Bot demonstrates how to use a waterfall to prompt the user with a series
of questions. You can interact with this bot using CLI where node app is ran.
# RUN THE BOT:
    Run the bot from the command line using "node basics-waterfall.js" (install botbuilder using "npm i botbuilder" first) and then type
    "hello" to wake the bot up.
   
-----------------------------------------------------------------------------*/
 
var builder = require('botbuilder');
const loadData = require('./src/weatherProvider.js');
// Bot Storage: Here we register the state storage for your bot.
// Default store: volatile in-memory store - Only for prototyping!
// We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
// For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
var inMemoryStorage = new builder.MemoryBotStorage()
// Setup bot and root waterfall
var connector = new builder.ConsoleConnector().listen()
var bot = new builder.UniversalBot(connector, [
  function(session) {
    builder.Prompts.text(session, "Hello... Let me tell you what is the weather. What is your city?")
  },
  function(session, results) {
    session.userData.cityName = results.response
    builder.Prompts.choice(session, 'What time?', [
      'Today',
      'Tomorrow',
      'The day after tomorrow'
    ])
  },
  async function(session, results) {
    session.userData.time = results.response.entity;

    const data = await loadData(session.userData.cityName, results.response.index);
    
    if(data.result === 'error') {
      session.send(`Sorry, but I cannot help you because ${data.message}`);
      return;
    } 

    session.send(
      `The weather ${session.userData.time} in ${session.userData.cityName} should be ${data.weather}`);
  }
]).set('storage', inMemoryStorage) // Register in memory storage
