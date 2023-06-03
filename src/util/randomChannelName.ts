export enum Rarety {
    Legendary = 1,
    Epic = 14,
    Rare = 25,
    Commun = 60
}

interface ChannelRate {
    legendary: Array<string>;
    epic: Array<string>;
    rare: Array<string>;
    commun: Array<string>;
}

export const channelNames: ChannelRate = {
    legendary: ["La chambre de Natasha", "La camionette blanche"],
    epic: ["La cave de Simon", "La kouizine de Gilles", "Le grenier de Thibault", "Le trône de Maxime", "La cabane de Djibril", "La piscine à balles d'Alexis", "Le jardin de la grand-mère"],
    rare: ["Les backrooms", "L'antre des soupeurs", "QG des midgets", "QG des biggers"],
    commun: ["Vocal qui pu", "Black mesa", "Aperture laboratory", "La faille de l'invocateur", "La tour", "Abyss bar", "Personoid Quarters"]
}

export const randomChannelName = async (): Promise<string> => {
    const roll = Math.floor(Math.random() * 100);
    let names: Array<string> = new Array<string>();

    if (roll >= 0 && roll < Rarety.Commun)
        names = channelNames.commun;
    else if (roll >= Rarety.Rare && roll < (Rarety.Commun + Rarety.Rare))
        names = channelNames.rare;
    else if (roll >= Rarety.Epic && roll < (Rarety.Commun + Rarety.Rare + Rarety.Epic))
        names = channelNames.epic;
    else if (roll >= Rarety.Legendary)
        names = channelNames.legendary;

    return names[Math.floor(Math.random() * (names.length - 0) + 0)];
}