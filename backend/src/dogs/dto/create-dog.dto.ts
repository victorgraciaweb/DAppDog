import { IsString } from "class-validator";

export class CreateDogDto {

    @IsString()
    readonly alias: string;

    @IsString()
    readonly name: string;

    @IsString()
    readonly breed: string;
    
    @IsString()
    readonly color: string;
}
