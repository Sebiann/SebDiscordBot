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
    let uservar = args[1]
    let timevar = args[2]
    if (args[0] === 'elytraone') {
      let time = message.client.getElytraOne.get(uservar)
      if (!time) {
        time = { user: uservar, rank: 0, time: timevar, proof: '' }
      }
      message.client.setElytraOne.run(time)
      message.channel.send(`Your Time was ${time.time}`)
        .then(msg => {
          msg.delete(5000)
        })
    } else if (args[0] === 'funhouseone') {
      let time = message.client.getFunhouseOne.get(uservar)
      if (!time) {
        time = { user: uservar, rank: 0, time: timevar, proof: '' }
      }
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
