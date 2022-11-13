import { Client, Collection } from "discord.js";
import { Database } from "../util/Database";
import { ICommand } from ".";

export class ExtendedClient extends Client {
    public commands: Collection<string, ICommand> = new Collection<string, ICommand>;
    public database: Database = new Database("../../data/database.json");
}