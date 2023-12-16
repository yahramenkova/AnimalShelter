import { $host } from "./index";

export const registerVolunteer = async (volunteerData) => {
  try {
    const response = await $host.post('/api/volunteer/add', volunteerData);
    console.log(volunteerData);
    if (response.status === 201) {
      const newVolunteer = response.data;
      return newVolunteer;
    } else {
      throw new Error('Ошибка при создании волонтера');
    }
  } catch (error) {
    console.error('Ошибка при создании волонтера:', error);
    throw error;
  }
};