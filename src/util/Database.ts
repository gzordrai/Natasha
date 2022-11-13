import { Config, JsonDB } from "node-json-db";
import path from "path";

export class Database {
    private database: JsonDB;
    private path: string;

    public constructor(p: string) {
        this.path = path.resolve(__dirname, p);
        this.database = new JsonDB(new Config(this.path, true, false, '/'));
    }

    public async exist(path: string): Promise<boolean> {
        return await this.database.exists(path);
    }

    public async get(path: string): Promise<any> {
        return await this.database.getData(path);
    }

    public async push(path: string, data: any): Promise<void> {
        await this.database.push(path, data, true);
    }
}