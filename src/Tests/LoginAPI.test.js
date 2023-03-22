/**
* @jest-environment jsdom
*/
import { validateLogin } from "../api/loginRegisterAPI";
jest.mock('node-fetch');

test('renders userLinks', async () => {
    function callback(resp) {
        expect(resp.firstName).toBe('e');
    }
    validateLogin("e", callback);
});
