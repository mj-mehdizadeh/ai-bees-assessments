import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Schema as MongooseSchema } from 'mongoose';
import { toJSON } from '../../common/lib/schema';

export type CategoriesDocument = Categories & Document;

@Schema({
  timestamps: true,
  collection: 'categories',
  toJSON,
})
export class Categories {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  parent: ObjectId;

  @Prop()
  name: string;

  @Prop()
  discount: number;
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);
