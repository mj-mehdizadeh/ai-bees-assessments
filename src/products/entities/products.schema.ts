import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';
import { toJSON } from '../../common/lib/schema';

export type ProductsDocument = Products & Document;

@Schema({
  timestamps: true,
  collection: 'products',
  toJSON,
})
export class Products {
  @Prop({ unique: true })
  productId: number;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  categoryId: ObjectId & string;

  @Prop()
  name: string;

  @Prop()
  discount: number;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
