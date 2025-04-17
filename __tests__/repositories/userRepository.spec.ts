import {UserRepository} from '../../repositories/userRepository';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {UserDocument, userModel} from "../../models/user";

dotenv.config();

describe('userRepository', () => {
    let userRepository: UserRepository;

    beforeEach(async () => {
        userRepository = new UserRepository();
        await mongoose.connect(process.env.CONNECTION_STRING);
    });

    describe('getUserByUserName', () => {
        it('should return user', async () => {
            const user = await userRepository.getUserByUserName('asmitty');

            expect(user.password).toEqual('pass1');
            expect(user.firstName).toEqual('Andrew');
            expect(user.lastName).toEqual('Smith');
            expect(user.emailAddress).toEqual('a.s@test.com');
        });
    });

    describe('updateUser', () => {
        beforeEach(async () => {
            await userModel.insertMany([
                {
                    userName: "fsmitty",
                    password: "pass7",
                    firstName: "Fritz",
                    lastName: "Smith",
                    emailAddress: "f.s@test.com"
                } as UserDocument
            ]);
        });

        it('should update the user data', async () => {
            const user = await userRepository.getUserByUserName('fsmitty');
            user.firstName = 'Freddie';

            const updated = await userRepository.updateUser(user.userName, user);

            expect(updated.firstName).toEqual('Freddie');
        });

        afterEach(async () => {
            await userModel.deleteOne({userName: 'fsmitty'});
        });
    });

    describe('getAllUsers', () => {
        it('should have 2 users', async () => {
            const users = await userRepository.getAllUsers();

            expect(users).toHaveLength(2);
            expect(users[0].userName).toEqual('asmitty');
            expect(users[1].userName).toEqual('dmurts');
        });
    });

    describe('getUserByEmailAddress', () => {
        it('should return user', async () => {
            const user = await userRepository.getUserByEmailAddress('d.m@test.com');

            expect(user.firstName).toEqual('Daverick');
            expect(user.lastName).toEqual('Murtle');
        });
    })

    describe('getChatUser', () => {
        it('should return chat user', async () => {
            const user = await userRepository.getChatUser('bsmitty');

            expect(user.password).toEqual('pass3');
            expect(user.firstName).toEqual('Benjamin');
            expect(user.lastName).toEqual('Smith');
            expect(user.emailAddress).toEqual('b.s@test.com');
        });
    });

    describe('addPendingUser', () => {
        it('should add user to database', async () => {
            const user = {
                userName: 'dsmitty',
                password: 'my-pass',
                firstName: 'daniel',
                lastName: 'smith',
                emailAddress: 'd.s@test.com'
            };

            const added = await userRepository.addPendingUser(user);

            expect(added._id).toBeTruthy();
        });

        afterEach(async () => {
            await userRepository.deletePendingUser('dsmitty');
        });
    });

    describe('getAllPendingUsers', () => {
        it('should return all pending users', async () => {
            const users = await userRepository.getAllPendingUsers();

            expect(users).toHaveLength(2);
            expect(users[0].userName).toEqual('csmitty');
            expect(users[1].userName).toEqual('esmitty');
        })
    });

    afterEach(async () => {
        await mongoose.disconnect();
    });
});