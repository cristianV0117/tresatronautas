import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class ProductModel {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: Types.ObjectId, ref: 'UserModel', required: true })
  owner: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;
}

export type ProductDocument = ProductModel &
  Document & {
    createdAt: Date;
    updatedAt: Date;
  };

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
