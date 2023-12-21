import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RestaurantDocument = Restaurant & Document;

@Schema({ timestamps: true })
export class Restaurant {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [{ name: String, description: String, price: Number }] })
  menu: Array<{ name: string; description: string; price: number }>;

  @Prop({ type: Types.ObjectId, required: true })
  ownerId: Types.ObjectId;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
