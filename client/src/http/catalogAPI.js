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
