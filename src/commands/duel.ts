import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, GuildEmoji, Message, MessageComponentInteraction, SlashCommandBuilder } from "discord.js";
import { User } from "../database";
import { ExtendedClient, ICommand } from "../bot";

export const command: ICommand = {
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
                .then((message: Message) => {
                    message.reply({ content: "https://tenor.com/view/debile-idiot-gif-15579739" });
                })
        else {
            if (user.getId() === opponent.getId()) {
                await interaction.followUp({ content: "Vous ne pouvez pas faire un duel contre vous même idiot !" })
                    .then((message: Message) => {
                        message.reply({ content: "https://tenor.com/view/debile-idiot-gif-15579739" });
                    })
            } else {
                if (bet <= 0) {
                    await interaction.followUp({ content: "Mise invalide idiot !" })
                        .then((message: Message) => {
                            message.reply({ content: "https://tenor.com/view/debile-idiot-gif-15579739" });
                        })
                } else {
                    if (!user.balance.has(bet) && !opponent.balance.has(bet)) {
                        await interaction.followUp({ content: "Vous ou votre adversaire n'avez pas assez de pétales bande de clochard !" })
                            .then((message: Message) => {
                                message.reply({ content: "https://tenor.com/view/squidward-spare-change-spare-some-change-begging-poor-gif-18999842" });
                            })
                    } else {
                        await interaction.followUp({ content: `${await interaction.guild?.members.fetch(opponent.getId())!}, ${interaction.user} vous provoque en duel !\nAcceptez vous ?`, components: [row] })
                            .then(async (message: Message) => {
                                const filter = (interaction: any) => (interaction.customId === "duel-yes" || interaction.customId === "duel-no") && interaction.user.id === opponent.getId();
                                message.awaitMessageComponent({ filter: filter, time: 20000 })
                                    .then(async (i: unknown) => {
                                        user.balance.add(-100);
                                        opponent.balance.add(-100);

                                        if (userValue > opponentValue) {
                                            user.balance.add(bet * 2);

                                            await interaction.followUp({ content: `${interaction.user} a gagné le duel contre ce clochard de ${await interaction.guild?.members.fetch(opponent.getId())!} !` })
                                                .then((msg: Message) => {
                                                    msg.reply({ content: `${interaction.user} vous avez gagné ${bet * 2} ${petalEmoji} !` })
                                                        .then((m: Message) => {
                                                            m.reply({ content: "https://tenor.com/view/hasbulla-money-gif-25191018" });
                                                        })
                                                })
                                        } else if (userValue < opponentValue) {
                                            opponent.balance.add(bet * 2);

                                            await interaction.followUp({ content: `${await interaction.guild?.members.fetch(opponent.getId())!} a gagné le duel contre ce clochard de ${interaction.user} !` })
                                                .then((msg: Message) => {
                                                    msg.reply({ content: `${interaction.user} vous avez gagné ${bet * 2} ${petalEmoji} !` })
                                                        .then((m: Message) => {
                                                            m.reply({ content: "https://tenor.com/view/hasbulla-money-gif-25191018" });
                                                        })
                                                })
                                        } else {
                                            await interaction.followUp({ content: `Ces abrutis se sont entre tuer... A moi la thune !` })
                                                .then((msg: Message) => {
                                                    msg.reply({ content: "https://tenor.com/view/e-boy-gif-21631945" });
                                                })
                                        }

                                        await user.save();
                                        await opponent.save();
                                    })
                                    .catch(async () => {
                                        await interaction.followUp({ content: `${interaction.guild?.members.fetch(opponent.getId())!} à refusé le duel !` })
                                        .then((msg: Message) => {
                                            msg.reply({ content: "https://tenor.com/view/boo-south-park-loser-you-suck-angry-gif-21522247" });
                                        })
                                    })
                            })
                    }
                }
            }
        }
    }
}

export default command;