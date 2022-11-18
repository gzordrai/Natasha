export interface JSONCooldown {
    collect?: number;
    daily?: number;
    [propName: string]: number | undefined;
}