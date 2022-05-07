import { Client, ClientOptions, Collection } from "discord.js";
import { config } from "../../config/config";

export class Natasha extends Client {
    public commands: Collection<string, any> = new Collection();

    public constructor(options: ClientOptions) {
        super(options);
    }

    public async start(): Promise<void> {
        this.login(config.token);
    }
}