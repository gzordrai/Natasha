import { Collection } from "discord.js";
import { Config, JsonDB } from "node-json-db";
import path from "path";
import { Collectable, Tool } from "./items";
import { Balance, Cooldown, Inventory, User } from "./user";
import { JSONUser } from "./JSON";

export class Database {
    private static readonly items: JsonDB  = new JsonDB(new Config(path.resolve(__dirname, "../../data/items.json"), true, true, '/'));
    private static readonly users: JsonDB  = new JsonDB(new Config(path.resolve(__dirname, "../../data/test.json"), true, true, '/')); // ../../data/users.json

    /**
     * Add a user to the database
     * 
     * @param id user id
     * @returns an instance of the user class
     */
    public static async addUser(id: string): Promise<User> {
        const balance: Balance = new Balance(100);
        const cooldowns: Collection<string, Cooldown> = new Collection<string, Cooldown>();
        const inventory: Inventory = new Inventory();
        const user: User = new User(id, balance, cooldowns, inventory);

        cooldowns.set("collect", new Cooldown("collect", 0));
        cooldowns.set("daily", new Cooldown("daily", 0));

        await Database.save(user);

        return user;
    }

    /**
     * All database users sorted by their balance
     * 
     * @returns all database users
     */
    public static async getAllUsers(): Promise<Array<User>> {
        const data: any = await Database.users.getData('/');
        const ids: Array<string> = Object.keys(data);
        let users: Array<User> = new Array<User>();

        for(const id of ids)
            users.push(await Database.getUser(id));

        users.sort((a: User, b: User): number => {
            if(a.balance.get() > b.balance.get())
                return -1;
            if(a.balance.get() < b.balance.get())
                return 1;
            return 0;
        });

        return users;
    }

    /**
     * Retrieves user data from the database and puts it into an instance of User
     * 
     * @param id user id
     * @returns user instance with database data loaded into it
     */
    public static async getUser(id: string): Promise<User> {
        const data: JSONUser = await Database.users.getData(`/${id}`);
        const balance: Balance = new Balance(data.balance);
        const cooldownsName: Array<string> = Object.keys(data.cooldowns);
        const cooldowns: Collection<string, Cooldown> = new Collection<string, Cooldown>();
        const inventory: Inventory = new Inventory();

        for(const name of cooldownsName)
            cooldowns.set(name, new Cooldown(name, data.cooldowns[name]!));

        for(const collectable of data.inventory.collectables)
            inventory.addCollectable(new Collectable(collectable.name, collectable.price, collectable.copy));

        for(const tool of data.inventory.tools)
            inventory.addTool(new Tool(tool.name, tool.price, tool.copy, tool.breakRate));

        return new User(id, balance, cooldowns, inventory);
    }

    /**
     * Check if the user is in the database
     * 
     * @param id user id
     * @returns true the user has an account in the database otherwise false
     */
    public static async has(id: string): Promise<boolean> {
        return await Database.users.exists(`/${id}`);
    }

    /**
     * Save a user in database
     * 
     * @param user user to be save
     */
    public static async save(user: User): Promise<void> {
        await Database.users.push(`/${user.getId()}`, user.toJSON(), true);
    }
}