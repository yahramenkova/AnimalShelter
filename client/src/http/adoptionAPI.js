import { $authHost } from "./index";

export const createAdoptionRequest = async (animalId, phone, comment) => {
    try {
      const userValue = parseInt(localStorage.getItem('userId'), 10);
      const formData = new FormData();
      console.log('Animal ID:', animalId); // Логируем animalId
      console.log('Phone:', phone); // Логируем phone
      console.log('Comment:', comment); // Логируем comment
      formData.append("user_id", userValue);
      formData.append('animal_id', animalId);
      formData.append('phone', phone);
      formData.append('comment', comment);
  
      const response = await $authHost.post('api/adoption', formData);
  
      if (response.status === 200) {
        const newRequest = response.data;
        return newRequest;
      } else {
        throw new Error('Ошибка при отправке заявки');
      }
    } catch (error) {
      console.error('Ошибка при создании заявки на усыновление:', error);
      throw error;
    }
  };

  export const getAdoptionRequests = async () => {
    try {
      const response = await $authHost.get('api/adoption/all'); // Или путь, который соответствует вашему API
      if (response.status === 200) {
        return response.data; // Возвращаем данные заявок
      } else {
        throw new Error('Ошибка при получении заявок на усыновление');
      }
    } catch (error) {
      console.error('Ошибка при получении заявок на усыновление:', error);
      throw error;
    }
  };
  
  export const updateAdoptionStatus = async (adoptionId, newStatus) => {
    try {
      const response = await $authHost.put('api/adoption/status', {
        adoption_id: adoptionId,
        status: newStatus
      });
  
      if (response.status === 200) {
        return response.data; // Обновлённая заявка
      } else {
        throw new Error('Error when updating the status');
      }
    } catch (error) {
      console.error('Ошибка при обновлении статуса заявки:', error);
      throw error;
    }
  };
  
  