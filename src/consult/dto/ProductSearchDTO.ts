import { IsNotEmpty, IsString } from 'class-validator';

export class ProductSearchDTO {

    // @IsString()
    readonly product: string;

    // @IsString()
    readonly minValue: number;

    // @IsString()
    readonly maxValue: number;
}