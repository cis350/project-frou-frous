/**
* @jest-environment jsdom
*/
import { validateLogin } from '../api/loginRegisterAPI';

jest.mock('../api/loginRegisterAPI');

validateLogin.mockResolvedValue({
  id: 'e',
  password: 'e',
  email: 'e',
  firstName: 'e',
  lastName: 'e',
});

test('renders userLinks', async () => {
  function callback(resp) {
    expect(resp.firstName).toBe('e');
  }
  validateLogin('e', callback);
});
