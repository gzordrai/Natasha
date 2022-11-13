export enum CooldownType {

}

export class Cooldown {
    private start: number;

    public constructor(start: number) {
        this.start = start;
    }

    /**
     * Check if the cooldown is finished
     * 
     * @param x Cooldown time
     * @returns True if the cooldown is complete if not false
     */
    public isFinished(x: CooldownType): boolean {
        if (this.getSeconds() >= x)
            return true;
        return false;
    }

    /**
     * The total number of hours since the timestamp
     * 
     * @returns Number of hours
     */
     public getHours(): number {
        return Math.floor(this.getMinutes() / 60);
    }

    /**
     * The total number of minutes since the timestamp
     * 
     * @returns Number of minutes
     */
     public getMinutes(): number {
        return Math.floor(this.getSeconds() / 60);
    }

    /**
     * The total number of seconds since the timestamp
     * 
     * @returns Number of seconds
     */
    public getSeconds(): number {
        const millis = Date.now() - this.start;
        const seconds: number = Math.floor(millis / 1000);

        return seconds;
    }
}