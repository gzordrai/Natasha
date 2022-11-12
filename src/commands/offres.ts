import { AttachmentBuilder, CacheType, CommandInteraction, CommandInteractionOption, EmbedBuilder, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { readFileSync } from "fs";
import path from "path";
import { ExtendedClient, ICommand } from "../bot";

export const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName("offres")
        .setDescription("La liste des offres disponibles")
        .addStringOption((option: SlashCommandStringOption) =>
            option.setName("offre")
                .setDescription("L'offre que vous voulez afficher")
                .setRequired(true)
                .addChoices(
                    { name: "Bozo", value: "bozo.gif" },
                    { name: "Natasha", value: "natasha.gif" },
                    { name: "Poupee", value: "poupee.gif" },
                    { name: "Soupeur", value: "soupeur.gif" },
                    { name: "Thedore", value: "theodore.gif" }
                )
        ),
    async execute(client: ExtendedClient, interaction: CommandInteraction): Promise<void> {
        const options: readonly CommandInteractionOption<CacheType>[] = interaction.options.data;
        const gifName: string = typeof options[0].value! === "string" ? options[0].value! : "";
        const gif: AttachmentBuilder = new AttachmentBuilder(readFileSync(path.join(__dirname, `../../resources/gif/${gifName}`)), { name: gifName });
        let question: string = "Would you buy my ";

        switch(gifName) {
            case "bozo.gif": question += "Bozo le clown ?"; break;
            case "natasha.gif": question += "Natasha ?"; break;
            case "poupee.gif": question += "Poupée sexsuelle ?"; break;
            case "soupeur.gif": question += "Pot pour soupeurs"; break;
            case "theodore.gif": question += "Théodore ?"; break;
        }

        await interaction.followUp({ content: question, files: [gif] });
    }
}

export default command;