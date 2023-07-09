import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UsersDocument = Users & Document;

@Schema()
export class Users{
    @Prop()
    email:string;
    @Prop()
    password:string;
    @Prop()
    phone:Number;
    @Prop()
    id:string;
    @Prop({ type: Object })
    temp_secret:any;
}

export const UsersSchema = SchemaFactory.createForClass(Users);