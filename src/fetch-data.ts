import { FetchError, Response } from 'node-fetch';

const fetch = require('node-fetch');

export default function fetchData(url: string, timeoutMs = 5000): Promise<Response> {
  const retryLimit: number = 5;

  return new Promise((resolve, reject) => {
    const fetchFn = (numberTry = 0): Promise<any> =>
      fetch(url)
        .then((response: Response) => resolve(response))
        .catch((error: FetchError) => numberTry >= retryLimit ? reject(error) : fetchFn(numberTry + 1))
        .finally(() => clearInterval(timeoutTimer));

    const timeoutTimer = setTimeout(() => reject(new Error('Timeout error')), timeoutMs);
    return fetchFn();
  })
}