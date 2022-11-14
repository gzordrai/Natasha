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

    public async getAll(): Promise<Array<User>> {
        const users: any = await Database.json.getData(`/users`);
        const usersId: Array<string> = Object.keys(users);
        let ret: Array<User> = new Array<User>();

        for(const id of usersId) {
            ret.push(await new User(id).sync());
        }

        ret.sort((a: User, b: User): number => {
            if(a.balance.get() > b.balance.get())
                return -1;
            if(a.balance.get() < b.balance.get())
                return 1;
            return 0;
        });

        return ret;
    }

    public getId(): string {
        return this.id;
    }

    public async save(): Promise<void> {
        await Database.json.push(`/users/${this.id}/balance`, this.balance.get(), true);
        this.cooldowns.forEach(async (cooldown: Cooldown, key: string) => {
            await Database.json.push(`/users/${this.id}/cooldowns/${key}`, cooldown.getStart(), true);
        })
    }

    public async sync(): Promise<User> {
        if(!(await Database.json.exists(`/users/${this.id}`)))
            await this.register();

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