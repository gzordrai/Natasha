import { Message } from "discord.js";

interface IGifs  {
    duel: string;
    fool: string;
    loser: string;
    poor: string;
    rich: string;
    stupid: string;
}

const gifs: IGifs = {
    duel: "https://tenor.com/view/yu-gi-oh-time-to-duel-card-gif-12403495",
    fool: "https://tenor.com/view/e-boy-gif-21631945",
    loser: "https://tenor.com/view/boo-south-park-loser-you-suck-angry-gif-21522247",
    poor: "https://tenor.com/view/squidward-spare-change-spare-some-change-begging-poor-gif-18999842",
    rich: "https://tenor.com/view/hasbulla-money-gif-25191018",
    stupid: "https://tenor.com/view/debile-idiot-gif-15579739"
}

export const duel = async (message: Message): Promise<Message<boolean>> => {
    return await message.reply({ content: gifs.duel });
}

export const fool = async (message: Message): Promise<Message<boolean>> => {
    return await message.reply({ content: gifs.fool });
}

export const loser = async (message: Message): Promise<Message<boolean>> => {
    return await message.reply({ content: gifs.loser });
}

export const poor = async (message: Message): Promise<Message<boolean>> => {
    return await message.reply({ content: gifs.poor });
}

export const rich = async (message: Message): Promise<Message<boolean>> => {
    return await message.reply({ content: gifs.rich });
}

export const stupid = async (message: Message): Promise<Message<boolean>> => {
    return await message.reply({ content: gifs.stupid });
}