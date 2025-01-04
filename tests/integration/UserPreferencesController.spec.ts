import 'reflect-metadata';
const request = require('supertest');
import {CreateUserPreferencesDTO} from "../../src/bl/dto/CreateUserPreferencesDTO";
import {createApp} from "../../src/app";

const app = createApp();
const api = request(app);
describe('UserPreferencesController Integration Tests', () => {

    it('Create User Preferences', async () => {
        const payload: CreateUserPreferencesDTO = {
            email: 'user@example.com',
            telephone: '+123456786',
            preferences: { sms: true, email: true}
        };
        const response = await api.post('/api/preferences').send(payload);
        expect(response.status).toBe(201);
        expect(response.body.status).toBe('success');
        expect(response.body.message).toBe('User preferences created successfully');
    });

});