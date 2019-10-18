module.exports = {
  name: 'echo',
  aliases: ['say'],
  usage: '<Message>',
  description: 'Nice Echo',
  adminOnly: false,
  guildOnly: true,
  args: true,
  cooldown: 5,
  execute(message, args) {
    message.channel.send(args[0])
      .then(msg => {
        msg.delete(5000)
      })
  },
}
