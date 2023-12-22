// since this handles api, it can be the entry to services/index
// Having a good folder structure is good to be easy to be able to locate files easily


// Instead of concatenating strings using the + operator, consider using template literals for better readability.

export const API_KEY = "8cac6dec66e09ab439c081b251304443";

//Embedding the API key directly in the URL could be a security risk. and since this is client side, one way is to proxy requests through your server to keep the API key hidden. but quite out this application scope
export const ENDPOINT = "https://api.themoviedb.org/3";
export const ENDPOINT_DISCOVER =
  ENDPOINT + "/discover/movie/?api_key=" + API_KEY + "&sort_by=vote_count.desc";
export const ENDPOINT_SEARCH = ENDPOINT + "/search/movie/?api_key=" + API_KEY;

//Avoid "/" before the query "?" could cause an error or some unexpected response
export const ENDPOINT_MOVIE =
  ENDPOINT + "/movie/507086?api_key=" + API_KEY + "&append_to_response=videos";
