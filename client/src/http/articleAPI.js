import { $authHost } from "./index";

// Функция для получения списка статей
export const getArticles = async () => {
  try {
    const { data } = await $authHost.get('api/education/all'); 
    return data;
  } catch (error) {
    console.error('Error while fetching articles:', error);
    throw error;
  }
};
