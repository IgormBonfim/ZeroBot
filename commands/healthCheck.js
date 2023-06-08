const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("health-check")
        .setDescription("Verifica se o bot está funcionando"),

    async execute(interaction) {
        await interaction.reply({ content: "Estou funcionando!", ephemeral: true });
    }
}