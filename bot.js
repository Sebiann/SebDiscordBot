require('dotenv').config()

const Discord = require('discord.js')
const fs = require('fs')
const SQLite = require('better-sqlite3')
const sql = new SQLite('./realms.sqlite')

const client = new Discord.Client()

client.commands = new Discord.Collection()
const cooldowns = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

client.on('ready',()=>{
  console.log(`Logged in and ready to be used.. use "${process.env.PREFIX}help".`)
  const tableelytraone = sql.prepare('SELECT count(*) FROM sqlite_master WHERE type=\'table\' AND name = \'elytraone\';').get()
  if (!tableelytraone['count(*)']) {
    sql.prepare('CREATE TABLE elytraone (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, rank INTEGER, time INTEGER, proof TEXT);').run()
    sql.prepare('CREATE UNIQUE INDEX idx_elytraone_id ON elytraone (id);').run()
    sql.pragma('synchronous = 1')
    sql.pragma('journal_mode = wal')
  }
  client.getElytraOne = sql.prepare('SELECT * FROM elytraone WHERE user = ?')
  client.setElytraOne = sql.prepare('INSERT OR REPLACE INTO elytraone (id, user, rank, time, proof) VALUES (@id, @user, @rank, @time, @proof);')

  const tablefunhouseone = sql.prepare('SELECT count(*) FROM sqlite_master WHERE type=\'table\' AND name = \'funhouseone\';').get()
  if (!tablefunhouseone['count(*)']) {
    sql.prepare('CREATE TABLE funhouseone (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, rank INTEGER, time INTEGER, proof TEXT);').run()
    sql.prepare('CREATE UNIQUE INDEX idx_funhouseone_id ON funhouseone (id);').run()
    sql.pragma('synchronous = 1')
    sql.pragma('journal_mode = wal')
  }
  client.getFunhouseOne = sql.prepare('SELECT * FROM funhouseone WHERE user = ?')
  client.setFunhouseOne = sql.prepare('INSERT OR REPLACE INTO funhouseone (id, user, rank, time, proof) VALUES (@id, @user, @rank, @time, @proof);')
})

client.on('message', message => {
  if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return
  message.delete(1000)
  const args = message.content.slice(process.env.PREFIX.length).split(/ +/)
  const commandName = args.shift().toLowerCase()

  const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

  if (!command) return
  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply('I can\'t execute that command inside DMs!')
      .then(msg => {
        msg.delete(5000)
      })
  }

  if (command.adminOnly && !message.member.roles.some(role => role.name === 'King')) {
    return message.reply('No PERMS')
      .then(msg => {
        msg.delete(5000)
      })
  }

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${process.env.PREFIX}${command.name} ${command.usage}\``
    }

    return message.channel.send(reply)
      .then(msg => {
        msg.delete(5000)
      })
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection())
  }

  const now = Date.now()
  const timestamps = cooldowns.get(command.name)
  const cooldownAmount = (command.cooldown || 3) * 1000

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000
      return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)
        .then(msg => {
          msg.delete(5000)
        })
    }
  }

  timestamps.set(message.author.id, now)
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

  try {
    command.execute(message, args)
  } catch (error) {
    console.error(error)
    message.reply('there was an error trying to execute that command!')
      .then(msg => {
        msg.delete(5000)
      })
  }
})

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'welcome')
  // Do nothing if the channel wasn't found on this server
  if (!channel) return
  // Send the message, mentioning the member
  channel.send(`Welcome ${member}`)
})

client.login(process.env.TOKEN)
