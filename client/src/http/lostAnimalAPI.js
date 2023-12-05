import { $authHost } from "./index";

// Функция для получения списка статей
export const getLostAnimal = async () => {
  try {
    const { data } = await $authHost.get('api//lostAnimal'); 
    return data;
  } catch (error) {
    console.error('Error while fetching articles:', error);
    throw error;
  }
};
