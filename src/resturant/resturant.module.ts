import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from './models/resturant.model';
import { ResturantController } from './resturant.controller';
import { ResturantService } from './resturant.service';

@Module({
    imports:[
        MongooseModule.forFeature([{name: Restaurant.name, schema: RestaurantSchema }]),
    ],
    controllers: [ResturantController],
    providers: [ResturantService],
})
export class ResturantModule {}
