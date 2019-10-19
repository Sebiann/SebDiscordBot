module.exports = {
  name: 'settime',
  aliases: [''],
  usage: '<Minigame> <username> <time>',
  description: 'Set the time',
  adminOnly: true,
  guildOnly: true,
  args: true,
  cooldown: 5,
  execute(message, args) {
    let time = { user: args[1], rank: 0, time: args[2], proof: '' }
    if (args[0] === 'elytraone') {
      message.client.setElytraOne.run(time)
      message.channel.send(`Your Time was ${time.time}`)
        .then(msg => {
          msg.delete(5000)
        })
    } else if (args[0] === 'funhouseone') {
      message.client.setFunhouseOne.run(time)
      message.channel.send(`Your Time was ${time.time}`)
        .then(msg => {
          msg.delete(5000)
        })
    } else {
      message.channel.send('Use either **elytraone** or **funhouseone**')
        .then(msg => {
          msg.delete(5000)
        })
    }
  },
}
