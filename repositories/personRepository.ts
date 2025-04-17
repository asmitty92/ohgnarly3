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
        return await PersonModel.deleteOne({personId: personId}).exec() as unknown as PersonDocument;
    }
}