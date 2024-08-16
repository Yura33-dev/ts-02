import axios from 'axios';
import { transformData } from '../helpers/helpers';
import { ITransformedData } from '../types/commonTypes';

const base = 'https://api.unsplash.com';
const access_key = '0KsMGFt0glX__wUvR5qj72GII6fszLIqkFwt9VmU3Ys';

interface IResponseData {
  data: {
    results: object[];
    total: number;
    total_pages: number;
  };
  status: number;
  statusText: string;
  headers: object;
  config: object;
  request: object;
}

export async function fetchPhotos(
  searchString: string,
  page: number
): Promise<ITransformedData[]> {
  const response: IResponseData = await axios.get(`${base}/search/photos`, {
    params: {
      client_id: access_key,
      page,
      per_page: 12,
      query: searchString.toLowerCase(),
    },
  });
  return transformData(response.data.results);
}
