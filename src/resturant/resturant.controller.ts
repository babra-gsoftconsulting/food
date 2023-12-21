import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
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
    @Roles([RoleEnum.Admin])
    @UseGuards(JwtAuthGuard, RolesGuard)
    async createResturant(@Body(ValidationPipe) createResturant: CreateRestaurantDto, @Req() request:Request): Promise<Restaurant>{
        try {
          console.log(request)
            return
            
        } catch (error) {
            
        }
       
    }
}
