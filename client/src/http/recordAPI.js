import { $authHost } from "./index";

export const createRecord = async (weight, surgical_interventions, vaccinations, chronic_diseases, allergies, animal_id) => {
    try {
      const formData = new FormData();
      formData.append('weight', weight);
      formData.append('surgical_interventions', surgical_interventions);
      formData.append('vaccinations', vaccinations);
      formData.append('chronic_diseases', chronic_diseases);
      formData.append('allergies', allergies);
      formData.append('animal_id', animal_id);
  
      const response = await $authHost.post('api/record', formData);
  
        const newLostAnimal = response.data;
  
        // Return the newly created lost animal (or other relevant information)
        return newLostAnimal;
     
    } catch (error) {
      console.error('Error during lost animal creation:', error);
      throw error;
    }
  };
  
  