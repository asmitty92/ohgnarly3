import {CategoryRepository} from '../../repositories/categoryRepository';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

describe('categoryRepository', () => {
    describe('getCategories', () => {
        let categoryRepository: CategoryRepository;
        beforeEach(async () => {
            categoryRepository = new CategoryRepository();
            await mongoose.connect(process.env.CONNECTION_STRING);
        });

        it('should return categories', async () => {
            const categories = await categoryRepository.getAll();

            expect(categories).toHaveLength(3);
            expect(categories[0].categoryDesc).toEqual('Movies');
            expect(categories[1].categoryDesc).toEqual('Music');
            expect(categories[2].categoryDesc).toEqual('Games');
        });

        afterEach(async () => {
            await mongoose.disconnect();
        });
    });
});