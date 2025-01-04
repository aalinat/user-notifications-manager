import 'reflect-metadata';
import {CreateUserPreferencesRequest} from "../../src/bl/dto/CreateUserPreferencesRequest";
import {createApp} from "../../src/app";
import {AUTHENTICATION_TOKEN} from "../../src/config/config";
import {Constants, HappyRequest} from "./Constants";

const request = require('supertest');

const app = createApp();
const api = request(app);
describe('UserPreferencesController Integration Tests', () => {

    it('Create User Preferences', async () => {
        const response = await api.post('/api/preferences').set('Authorization', `Bearer ${AUTHENTICATION_TOKEN}`).send(HappyRequest);
        expect(response.status).toBe(201);
        expect(response.body.status).toBe('success');
        expect(response.body.message).toBe('User preferences created successfully');
    });

    it('Create User Preferences: Authentication Fail', async () => {
        const response = await api.post('/api/preferences').send(HappyRequest);
        expect(response.status).toBe(401);
        expect(response.body.status).toBe('error');
    });

    it('Create User Preferences: Missing Email', async () => {
        const payload: CreateUserPreferencesRequest = {
            email: '',
            telephone: Constants.TELEPHONE,
            preferences: Constants.PREFERENCES
        };
        const response = await api.post('/api/preferences').set('Authorization', `Bearer ${AUTHENTICATION_TOKEN}`).send(payload);
        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
    });
});