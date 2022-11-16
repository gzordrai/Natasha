import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, GuildEmoji, Message, SlashCommandBuilder } from "discord.js";
import { User } from "../database";
import { ExtendedClient, Command } from "../bot";
import { duel, fool, loser, poor, rich, stupid } from "../util/duelAnswers";

export const command: Command = {
    data: new SlashCommandBuilder()
        .setName("duel")
        .setDescription("Faire un duel contre un adversaire !")
        .addUserOption(option =>
            option.setName("adversaire")
                .setDescription("L'adversaire que vous voulez affronter en duel")
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName("mise")
                .setDescription("La mise du duel")
                .setRequired(true)
        ),
    async execute(client: ExtendedClient, interaction: ChatInputCommandInteraction): Promise<void> {
        const user: User = await new User(interaction.user.id).sync();
        const opponent: User = await new User(interaction.options.getUser("adversaire")!.id).sync();
        const bet: number = interaction.options.getInteger("mise")!;
        const userValue: number = Math.floor(Math.random() * (21 - 0) + 0); // [0, 20]
        const opponentValue: number = Math.floor(Math.random() * (21 - 0) + 0); // [0, 20]
        const petalEmoji: GuildEmoji = interaction.guild?.emojis.cache.get(process.env.PETAL_EMOJI_ID!)!;
        const row: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("duel-yes")
                    .setLabel("Oui")
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("duel-no")
                    .setLabel("Non")
                    .setStyle(ButtonStyle.Danger)
            );

        if (interaction.options.getUser("adversaire")!.bot)
            await interaction.followUp({ content: "Vous pouvez pas jouer contre un bot idiot !" })
                .then(stupid);
        else {
            if (user.getId() === opponent.getId()) {
                await interaction.followUp({ content: "Vous ne pouvez pas faire un duel contre vous même idiot !" })
                    .then(stupid);
            } else {
                if (bet <= 0) {
                    await interaction.followUp({ content: "Mise invalide idiot !" })
                        .then(stupid);
                } else {
                    if (!user.balance.has(bet) || !opponent.balance.has(bet)) {
                        await interaction.followUp({ content: "Vous ou votre adversaire n'avez pas assez de pétales bande de clochard !" })
                            .then(poor);
                    } else {
                        await interaction.followUp({ content: `${await interaction.guild?.members.fetch(opponent.getId())!}, ${interaction.user} vous provoque en duel pour ${bet} ${petalEmoji} !\nAcceptez vous ?`, components: [row] })
                            .then(async (message: Message) => {
                                const filter = (interaction: any) => (interaction.customId === "duel-yes" || interaction.customId === "duel-no") && interaction.user.id === opponent.getId();
                                message.awaitMessageComponent({ filter: filter, time: 20000 })
                                    .then(async (i: any) => {
                                        if (i.customId === "duel-yes") {
                                            user.balance.add(-bet);
                                            opponent.balance.add(-bet);

                                            await interaction.followUp({ content: "Le duel va commencer !" })
                                                .then(async (msg: Message) => {
                                                    duel(msg)
                                                        .then((m: Message) => {
                                                            setTimeout(async () => {
                                                                m.reply({ content: "Pan ! Pan !\nDeux coup de feu ont retenti..." })
                                                                    .then(async () => {
                                                                        setTimeout(async () => {
                                                                            if (userValue < opponentValue) {
                                                                                user.balance.add(bet * 2);

                                                                                await m.reply({ content: `${interaction.user} a gagné le duel en tirant en ${userValue} ms contre ce clochard de ${await interaction.guild?.members.fetch(opponent.getId())!} qui a tiré en ${opponentValue}ms !` })
                                                                                    .then((msg: Message) => {
                                                                                        msg.reply({ content: `${interaction.user} vous avez gagné ${bet * 2} ${petalEmoji} !` })
                                                                                            .then(rich);
                                                                                    })
                                                                            } else if (userValue > opponentValue) {
                                                                                opponent.balance.add(bet * 2);

                                                                                await m.reply({ content: `${await interaction.guild?.members.fetch(opponent.getId())!} a gagné le duel en tirant en ${opponentValue} ms contre ce clochard de ${interaction.user} qui a tiré en ${userValue}ms !` })
                                                                                    .then(async (msg: Message) => {
                                                                                        msg.reply({ content: `${await interaction.guild?.members.fetch(opponent.getId())!} vous avez gagné ${bet * 2} ${petalEmoji} !` })
                                                                                            .then(rich);
                                                                                    })
                                                                            } else {
                                                                                await m.reply({ content: `Ces abrutis se sont entre tuer... A moi la thune !` })
                                                                                    .then(fool);
                                                                            }

                                                                            await user.save();
                                                                            await opponent.save();
                                                                        }, 2000);
                                                                    });
                                                            }, 2000);
                                                        })
                                                })
                                        } else {
                                            await interaction.followUp({ content: `${await interaction.guild?.members.fetch(opponent.getId())!} à refusé le duel !` })
                                                .then(loser);
                                        }
                                    })
                                    .catch(async () => {
                                        await interaction.followUp({ content: `${await interaction.guild?.members.fetch(opponent.getId())!} à refusé le duel !` })
                                            .then(loser);
                                    })
                            })
                    }
                }
            }
        }
    }
}

export default command;