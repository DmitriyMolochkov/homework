import { FetchError, Response } from 'node-fetch';

import fetchData from '../src/fetch-data';

describe('check fetchData', () => {
  test('It should throw "Timeout error"', async () => {
    const delay = 5000;
    await expect(fetchData(`https://app.requestly.io/delay/${delay}/https://google.com`, delay))
      .rejects
      .toThrow('Timeout error');
  }, 10000);


  test('It should throw "ECONNREFUSED"', async () => {
    await expect(fetchData(`http://0.0.0.0:1000`))
      .rejects
      .toThrow('ECONNREFUSED');
  });

  test('It should return response', async () => {
    await expect(fetchData(`https://google.com`))
      .resolves
      .toBeInstanceOf(Response);
  });
})
