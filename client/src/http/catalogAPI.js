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
}
