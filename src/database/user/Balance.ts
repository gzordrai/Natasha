export class Balance {
    private amount: number;

    public constructor(amount: number) {
        this.amount = amount;
    }

    /**
     * 
     * @param x 
     */
    public add(x: number): void {
        this.amount += x;
    }

    /**
     * 
     * @param x 
     * @returns 
     */
    public has(x: number): boolean {
        if (this.amount >= x)
            return true;
        return false;
    }

    /**
     * 
     * @returns 
     */
    public get(): number {
        return this.amount;
    }
}