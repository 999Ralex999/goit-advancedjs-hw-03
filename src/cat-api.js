import axios from 'axios';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';
axios.defaults.headers.common['x-api-key'] =
  'live_VE2bk5LyaEOmI2geI8XTrjXTwFmvbmlNitWjPhHNnfZGLbbUEGQQwmpBo4VWreYx';

async function fetchBreeds() {
  const { data } = await axios.get('breeds');
  return data;
}

async function fetchCatByBreed(breedId) {
  const { data } = await axios.get('images/search', {
    params: { breed_ids: breedId },
  });
  return data;
}

export { fetchBreeds, fetchCatByBreed };
