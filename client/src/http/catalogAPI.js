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

export const getAnimalById = async (animalId) => {
  try {
    const response = await $authHost.get(`api/catalog/` + animalId);
    return response.data; 
  } catch (error) {
    console.error('Error while fetching animal data by ID:', error);
    throw error;
  }
};

