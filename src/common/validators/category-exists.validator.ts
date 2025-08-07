import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { CategoriesService } from "src/categories/categories.service";

@ValidatorConstraint({ async: true })
@Injectable()
export class CategoryExistsConstrain implements ValidatorConstraintInterface {
    constructor(private readonly categoriesService: CategoriesService) { }

    async validate(categoryId: string) {
        const category = await this.categoriesService.findById(categoryId);

        return !!category;
    }

    defaultMessage(args: ValidationArguments) {
        return `Category with id "${args.value}" does not exist`;
    }
}

export const CategoryExists = (validationOptions?: ValidationOptions) => {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: CategoryExistsConstrain,
            async: true,
        });
    };
}