import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  // id: number;

  @Prop({ required: true }) //* Con required:true indico que el campo es obligatorio
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Number })
  stock: number;

  @Prop()
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
