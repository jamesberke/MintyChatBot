const rawData = require('./src/rawData')
const { listOfProjects } = require('./src/projects')
const { firstName } = rawData.contactInformation
const { listOfLanguages, listOfTechnologies } = rawData.techStack
const listTechStacks = [...listOfLanguages.map(el => el.name), ...listOfTechnologies.map(el => el.name)]
const listTechStackObjs = [...listOfLanguages.map(el => ({
  title: el.name,
  payload: el.name
})), ...listOfTechnologies.map(el => ({
  title: el.name,
  payload: el.name
}))]




module.exports = function (controller) {
  // // use a function to match a condition in the message
  // controller.hears(async (message) => message.text && message.text.toLowerCase() === 'foo', ['message'], async (bot, message) => {
  //     await bot.reply(message, 'I heard "foo" via a function test');
  // });

  // // use a regular expression to match the text of the message
  // controller.hears(new RegExp(/^\d+$/), ['message','direct_message'], async function(bot, message) {
  //     await bot.reply(message,{ text: 'I heard a number using a regular expression.' });
  // }

  // match any one of set of mixed patterns like a string, a regular expression
  controller.hears(['#techStack', 
                    new RegExp(/^TechStack/), 
                    'technologies',
                    'frameworks',
                    'projects'], ['message', 'direct_message'], async function (bot, message) {

    await bot.reply(message, { type: 'typing' });

    setTimeout(async () => {
      await bot.changeContext(message.reference);
      await bot.reply(message, { text: `Here is the list of <Strong>My Known Technologies</Strong>` });
      await bot.reply(message, { type: 'typing' });
    }, 1000);

    setTimeout(async () => {
      await bot.changeContext(message.reference);
      await bot.reply(message, {
        text: `<div><Strong>Languages</Strong></div>${listOfLanguages.map(lang => `<div>- ${lang.name}: ${lang.yearsCoding} years</div>`).join('')}`
      });
      await bot.reply(message, { type: 'typing' });
    }, 3000);

    setTimeout(async () => {
      await bot.changeContext(message.reference);
      await bot.reply(message, {
        text: `<div><Strong>Technologies</Strong></div>${listOfTechnologies.map(lang => `<div>- ${lang.name}: ${lang.yearsCoding} years</div>`).join('')}`
      });
      await bot.reply(message, { type: 'typing' });
    }, 5000);
      
    setTimeout(async () => {
      await bot.changeContext(message.reference);
      await bot.reply(message, {
        text: `Would you like to see my projects related to a specific technology?`,
        quick_replies: listTechStackObjs
      })
    }, 6000);
      
      
  });

  controller.hears(listTechStacks, ['message'], async function (bot, message) {
    const selectedProjects = listOfProjects.filter(project => project.technologies.includes(message.text))

    await bot.reply(message, { type: 'typing' });

    setTimeout(async () => {
      await bot.changeContext(message.reference);
      await bot.reply(message, {
        text: `Here is a list of my related projects`,
      })
      await bot.reply(message, { type: 'typing' });
    }, 1000);
    
    setTimeout(async () => {
      await bot.changeContext(message.reference);
      await bot.reply(message, {
        text: `<div>${selectedProjects.map(project => `<div>- <a href="${project.url}" target="_blank">${project.name}</a></div>`).join('')}</div>`,
        quick_replies: [{
          title: "Let's move on",
          payload: "Let's move on"
        },
        {
          title: 'Other projects',
          payload: 'projects'
        }]
      });
    }, 3000);
    

  });

}
