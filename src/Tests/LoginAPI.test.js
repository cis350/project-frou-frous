/**
* @jest-environment jsdom
*/
import { validateLogin } from "../api/loginRegisterAPI";

test('renders userLinks', async () => {
    function callback(resp) {
        expect(resp.status).toBe(200);
    }
    validateLogin("e", callback);
});
