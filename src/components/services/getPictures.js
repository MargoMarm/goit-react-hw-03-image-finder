const BASE_URL = 'https://pixabay.com/api/';
const KEY = '35668157-dc7e121b764e10d5e5d6ef031';

const getPictures = searchQuery => {
  return fetch(
    `${BASE_URL}?q=${searchQuery}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};

export default getPictures;
