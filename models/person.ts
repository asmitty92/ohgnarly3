/**
 * Created by asmitty on 9/18/19.
 */
import mongoose, {Schema, Document} from 'mongoose';

const personSchema = new Schema<PersonDocument>({
    name: String,
    age: Number,
    dob: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export interface Person {
    name: string;
    age: number;
    dob: Date;
    createdAt: Date;
}

export interface PersonDocument extends Person, Document {}

export const PersonModel = mongoose.model("Person", personSchema, "People");