import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>
  ) {}

  async createProduct(dto: CreateProductDto) {
    try {
      const product = await this.productRepo.create(dto);
      await this.productRepo.save(product);

      return { success: true, message: "Product created successfully" };
    } catch (err) {
      return { success: false, message: `${err} , Failed to create product` };
    }
  }

  async getAllProducts() {
    try {
      const productsList = await this.productRepo.find({
        where: { isActive: true },
        order: { createdAt: "DESC" },
      });
      return { success: true, data: productsList };
    } catch (err) {
      return { success: false, message: `${err} , Failed to fetch products` };
    }
  }

  findById(id: string) {
    return this.productRepo.findOne({ where: { id, isActive: true } });
  }

  update(id: string, dto: UpdateProductDto) {
    return this.productRepo.update(id, dto);
  }

  remove(id: string) {
    return this.productRepo.update(id, { isActive: false });
  }
}
