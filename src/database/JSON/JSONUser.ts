import { JSONCooldown, JSONInventory } from ".";

export interface JSONUser {
    balance: number;
    cooldowns: JSONCooldown;
    inventory: JSONInventory;
}