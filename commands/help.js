module.exports = {
  name: 'help',
  aliases: ['sos'],
  usage: '',
  description: 'Display Help message',
  adminOnly: false,
  guildOnly: false,
  args: false,
  cooldown: 5,
  execute(message, args) {
    const data = []
    const { commands } = message.client

    if (!args.length) {
      data.push('Here\'s a list of all my commands:')
      data.push(commands.map(command => command.name).join(', '))
      data.push(`\nYou can send \`${process.env.PREFIX}help [command name]\` to get info on a specific command!`)

      return message.author.send(data, { split: true })
        .then(() => {
          if (message.channel.type === 'dm') return
          message.reply('I\'ve sent you a DM with all my commands!')
            .then(msg => {
              msg.delete({ timeout: 5000, reason: 'It had to be done.' })
            })
        })
        .catch(error => {
          console.error(`Could not send help DM to ${message.author.tag}.\n`, error)
          message.reply('it seems like I can\'t DM you!')
            .then(msg => {
              msg.delete({ timeout: 5000, reason: 'It had to be done.' })
            })
        })
    }

    const name = args[0].toLowerCase()
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name))

    if (!command) {
      return message.reply('that\'s not a valid command!')
        .then(msg => {
          msg.delete({ timeout: 5000, reason: 'It had to be done.' })
        })
    }

    data.push(`**Name:** ${command.name}`)

    if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`)
    if (command.description) data.push(`**Description:** ${command.description}`)
    if (command.usage) data.push(`**Usage:** ${process.env.PREFIX}${command.name} ${command.usage}`)

    data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`)

    message.channel.send(data, { split: true })
      .then(msg => {
        msg.delete({ timeout: 10000, reason: 'It had to be done.' })
      })
  },
}
