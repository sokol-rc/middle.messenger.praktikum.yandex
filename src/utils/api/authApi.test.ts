import mock from 'xhr-mock';
import AuthApi, { BASE_URL } from './auth-api';

describe('utils/api/authApi', () => {
    beforeEach(() => mock.setup());
    afterEach(() => mock.teardown());

    it('should get success from logout request', async () => {
        mock.post(`${BASE_URL}auth/logout`, {
            status: 201,
            reason: 'Logout',
            body: 'OK',
        });
        const response = await AuthApi.logout();

        expect(response.status).toBe(201);
        expect(response.data).toBe('OK');
    });

    it('should send loginData as json when signin', async () => {
        mock.post(`${BASE_URL}auth/signin`, (req, res) => {
            expect(req.header('Content-Type')).toEqual('application/json');
            expect(req.body()).toEqual(
                '{"login":"user","password":"password"}'
            );
            return res.status(200).body('OK');
        });
        const mockLoginData = {
            login: 'user',
            password: 'password',
        };
        await AuthApi.signin({ data: mockLoginData });
    });

    it('should send registrationData as json when signup', async () => {
        mock.post(`${BASE_URL}auth/signup`, (req, res) => {
            expect(req.header('Content-Type')).toEqual('application/json');
            expect(req.body()).toEqual(
                '{"login":"user","password":"password","username":"sokol-rc"}'
            );
            return res.status(200).body('OK');
        });
        const mockRegistrationData = {
            login: 'user',
            password: 'password',
            username: 'sokol-rc',
        };
        await AuthApi.signup({ data: mockRegistrationData });
    });

    it('should resolve data from user request', async () => {
        mock.get(`${BASE_URL}auth/user`, {
            status: 201,
            reason: 'response',
            body: '{"data":{"user_id":"123123","user_name":"sokol-rc"}}',
        });

        const response = await AuthApi.user();
        expect(response.status).toBe(201);
        expect(response.data).toBe(
            '{"data":{"user_id":"123123","user_name":"sokol-rc"}}'
        );
    });
});
