import {Request, Response, Router} from 'express';
import {PersonRepository} from '../repositories/personRepository';
import {Controller} from "./controller";

export class PersonController implements Controller {
    personRepository: PersonRepository;

    constructor(personRepository?: PersonRepository) {
        this.personRepository = personRepository || new PersonRepository();
    }

    registerRoutes = (router: Router) => {
        router.post('/person', this.createPerson)
        router.delete('/person/:personId', this.deletePerson)
    };

    createPerson = async (req: Request, res: Response) => {
        if (!req.body.records) {
            res.send({success: false});
            return;
        }

        const people = req.body.records;
        const ids = [];
        for (const item of people) {
            const document = await this.personRepository.add({name: item.name, age: item.age, dob: item.dob, createdAt: undefined});
            ids.push(document._id)
        }
        res.send({success: true, ids: ids});
    };

    deletePerson = async (req: Request, res: Response) => {
        const personId = req.params.personId;
        return this.personRepository.delete(personId).then(person => {
            if (person) {
                res.send(person);
            }

            return res.send(null);
        });
    };
}
