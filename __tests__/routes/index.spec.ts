import {Router} from 'express';
import {Routes} from '../../routes';
import { Server } from 'socket.io';

jest.mock('express');
const MockServer = Server as jest.MockedClass<typeof Server>;

describe('Routes', () => {
    let router: Router;
    let routes: Routes;
    let server: Server;

    beforeAll(async () => {
        server = new MockServer();
    })

    describe('post routes', () => {
        beforeEach(() => {
            router = {
                post: jest.fn(),
                get: jest.fn(),
                delete: jest.fn(),
                put: jest.fn()
            } as any as Router;
            routes = new Routes(server);
        });

        it('should configure /login route', () => {
            routes.configureRoutes(router);
            expect(router.post).toHaveBeenCalledWith('/login', expect.anything());
        });

        it('should configure /chat-login route', () => {
            routes.configureRoutes(router);
            expect(router.post).toHaveBeenCalledWith('/chat-login', expect.anything());
        });

        it('should configure /message route', () => {
            routes.configureRoutes(router);
            expect(router.post).toHaveBeenCalledWith('/message', expect.anything());
        });

        it('should configure /movie route', () => {
            routes.configureRoutes(router);
            expect(router.post).toHaveBeenCalledWith('/movie', expect.anything());
        });

        it('should configure /messages route', () => {
            routes.configureRoutes(router);
            expect(router.post).toHaveBeenCalledWith('/messages', expect.anything());
        });

        it('should configure /check-username route', () => {
            routes.configureRoutes(router);
            expect(router.post).toHaveBeenCalledWith('/check-username', expect.anything());
        });

        it('should configure /check-email route', () => {
            routes.configureRoutes(router);
            expect(router.post).toHaveBeenCalledWith('/check-email', expect.anything());
        });

        it('should configure /create-user route', () => {
            routes.configureRoutes(router);
            expect(router.post).toHaveBeenCalledWith('/create-user', expect.anything());
        });

        it('should configure /person route', () => {
            routes.configureRoutes(router);
            expect(router.post).toHaveBeenCalledWith('/person', expect.anything());
        });

        it('should configure /ping route', () => {
            routes.configureRoutes(router);
            expect(router.post).toHaveBeenCalledWith('/ping', expect.anything());
        });
    });

    describe('put routes', () => {
       beforeEach(() => {
           router = {
               post: jest.fn(),
               get: jest.fn(),
               delete: jest.fn(),
               put: jest.fn()
           } as any as Router;
           routes = new Routes(server);
       });

        it('should configure /movie route', () => {
            routes.configureRoutes(router);
            expect(router.put).toHaveBeenCalledWith('/movie', expect.anything());
        });
    });

    describe('delete routes', () => {
       beforeEach(() => {
           router = {
               post: jest.fn(),
               get: jest.fn(),
               delete: jest.fn(),
               put: jest.fn()
           } as any as Router;
           routes = new Routes(server);
       });

        it('should configure /person/:personId route', () => {
            routes.configureRoutes(router);
            expect(router.delete).toHaveBeenCalledWith('/person/:personId', expect.anything());
        });

        it('should configure /movie/:userId/:imdbid route', () => {
            routes.configureRoutes(router);
            expect(router.delete).toHaveBeenCalledWith('/movie/:userId/:imdbid', expect.anything());
        });
    });

    describe('get routes', () => {
        beforeEach(() => {
            router = {
                post: jest.fn(),
                get: jest.fn(),
                delete: jest.fn(),
                put: jest.fn()
            } as any as Router;
            routes = new Routes(server);
        });

        it('should configure /messages route', () => {
            routes.configureRoutes(router);
            expect(router.get).toHaveBeenCalledWith('/messages', expect.anything());
        });

        it('should configure /users route', () => {
            routes.configureRoutes(router);
            expect(router.get).toHaveBeenCalledWith('/users', expect.anything());
        });

        it('should configure /categories route', () => {
            routes.configureRoutes(router);
            expect(router.get).toHaveBeenCalledWith('/categories', expect.anything());
        });

        it('should configure /new-movie route', () => {
            routes.configureRoutes(router);
            expect(router.get).toHaveBeenCalledWith('/new-movie', expect.anything());
        });

        it('should configure /movies/:userId route', () => {
            routes.configureRoutes(router);
            expect(router.get).toHaveBeenCalledWith('/movies/:userId', expect.anything());
        });

        it('should configure /movie-details/:onlineId route', () => {
            routes.configureRoutes(router);
            expect(router.get).toHaveBeenCalledWith('/movie-details/:onlineId', expect.anything());
        });

        it('should configure /movie-search/:title/:page route', () => {
            routes.configureRoutes(router);
            expect(router.get).toHaveBeenCalledWith('/movie-search/:title/:page', expect.anything());
        });

        it('should configure /movie-formats route', () => {
            routes.configureRoutes(router);
            expect(router.get).toHaveBeenCalledWith('/movie-formats', expect.anything());
        });

        // it('should configure /conversations/:userId route', () => {
        //     routes.configureRoutes(router);
        //     expect(router.get).toHaveBeenCalledWith('/conversations/:userId', expect.anything());
        // });

        it('should configure /user/:userId route', () => {
            routes.configureRoutes(router);
            expect(router.get).toHaveBeenCalledWith('/user/:userId', expect.anything());
        });

        // it('should configure /conversation/:conversationId route', () => {
        //     routes.configureRoutes(router);
        //     expect(router.get).toHaveBeenCalledWith('/conversation/:conversationId', expect.anything());
        // });
        //
        // it('should configure /conversation/messages/:conversationId route', () => {
        //     routes.configureRoutes(router);
        //     expect(router.get).toHaveBeenCalledWith('/conversation/messages/:conversationId', expect.anything());
        // });

        it('should configure /movie/:userId/:imdbid route', () => {
            routes.configureRoutes(router);
            expect(router.get).toHaveBeenCalledWith('/movie/:userId/:imdbid', expect.anything());
        });
    });
});