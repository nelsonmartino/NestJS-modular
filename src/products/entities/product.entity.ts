import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Brand } from './brand.entity';

@Schema()
export class Product extends Document {
  // id: number;

  @Prop({ required: true }) //* Con required:true indico que el campo es obligatorio
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Number, index: true }) //* Para indexar este campo en la base de datos y permitir búsquedas más rápidas (lo prioriza frente a los demás campos)
  price: number;

  @Prop({ type: Number })
  stock: number;

  @Prop()
  image: string;

  // //* Creación de relación 1:1 embebida (un documento dentro de otro documento)
  @Prop(
    raw({
      name: { type: String },
      image: { type: String },
    }),
  )
  category: Record<string, any>;

  //* Creación de una relación 1:1 referencial (un documento internamente hace referencia a otro)
  @Prop({ type: Types.ObjectId, ref: Brand.name })
  brand: Brand | Types.ObjectId; //* Puede ser tanto un objeto como un string con formato de id
}

export const ProductSchema = SchemaFactory.createForClass(Product);

//*Para hacer una indexación compuesta de dos campos (en este caso indexa precio en forma ascendente, y stock en forma descendente)
ProductSchema.index({ price: 1, stock: -1 });
