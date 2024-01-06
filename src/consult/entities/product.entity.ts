import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    productTitle: string;

    @Column()
    productDescription: string;

    @Column()
    productPrice: number;

    @Column()
    productPriceWithDiscount: number;

    @Column()
    productPricePrimeNinja: number;

    @Column()
    productPricePrimeNinjaWithDiscount: number;
}