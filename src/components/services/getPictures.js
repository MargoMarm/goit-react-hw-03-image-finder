const BASE_URL = 'https://pixabay.com/api/';
const KEY = '35668157-dc7e121b764e10d5e5d6ef031';

export const getPictures = searchQuery => {
  fetch(
    `${BASE_URL}?q=${searchQuery}&page=1&key=y${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  )
    .then(responsde => responsde.json)
    .then(data => console.log(data));
};
