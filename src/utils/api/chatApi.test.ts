import mock from 'xhr-mock';
import { BASE_URL } from './auth-api';
import ChatApi from './chatApi';

describe('utils/api/chatApi', () => {
    beforeEach(() => mock.setup());
    afterEach(() => mock.teardown());

    it('should get chat data from getChats request', async () => {
        mock.get(`${BASE_URL}chats?limit=10`, {
            status: 201,
            reason: 'received',
            body: 'OK',
        });
        const response = await ChatApi.getChats({ data: { limit: '10' } });

        expect(response.status).toBe(201);
        expect(response.data).toBe('OK');
    });

    it('Should get a ready url string from the object', async () => {
        mock.get(
            /(https:\/\/ya-praktikum\.tech\/api\/v2\/)\S{3,}/gm,
            (req, res) => {
                expect(req.url().toString()).toBe(`${BASE_URL}chats?limit=15`);
                expect(req.header('Content-Type')).toEqual('application/json');
                return res.status(201).body('OK');
            }
        );

        await ChatApi.getChats({ data: { limit: '15' } });
    });

    it('should get succes when deleteChat request', async () => {
        mock.delete(`${BASE_URL}chats`, (req, res) => {
            expect(req.header('Content-Type')).toEqual('application/json');
            expect(req.body()).toEqual('{"chatId":"11"}');
            return res.status(201).body('OK');
        });
        const response = await ChatApi.deleteChat({
            data: { chatId: '11' },
        });

        expect(response.status).toBe(201);
        expect(response.data).toBe('OK');
    });
});
