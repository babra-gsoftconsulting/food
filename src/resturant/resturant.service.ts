import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './models/resturant.model';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class ResturantService {
    constructor(
        @InjectModel(Restaurant.name) private readonly resturantModel: Model<Restaurant>
    ) { }

    async createResturant(resturantData: Restaurant): Promise<any> {
        return await new this.resturantModel(resturantData).save();
    }

    async findAll(): Promise<Restaurant[]> {
        const restaurants = await this.resturantModel.find();
        if (!restaurants) {
            throw new NotFoundException("No record Found");
        }
        return restaurants;

    }

    async findById(id: string): Promise<Restaurant> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new NotFoundException('Invalid ID');
        }
        const result = await this.resturantModel.findById(id);
        if (!result) {
            throw new NotFoundException("No record Found");
        }
        return result;
    }

    async findRestaurantsByPriceRange(minPrice: number, maxPrice: number): Promise<Restaurant[]> {
        const restaurants = await this.resturantModel.find({
            'menu.price': { $gte: minPrice, $lte: maxPrice },
        });

        if (!restaurants || restaurants.length === 0) {
            throw new NotFoundException('No restaurants found in the specified price range');
        }

        return restaurants;
    }
}
