export abstract class Item {
    protected name: string;
    protected price: number;
    protected copy: number;

    public constructor(name: string, price: number, copy?: number) {
        this.name = name;
        this.price = price;
        this.copy = copy ? copy : 1;
    }

    /**
     * Add a number of copies to the total number
     * 
     * @param x number of copies
     */
    public add(x: number): void {
        this.copy += x;
    }

    /**
     * The number of copies of the item
     * 
     * @returns number of copy
     */
    public getCopies(): number {
        return this.copy;
    }

    /**
     * The name of the item
     * 
     * @returns item name
     */
    public getName(): string {
        return this.name;
    }

    /**
     * The price of the item
     * 
     * @returns item price
     */
    public getPrice(): number {
        return this.price;
    }

    /**
     * The data of the class intended to be stored in a .json
     * 
     * @returns class data
     */
    public abstract toJSON(): any;
}