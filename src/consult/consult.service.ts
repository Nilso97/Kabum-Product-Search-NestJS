import axios from "axios";
import { Injectable } from "@nestjs/common";
import { ProductSearchDTO } from "./dto/ProductSearchDTO";

@Injectable()
export class ConsultService {

    private readonly productsList: Array<Object> = [];

    constructor() { }

    async kabumProductSearch(productSearchDTO: ProductSearchDTO): Promise<Array<Object>> {
        let products_list = await this.consultProducts(productSearchDTO);
        console.log(`Foram encontrados ${this.productsList.length.toString()} produtos no site "kabum.com.br"`);
        return products_list;
    }

    async consultProducts(productSearch: Object): Promise<Array<Object>> {
        try {
            let consultEndpoint = await this.getConsultEndpoint(1);
            let consultResponse = await axios.get(consultEndpoint);
            let totalPages = consultResponse.data["meta"]["total_pages_count"];

            for (let page = 1; page <= totalPages; page++) {
                console.info(`Realizando a busca por produtos na página ${page} de ${totalPages}`);
                consultResponse = await axios.get(consultEndpoint);
                this.groupProductsData(consultResponse, productSearch);
                consultEndpoint = await this.getConsultEndpoint(page + 1);
            }
        } catch (error) {
            throw new Error(`Não foi possível realizar a busca por produtos: ${error}`)
        } finally {
            return this.productsList;
        }
    }

    async groupProductsData(consultResponse: any, productSearch: Object): Promise<void> {
        for (let productData of consultResponse.data["data"]) {
            if (productData["attributes"]["price"] <= productSearch["maxValue"]) {
                if (productData["attributes"]["price"] > productSearch["minValue"]) {
                    this.productsList.push({
                        productId: productData["id"],
                        productTitle: productData["attributes"]["title"],
                        productDescription: productData["attributes"]["description"],
                        productPrice: productData["attributes"]["price"],
                        productPriceWithDiscount: productData["attributes"]["price_with_discount"],
                        productPricePrimeNinja: productData["attributes"]["prime"] && productData["attributes"]["prime"]["price"] !== null ? productData["attributes"]["prime"]["price"] : "",
                        productPricePrimeNinjaWithDiscount: productData["attributes"]["prime"] && productData["attributes"]["prime"]["price_with_discount"] !== null ? productData["attributes"]["prime"]["price_with_discount"] : ""
                    })
                }
            }
            console.log(`Foi encontrado um produto no valor de ${productData["attributes"]["price"]}`);
        }
    }

    async getConsultEndpoint(page: number): Promise<string> {
        let endpoint = "https://servicespub.prod.api.aws.grupokabum.com.br";
        endpoint += "/catalog/v2/products-by-category/computadores/notebooks?";
        endpoint += `page_number=${page}&page_size=20&facet_filters=&sort=most_searched&include=gift`;
        return endpoint;
    }
}