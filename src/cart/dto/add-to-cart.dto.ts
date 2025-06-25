import { IsNotEmpty, IsNumber, IsUUID, Max, Min } from "class-validator";

export class AddToCartDto {
    @IsUUID()
    @IsNotEmpty()
    productId: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(10)
    quantity: string;
}