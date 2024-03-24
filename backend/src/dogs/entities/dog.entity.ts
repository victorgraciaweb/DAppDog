export class Dog {
    readonly id: string;
    readonly name: string;
    readonly breed: string;
    readonly color: string;
    readonly availableForAdpt: boolean

    constructor(
        id: string, 
        name: string, 
        breed: string, 
        color: string,
        availableForAdpt: boolean) 
    {
        this.id = id;
        this.name = name;
        this.breed = breed;
        this.color = color;
        this.availableForAdpt = availableForAdpt;
    }
}
