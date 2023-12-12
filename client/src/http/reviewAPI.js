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


 export const addReview = async ({ rating, comment }) => {
  if (!rating || !comment) {
    throw new Error('Rating and comment are required');
  }

  const ratingValue = parseInt(rating, 10);
  const userValue = parseInt(localStorage.getItem('userId'), 10);

  const requestBody = {
    rating: ratingValue,
    comment,
    user_id: userValue, // Use the user ID from the token
  };

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json', // Set the content type to JSON
    },
  };

  // Отправить запрос
  console.log('Sending request:', requestOptions);
  const response = await $authHost.post('api/review/add', requestOptions);

  // Обработать ответ
  console.log('Response received:', response);
  if (response.ok) {
    // Успех
  } else {
    // Произошла ошибка
  }
};

export const createReview = async (rating, comment) => {
  try {
    const userValue = parseInt(localStorage.getItem('userId'), 10);
    const formData = new FormData();
    formData.append("user_id", userValue);
    formData.append("rating", rating);
    formData.append("comment", comment);

    const response = await $authHost.post('api/review/add', formData);

    if (response.status === 201) {
      const newReview = response.data;

      // Вернуть новый отзыв (или другую нужную информацию)
      return newReview;
    } else {
      throw new Error('Error creating review');
    }
  } catch (error) {
    console.error('Error during review creation:', error);
    throw error;
  }
};
