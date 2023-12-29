import { API_KEY, ENDPOINT } from '../apiHandler';

export const ENDPOINT_DISCOVER = (page) => `${ENDPOINT}/discover/movie?api_key=${API_KEY}&sort_by=vote_count.desc&page=${page}`;
export const ENDPOINT_SEARCH = (query) => `${ENDPOINT}/search/movie?api_key=${API_KEY}&query=${query}`;
export const ENDPOINT_MOVIE = (id) => `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;