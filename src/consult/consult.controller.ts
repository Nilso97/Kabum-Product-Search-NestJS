import { Controller, Post, Body, ValidationPipe } from "@nestjs/common";
import { ConsultService } from "./consult.service";
import { ProductSearchDTO } from "./dto/ProductSearchDTO";

@Controller("consulta-kabum")
export class ConsultController {

    constructor(private readonly consultService: ConsultService) { }

    @Post("pesquisar")
    async kabumProductSearch(@Body(new ValidationPipe()) productSearchDTO: ProductSearchDTO): Promise<Array<Object>> {
        return await this.consultService.kabumProductSearch(productSearchDTO);
    }
}