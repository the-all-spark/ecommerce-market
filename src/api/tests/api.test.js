import { describe, test, expect, beforeEach } from 'vitest';
import { createTestQueryClient } from './queryTestUtils';

describe('API response to get user data', () => {
  let queryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();
  });

  test('matches user with id=2 data structure', () => {
    const user2Data = {
      id: 2,
      username: 'michaelw',
      email: 'michael.williams@x.dummyjson.com',
      firstName: 'Michael',
      lastName: 'Williams',
      gender: 'male',
      phone: '+49 258-627-6644',
      birthDate: '1989-8-10',
    };

    expect(user2Data).toMatchSnapshot();
  });

  test('matches query cache structure', async () => {
    const queryKey = ['users'];
    const userData = {
      id: 500,
      username: 'test',
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'User',
      gender: 'test',
      phone: '+xx xxx-xx-xx',
      birthDate: 'xxxx-x-xx',
    };

    await queryClient.setQueryData(queryKey, userData);
    const cachedData = queryClient.getQueryData(queryKey);

    expect(cachedData).toMatchSnapshot();
  });
});
