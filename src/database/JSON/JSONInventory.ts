import { JSONCollectable, JSONTool } from ".";

export interface JSONInventory {
    collectables: Array<JSONCollectable>;
    tools: Array<JSONTool>;
}