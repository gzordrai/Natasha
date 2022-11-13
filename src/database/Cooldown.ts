export class Cooldown {
    private start: number;
    private duration: number

    public constructor(start: number, duration: number) {
        this.start = start;
        this.duration = duration;
    }

    /**
     * Check if the cooldown is finished
     * 
     * @param x Cooldown time
     * @returns True if the cooldown is complete if not false
     */
    public isFinished(): boolean {
        if (this.getSeconds() >= this.duration)
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

    public getStart(): number {
        return this.start;
    }

    public getTimeLeft(): string {
        const timeLeft = this.duration - this.getSeconds();
        const seconds = Math.floor(timeLeft % 60);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const hours = Math.floor((timeLeft % (3600 * 24)) / 3600);

        return `${hours}h ${minutes}m ${seconds}s`;
    }

    public reset(): void {
        this.start = Date.now();
    }
}