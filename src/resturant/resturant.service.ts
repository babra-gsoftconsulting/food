import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './models/resturant.model';
import { Model } from 'mongoose';

@Injectable()
export class ResturantService {
    constructor(
        @InjectModel(Restaurant.name) private readonly resturantModel:Model <Restaurant>
    ){}

    async createResturant(resturantData: Restaurant):Promise<any>{
        return await new this.resturantModel(resturantData).save();
    }
}
