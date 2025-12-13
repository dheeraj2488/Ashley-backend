import { Body, Controller, Get, Param, Post, Put, Delete, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthInterceptor } from '../common/interceptors/jwt-auth.interceptor';
import { RoleInterceptor } from '../common/interceptors/role.interceptor';
import { Role } from '../common/constants/roles';

@Controller('admin')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseInterceptors(
    JwtAuthInterceptor,
    RoleInterceptor,
  )
  @Post('create-product')
  async createProduct(@Body() dto: CreateProductDto) {
    return await this.productsService.createProduct(dto);
  }

  @UseInterceptors(
    JwtAuthInterceptor,
    RoleInterceptor,
  )
  @Put('admin/products/:id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @UseInterceptors(
    JwtAuthInterceptor,
    RoleInterceptor,
  )
  @Delete('admin/products/:id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Get('getAllProducts')
  async getProducts() {
    return await this.productsService.getAllProducts();
  }

  @Get('products/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findById(id);
  }
}
