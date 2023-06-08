const { REST, Routes } = require('discord.js');
const { configs } = require('./configs/configs.json');
const fs = require("node:fs");
const path = require("node:path");
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

const commands = [];

commandFiles.forEach(file => {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    commands.push(command.data.toJSON());
});

const rest = new REST({version: "10"}).setToken(configs.token);

const registrarComandos = async () => {
    try {
        console.log(`Registrando ${commands.length} comandos`);

        const data = await rest.put(
            Routes.applicationCommands(configs.client_id),
            // Routes.applicationGuildCommands(client_id, server_id),
            { body: commands }
        );

        console.log("Comandos registrados com sucesso!");
    } catch (error) {
        console.error(`Ocorreu um erro: ${error}`);
    }
}

module.exports = { registrarComandos }