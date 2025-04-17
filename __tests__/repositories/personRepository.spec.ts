import {PersonRepository} from '../../repositories/personRepository';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {PersonDocument} from '../../models/person';

dotenv.config();

describe('personRepository', () => {
    let personRepository: PersonRepository;
    let person: PersonDocument;

    beforeEach(async () => {
        personRepository = new PersonRepository();
        await mongoose.connect(process.env.CONNECTION_STRING);
        person = await personRepository.add({name: 'Xander', age: 6, dob: new Date(2014, 11, 22), createdAt: undefined});
    });

    it('should retrieve a person', async () => {
        const xander = await personRepository.get('Xander');

        expect(xander.age).toEqual(6);
        expect(xander.dob).toEqual(new Date(2014, 11, 22));
    });

    afterEach(async () => {
        await personRepository.delete(person._id as string);
        await mongoose.disconnect();
    });
});