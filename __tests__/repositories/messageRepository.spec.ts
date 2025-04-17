import {MessageRepository} from '../../repositories/messageRepository';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {Message, MessageDocument, MessageModel} from '../../models/message';

dotenv.config();

describe('messageRepository', () => {
    let messageRepository: MessageRepository;

    beforeEach(async () => {
        messageRepository = new MessageRepository();
        await mongoose.connect(process.env.CONNECTION_STRING);
    });

    describe('addMessage', () => {
        it('should add new message', async () => {
            const message = await messageRepository.addMessage({messageBody: 'Sup', userId: '123'});
            expect(message._id).toBeTruthy();
        });

        afterEach(async () => {
            await MessageModel.deleteMany({userId: '123'});
        });
    });

    describe('getRecentMessagesByPage', () => {
        beforeEach(async () => {
            let messages = [];
            for (let i = 1; i <= 30; i++) {
                messages.push({
                    messageBody: `Sup ${i}`,
                    userId: i % 2 == 0 ? '123' : '456'
                });
            }
            await MessageModel.insertMany(messages as MessageDocument[]);
        });

        it('should return 25 page 0 messages', async () => {
            const messages = await messageRepository.getRecentMessagesByPage(1000 * 60 * 60, 0);
            expect(messages).toHaveLength(25);
        });

        it('should return 5 page 1 messages', async () => {
            const messages = await messageRepository.getRecentMessagesByPage(1000 * 60 * 60, 1);
            expect(messages).toHaveLength(5);
        });

        afterEach(async () => {
            await MessageModel.deleteMany({userId: '123'});
            await MessageModel.deleteMany({userId: '456'});
        });
    });

    describe('searchByText', () => {
        beforeEach(async () => {
            let messages = [] as Message[];
            for (let i = 0; i < 4; i++) {
                messages.push({
                    messageBody: i % 2 == 0 ? `Sup ${i}` : `Hello ${i}`,
                    userId: '123'
                });
            }
            await MessageModel.insertMany(messages as MessageDocument[]);
        });

        it('should return 2 sup messages', async () => {
            const messages = await messageRepository.searchByText('Sup');
            expect(messages).toHaveLength(2);
        });

        afterEach(async () => {
            await MessageModel.deleteMany({userId: '123'});
        });
    });

    describe('searchByDate', () => {
        beforeEach(async () => {
            let messages = [] as Message[];
            for (let i = 0; i < 10; i++) {
                const day = i % 2 == 0 ? 16 : i + 1;
                messages.push({
                    messageBody: i % 2 == 0 ? `Sup ${i}` : `Hello ${i}`,
                    userId: '123',
                    createdAt: new Date(2018, 3, day, 13, 25, 43, 236)
                });
            }
            await MessageModel.insertMany(messages as MessageDocument[]);
        });

        it('should return 5 messages from searched date', async () => {
            const messages = await messageRepository.searchByDate(new Date(2018, 3, 16), new Date(2018, 3, 17));
            expect(messages).toHaveLength(5);
        });

        afterEach(async () => {
            await MessageModel.deleteMany({userId: '123'});
        });
    });

    afterEach(async () => {
        await mongoose.disconnect();
    });
});