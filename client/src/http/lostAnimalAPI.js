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

export const createLostAnimal = async (species, breed, location, dateLost, img) => {
  try {
    const formData = new FormData();
    formData.append('species', species);
    formData.append('breed', breed);
    formData.append('location', location);
    formData.append('date_lost', dateLost);
    formData.append('img', img);

    const response = await $authHost.post('api/lostAnimal/add', formData);

      const newLostAnimal = response.data;

      // Return the newly created lost animal (or other relevant information)
      return newLostAnimal;
   
  } catch (error) {
    console.error('Error during lost animal creation:', error);
    throw error;
  }
};

