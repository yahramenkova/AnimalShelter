import { $authHost } from "./index";

export const getAllReviews = async () => {
  try {
   const { data } = await $authHost.get('api/review/all'); 
   const reviewsWithUserData = data.map(review => {
     return {
       ...review,
       user: {
         firstName: review.user.firstName,
         lastName: review.user.lastName,
         photo: review.user.photo
       }
     };
   });
   return reviewsWithUserData;
  } catch (error) {
   console.error('Error while fetching reviews:', error);
   throw error;
  }
 };
 
