import { clientsSelector } from '../Clients.selector';

test('clientsSelector', () => {
  const state = {
    client: {
      data: 123,
    },
  };

  expect(clientsSelector(state)).toBe(123);
});
