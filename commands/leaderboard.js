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
    if (!args[1] === '') {
      if (args[0] === 'elytraone') {
        let leaderboard = message.client.getElytraOne.get(args[1])
        message.channel.send(`${leaderboard}`)
          .then(msg => {
            msg.delete(5000)
          })
      } else if (args[0] === 'funhouseone') {
        let leaderboard = message.client.getFunhouseOne.get(args[1])
        message.channel.send(`${leaderboard}`)
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
