import { queryStringify } from './httptransport';

describe('utils/api/httptransport', () => {
    it('should change object to string', () => {
        const answer = queryStringify({ param1: 'bla', param2: 'fla' });
        expect(answer).toBe('?param1=bla&param2=fla');
    });
});
