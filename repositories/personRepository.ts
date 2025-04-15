import {PersonModel, PersonDocument, Person} from '../models/person';

export class PersonRepository {
    add = async (person: Person) => {
        const personModel = new PersonModel(person);
        return await personModel.save() as any as PersonDocument;
    }

    get = async (name: string) => {
        const person = await PersonModel.findOne({name: name}).exec();
        return person as any as PersonDocument;
    }

    delete = async (personId: string) => {
        const person = await PersonModel.findById(personId).exec();
        return await person.remove() as any as PersonDocument;
    }
}