import { IsNotEmpty, IsString, IsArray, ArrayMinSize } from "class-validator";

export class CreateRestaurantDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;
    
    @IsArray()
    @ArrayMinSize(1)
    menu: Array<{ name: string; description: string; price: number }>;

    @IsString()
    @IsNotEmpty()
    ownerId: string;
}
