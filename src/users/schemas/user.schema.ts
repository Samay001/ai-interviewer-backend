import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { InterviewSchedule } from '.././../interview-schedule/schemas/interview-schedule.schema'; // adjust path as needed

export type UserDocument = User & Document;

export enum UserRole {
  ADMIN = 'admin',
  APPLICANT = 'applicant',
}

// Interface for type safety
export interface IUser {
  _id?: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  phoneNumber: string;
  interviews?: Types.ObjectId[] | InterviewSchedule[];
  createdAt?: Date;
  updatedAt?: Date;
}

@Schema({ timestamps: true })
export class User implements IUser {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: UserRole })
  role: UserRole;

  @Prop({ required: true })
  phoneNumber: string;

  // ✅ Ref to InterviewSchedule
  @Prop({
    type: [{ type: Types.ObjectId, ref: 'InterviewSchedule' }],
    default: [],
  })
  interviews: Types.ObjectId[]; // or InterviewSchedule[] if you're populating
}

export const UserSchema = SchemaFactory.createForClass(User);
