// animalsAPI.js

import { $authHost } from "./index";

// Функция для получения списка животных
export const getAnimals = async () => {
  try {
    // Выполняем запрос к API
    const {data} = await $authHost.get('api/catalog/all');

    // Возвращаем данные (в данном случае, это могут быть записи о животных)
    return data;
  } catch (error) {
    // Обрабатываем ошибку, если запрос не удался
    console.error('Error while fetching animals:', error);
    throw error;
  }
};
