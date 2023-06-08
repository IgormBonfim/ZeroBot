const { SlashCommandBuilder, ChannelType } = require("discord.js");
const { createAudioPlayer, createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const ytdl = require("ytdl-core");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Toca a musica do link informado")
        // .addChannelOption((option) => 
        // option.setName('canal')
        //     .setDescription("Canal para entrar")
        //     .setRequired(true)
        //     .addChannelTypes(ChannelType.GuildVoice)
        // )
        .addStringOption((option => 
            option.setName('link')
            .setDescription("Link do video no youtube")
            .setRequired(true)
            )),

    async execute(interaction) {
        // const canal = interaction.options.getChannel('canal')
        const { member } = interaction;

        const connection = await joinVoiceChannel({
            channelId: member.voice.channelId,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        const link = interaction.options.getString('link');
        
        const player = createAudioPlayer();
        connection.subscribe(player);
        const musica = ytdl(link, {filter:"audioonly"});

        const audio = createAudioResource(musica);

        player.play(audio);

        await interaction.reply({ content: `To colando em ${musica}!`, ephemeral: true });
    }
}