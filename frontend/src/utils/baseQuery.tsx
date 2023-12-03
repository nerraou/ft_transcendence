export class RequestError extends Error {
  public response;
  constructor(response: Response) {
    super();
    this.response = response;
  }
}

async function baseQuery(input: RequestInfo | URL, init?: RequestInit) {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw new RequestError(response);
  }
  return response;
}

export default baseQuery;
