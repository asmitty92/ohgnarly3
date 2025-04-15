/**
 * Created by asmitty on 3/16/17.
 */
import {Document, Schema} from 'mongoose';



export const categorySchema = new Schema({
    categoryDesc: String,
    createdAt: {type: Date, default: Date.now}
});

interface Category {
    categoryDesc: string;
    createdAt: Date;
}

export interface CategoryDocument extends Category, Document {}