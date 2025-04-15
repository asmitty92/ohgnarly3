import {Router} from "express";

export interface Controller {
    registerRoutes(router: Router): void;
}