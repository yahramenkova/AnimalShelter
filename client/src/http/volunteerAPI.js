import { $host, $authHost } from "./index";

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

export const getVolunteer = async () => {
  try {
    const { data } = await $authHost.get('api/volunteer/'); 
    const volunteersWithUserData = data.map(volunteer => {
      return {
        ...volunteer,
        user: {
          firstName: volunteer.user.firstName,
          lastName: volunteer.user.lastName
        }
      };
    });
    return volunteersWithUserData;
  } catch (error) {
    console.error('Error while fetching articles:', error);
    throw error;
  }
};