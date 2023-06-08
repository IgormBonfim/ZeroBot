const { SlashCommandBuilder, ChannelType } = require("discord.js");
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("join")
        .setDescription("Entra em um canal de voz")
        .addChannelOption((option) => 
            option.setName('canal')
                .setDescription("Canal para entrar")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildVoice)
        ),

    async execute(interaction) {
        const canal = interaction.options.getChannel('canal')

        const connection = await joinVoiceChannel({
            channelId: canal.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        await interaction.reply({ content: `To colando em ${canal}!`, ephemeral: true });
    }
}