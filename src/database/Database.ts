import { Config, JsonDB } from "node-json-db";
import path from "path";

export class Database {
    public static readonly json: JsonDB  = new JsonDB(new Config(path.resolve(__dirname, "../../data/database.json"), true, false, '/'));
}