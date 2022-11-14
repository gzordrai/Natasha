export enum Rarety {
    Legendary = 1,
    Epic = 10,
    Rare = 39,
    Commun = 50
}

interface ChannelRate {
    legendary: Array<string>;
    epic: Array<string>;
    rare: Array<string>;
    commun: Array<string>;
}

export const channelNames: ChannelRate = {
    legendary: ["La chambre de Natasha", "La camionette blanche"],
    epic: ["La cave de Simon", "La kouizine de Gilles", "La grenier de Thibaut", "Le marais de Maxime", "Le trône de Maxime", "La cabane de Djibril"],
    rare: ["Black mesa", "Aperture laboratory", "La faille de l'invocateur", "Les backrooms", "L'antre des soupeurs"],
    commun: ["Vocal qui pu"]
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