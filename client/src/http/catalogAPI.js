import { $authHost } from "./index";

// Функция для получения списка животных
export const getAnimals = async () => {
  try {
    const {data} = await $authHost.get('api/catalog/all');
    return data;
  } catch (error) {
    console.error('Error while fetching animals:', error);
    throw error;
  }
};

export const getAllCats = async () => {
  try {
    const {data} = await $authHost.get('api/catalog/animal/cat');
    return data;
  } catch (error) {
    console.error('Error while fetching animals:', error);
    throw error;
  }
};

export const getAllDogs = async () => {
  try {
    const {data} = await $authHost.get('api/catalog/animal/dog');
    return data;
  } catch (error) {
    console.error('Error while fetching animals:', error);
    throw error;
  }
};

export const getAnimalById = async (animalId) => {
  try {
    const response = await $authHost.get(`api/catalog/` + animalId);
    return response.data; 
  } catch (error) {
    console.error('Error while fetching animal data by ID:', error);
    throw error;
  }
};

export const markAnimalAsSold = async (animal)  => {
  try {
    const response = await $authHost.put('api/catalog/buy', {
      animal_id: animal,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ animal_id: animal }),
    });
    const data = response.data;
    console.log(data.message);
  } catch (error) {
    console.error(error);
  }
};

export const createNewAnimal = async (name, species, age, breed, colour, notes, price, img) => {
  try {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('species', species);
    formData.append('age', age);
    formData.append('breed', breed);
    formData.append('colour', colour);
    formData.append('notes', notes);
    formData.append('price', price);
    formData.append('img', img);

    // Send the form data to the server to create the animal
    const response = await $authHost.post('api/catalog/', formData);

    return response.data;
  } catch (error) {
    console.error('Error during animal creation:', error);
    throw error;
  }
};
