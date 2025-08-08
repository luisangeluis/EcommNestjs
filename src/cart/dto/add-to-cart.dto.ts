import { IsNotEmpty, IsNumber, IsUUID, Max, Min, Validate } from "class-validator";
import { ProductExists } from "src/common/validators/product-exists.validator";

export class AddToCartDto {
    @IsUUID()
    @IsNotEmpty()
    @ProductExists()
    productId: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(10)
    quantity: number;
}