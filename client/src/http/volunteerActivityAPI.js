import { $authHost } from "./index";

// Функция для получения списка статей
export const getActivity = async () => {
  try {
    const { data } = await $authHost.get('api/volunteerActivity'); 
    return data;
  } catch (error) {
    console.error('Error while fetching articles:', error);
    throw error;
  }
};
