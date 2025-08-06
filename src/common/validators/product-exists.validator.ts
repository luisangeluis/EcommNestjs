import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    ValidationOptions,
    registerDecorator
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class ProductExistsConstrain implements ValidatorConstraintInterface {
    constructor(private readonly productsService: ProductsService) {
        console.log('productsService in validator:', productsService);
    }

    async validate(productId: string): Promise<boolean> {
        // console.log("my validate", productId);
        console.log('Validando productId:', productId);

        const product = await this.productsService.findById(productId);
        return !!product;
    }

    defaultMessage(args: ValidationArguments) {
        return `Product with id "${args.value}" does not exist`;
    }
}

// ✅ Esta es la forma correcta
export function ProductExists(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: ProductExistsConstrain,
            async: true,
        });
    };
}
