export class Dog {
    readonly id: string;
    readonly alias: string;
    readonly name: string;
    readonly breed: string;
    readonly color: string;
    readonly available: boolean;

    constructor(
        id: string, 
        alias: string, 
        name: string, 
        breed: string, 
        color: string,
        available: boolean) 
    {
        this.id = id;
        this.alias = alias;
        this.name = name;
        this.breed = breed;
        this.color = color;
        this.available = available;
    }
}
