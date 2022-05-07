import { Intents } from "discord.js";
import { Natasha } from "./core";

const natasha: Natasha = new Natasha({ intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
natasha.start();