export class Balance {
    private amount: number;

    public constructor(amount: number) {
        this.amount = amount;
    }

    public add(x: number): void {
        this.amount += x;
    }

    public has(x: number): boolean {
        if (this.amount >= x)
            return true;
        return false;
    }

    public get(): number {
        return this.amount;
    }
}