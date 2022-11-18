import { Collection } from "discord.js";
import { Balance, Cooldown, Inventory } from "../";
import { JSONCooldown, JSONUser } from "../JSON";

export class User {
    private id: string;
    public balance: Balance;
    public cooldowns: Collection<string, Cooldown>;
    public inventory: Inventory;

    public constructor(id: string, balance: Balance, cooldowns: Collection<string, Cooldown>, inventory: Inventory) {
        this.id = id;
        this.balance = balance;
        this.cooldowns = cooldowns;
        this.inventory = inventory;
    }

    /**
     * The id of the user
     * 
     * @returns user id
     */
    public getId(): string {
        return this.id;
    }

    /**
     * The data of the class intended to be stored in a .json
     * 
     * @returns class data
     */
    public toJSON(): JSONUser {
        const balance: number = this.balance.get();
        let cooldowns: JSONCooldown = {};

        for(const cooldown of this.cooldowns.values())
            cooldowns[cooldown.getName()] = cooldown.getStart();

        console.log(cooldowns);

        return { balance: balance, cooldowns: cooldowns, inventory: this.inventory.toJSON() };
    }
}