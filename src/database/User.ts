import { Balance, Cooldown, Database } from ".";

export class User {
    private id: string;
    public balance: Balance = new Balance(0);
    public cooldowns: Map<string, Cooldown> = new Map<string, Cooldown>();

    public constructor(id: string) {
        this.id = id;
    }

    private async register(): Promise<void> {
        await Database.json.push(
            `/users/${this.id}`,
            { 
                balance: 100,
                cooldowns: {
                    daily: 0,
                    collect: 0
                }
            },
            true
        );
    }

    public async save(): Promise<void> {
        await Database.json.push(`/users/${this.id}/balance`, this.balance.get(), true);
        this.cooldowns.forEach(async (cooldown: Cooldown, key: string) => {
            await Database.json.push(`/users/${this.id}/cooldowns/${key}`, cooldown.getStart(), true);
        })
    }

    public async sync(): Promise<User> {
        if(!(await Database.json.exists(`/users/${this.id}`)))
            this.register();

        const userCooldowns = await Database.json.getData(`/users/${this.id}/cooldowns`);
        const cooldownsName = Object.keys(userCooldowns);

        this.balance = new Balance(await Database.json.getData(`/users/${this.id}/balance`));

        for(let i = 0; i < cooldownsName.length; i++) {
            const duration: number = await Database.json.getData(`/cooldowns/${cooldownsName[i]}`);
            this.cooldowns.set(cooldownsName[i], new Cooldown(userCooldowns[cooldownsName[i]], duration));
        }

        return this;
    }
}