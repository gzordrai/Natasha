import { JSONInventory } from ".";

export interface JSONUser {
    balance: number;
    cooldowns: {}
    inventory: JSONInventory;
}