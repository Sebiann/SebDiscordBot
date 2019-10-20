const Discord = require('discord.js')

module.exports = {
  name: 'leaderboard',
  aliases: ['lb'],
  usage: '<Minigame> [<username>]',
  description: 'Print leaderboard',
  botAllowed: true,
  guildOnly: true,
  args: true,
  cooldown: 5,
  execute(message, args) {
    let leaderboard

    if (args[1] !== '') {
      if (args[0] === 'elytraone') {
        leaderboard = message.client.getElytraOne.get(args[1])
        const leaderEmbed = new Discord.RichEmbed()
          .setColor('#FF0000')
          .setTitle('Leaderboard:')
          .setURL(leaderboard.proof)
          .setDescription('Some Leaderboard')
          .addField('Username:', leaderboard.user)
          .addBlankField()
          .addField('Rank:', leaderboard.rank, true)
          .addField('Time:', leaderboard.time, true)
          .setTimestamp()

        console.log(leaderboard)
        message.channel.send(leaderEmbed)
          .then(msg => {
            msg.delete(5000)
          })
      } else if (args[0] === 'funhouseone') {
        leaderboard = message.client.getFunhouseOne.get(args[1])
        const leaderEmbed = new Discord.RichEmbed()
          .setColor('#FF0000')
          .setTitle('Leaderboard:')
          .setURL(leaderboard.proof)
          .setDescription('Some Leaderboard')
          .addField('Username:', leaderboard.user)
          .addBlankField()
          .addField('Rank:', leaderboard.rank, true)
          .addField('Time:', leaderboard.time, true)
          .setTimestamp()

        console.log(leaderboard)
        message.channel.send(leaderEmbed)
          .then(msg => {
            msg.delete(5000)
          })
      } else {
        message.channel.send('Use either **elytraone** or **funhouseone**')
          .then(msg => {
            msg.delete(5000)
          })
      }
    }
  },
}
