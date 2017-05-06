import { AuthService } from '../auth.service';

const EXISTING_USER = 'ExistingUser';
const usersService = {
  getUserByName: async n => n === EXISTING_USER ? n : null
};
let authService: AuthService;

beforeEach(() => {
  authService = new AuthService(usersService);
});

it('should create instance', () => {
  expect(authService).toBeInstanceOf(AuthService);
});

describe('authorize', () => {
  it('should be an async function', () => {
    expect(authService.authorize()).toBeInstanceOf(Promise);
  });

  it('should return user if authorized', async () => {
    const result = await authService.authorize(EXISTING_USER);
    expect(result).toBe(EXISTING_USER);
  });

  it('should return null if user not authorized', async () => {
    const result = await authService.authorize('NonExistingUser');
    expect(result).toBeNull();
  });
});

describe('hasPrivileges', () => {
  it('should be a function', () => {
    expect(authService.hasPrivileges).toBeInstanceOf(Function);
  });

  it('should return true if user has privileges', () => {
    // Given
    const user = { roles: ['foo', 'bar']};
    [
      [],
      ['foo'],
      ['foo', 'bar']
    ].forEach(requiredRoles => {
      // When
      const result = authService.hasPrivileges(user, requiredRoles);
      // Then
      expect(result).toBe(true);
    });
  });

  it('should return false if user has not privileges', () => {
    // Given
    const user = { roles: ['foo', 'bar']};
    [
      ['baz'],
      ['foo', 'baz'],
      ['foo', 'bar', 'baz']
    ].forEach(requiredRoles => {
      // When
      const result = authService.hasPrivileges(user, requiredRoles);
      // Then
      expect(result).toBe(false);
    });
  });
})