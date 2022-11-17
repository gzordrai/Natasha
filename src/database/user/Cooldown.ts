export class Cooldown {
    private start: number;

    public constructor(start: number) {
        this.start = start;
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

    /**
     * Give the cooldown start timestamp
     * 
     * @returns the cooldown start timestamp
     */
    public getStart(): number {
        return this.start;
    }

    /**
     * Give the remaining time
     * 
     * @param duration cooldown duration
     * @returns returns a string of the form h:m:s
     */
    public getTimeLeft(duration: number): string {
        const timeLeft = duration - this.getSeconds();
        const seconds = Math.floor(timeLeft % 60);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const hours = Math.floor((timeLeft % (3600 * 24)) / 3600);

        return `${hours}h ${minutes}m ${seconds}s`;
    }

    /**
     * Check if the cooldown is finished
     * 
     * @param x Cooldown time
     * @returns True if the cooldown is complete if not false
     */
    public isFinished(duration: number): boolean {
        if (this.getSeconds() >= duration)
            return true;
        return false;
    }

    /**
     * Reset the cooldown
     */
    public reset(): void {
        this.start = Date.now();
    }
}