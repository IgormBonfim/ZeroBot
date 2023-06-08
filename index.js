const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { configs } = require('./configs/configs.json');
const colors = require('colors');
const registerCommands = require('./register-commands.js');
const fs = require("node:fs");
const path = require("node:path");

registerCommands.registrarComandos();

const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers, 
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

commandFiles.forEach(file => {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`Erro no arquivo: ${filePath}!`.red);
    }
});

client.once(Events.ClientReady, c => {
	console.log(`${c.user.tag} está Online!`.green);
});

client.login(configs.token);

client.on(Events.InteractionCreate, interaction => {
    if (!interaction.isChatInputCommand()) {
        return;
    }

    const command = interaction.client.commands.get(interaction.commandName);

    try {
        command.execute(interaction);
    } catch (error) {
        interaction.reply(`Ocorreu um erro ao executar o comando ${interaction.commandName}`);
        console.error(`Erro ao executar o comando: ${interaction.commandName}, Erro: ${error}`);
    }
});

client.on(Events.MessageCreate, async (mensagem) => {
    try {
        if (mensagem.author.bot) return;
            
        mensagem.channel.send("teste");
        
    } catch (error) {
        mensagem.channel.send("Ocorreu um erro!");
        console.error(`Erro: ${error}`.red);
    }
});