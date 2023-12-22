import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { ResturantService } from './resturant.service';
import { RoleEnum } from 'src/common/constant/roles.enum';
import { Roles } from 'src/common/roles/role.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';
import { RolesGuard } from 'src/common/roles/role.guards';
import { CreateRestaurantDto } from './dtos/createResturant.dto';
import { Restaurant } from './models/resturant.model';

@Controller('resturant')
export class ResturantController {
    constructor(private readonly resturantService: ResturantService) { }

    @Post('createResturant')
    @Roles([RoleEnum.Admin,RoleEnum.Owner])
    @UseGuards(JwtAuthGuard, RolesGuard)
    async createResturant(@Body() createResturantDto: CreateRestaurantDto, @Req() request: any): Promise<Restaurant> {
        createResturantDto.ownerId = request.user._id;
        const createdData = this.resturantService.createResturant(createResturantDto)
        return createdData;
    }
    
    @Get("getAll")
    @UseGuards(JwtAuthGuard)
    async getAll():Promise<Restaurant[]>{
        return this,this.resturantService.findAll();
    }

    @Get("getById/:id")
    @UseGuards(JwtAuthGuard)
    async getById(@Param('id') id: string) :Promise<Restaurant>{
        return this.resturantService.findById(id);
    }

    @Get('findByPriceRange')
    @UseGuards(JwtAuthGuard)
    async findByPriceRange(
      @Query('minPrice',ParseIntPipe) minPrice: number,
      @Query('maxPrice',ParseIntPipe) maxPrice: number,
    ): Promise<Restaurant[]> {
      return this.resturantService.findRestaurantsByPriceRange(minPrice, maxPrice);
    }
}
