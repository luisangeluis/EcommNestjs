import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class ProductExistsConstrain implements ValidatorConstraintInterface {
    constructor(private readonly productsService: ProductsService) { }

    async validate(productId: string): Promise<boolean> {
        console.log("my validate", productId);

        const product = await this.productsService.findById(productId);
        return !!product;
    }

    defaultMessage(args: ValidationArguments) {
        return `Product with id "${args.value}" does not exist`;
    }
}

// ✅ Esta es la forma correcta
export function ProductExists(args: ValidationArguments) {
    // console.log("productExists");

    return `Product with ID "${args.value}" does not exist`;
    // return function (object: any, propertyName: string) {
    //     registerDecorator({
    //         // name: 'ProductExists',
    //         target: object.constructor,
    //         propertyName,
    //         options: validationOptions,
    //         constraints: [],
    //         validator: ProductExistsConstrain,
    //     });
    // };
}
