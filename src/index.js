import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SlimSelect from 'slim-select';

const selector = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

async function handleBreeds() {
  try {
    selector.style.display = 'none';
    loader.style.display = 'block';
    const breeds = await fetchBreeds();
    selector.style.display = 'flex';
    initSelect(breeds);
  } catch (error) {
    iziToast.error({
      message: 'Oops! Something went wrong! Try reloading the page!',
      position: 'topRight',
    });
  } finally {
    loader.style.display = 'none';
  }
}

function initSelect(breeds) {
  new SlimSelect({
    select: selector,
    data: breeds.map(breed => ({ text: breed.name, value: breed.id })),
  });
  selector.addEventListener('change', async e => {
    catInfo.innerHTML = '';
    loader.style.display = 'block';
    try {
      const selectedBreed = e.target.value;
      const catData = await fetchCatByBreed(selectedBreed);
      if (!catData || catData.length === 0) {
        throw new Error('Please, select another breed!');
      }
      displayCatInfo(catData[0]);
    } catch (error) {
      iziToast.error({
        message: error.message || 'Failed to load cat image. Please try again.',
        position: 'topRight',
      });
    } finally {
      loader.style.display = 'none';
    }
  });
}

function displayCatInfo(cat) {
  if (!cat) return;
  const markup = `
    <img src="${cat.url}" alt="Cute cat" width="300px">
    <div>
      <h2>${cat.breeds[0].name}</h2>
      <p>${cat.breeds[0].description}</p>
    </div>
  `;
  catInfo.innerHTML = markup;
}

handleBreeds();
