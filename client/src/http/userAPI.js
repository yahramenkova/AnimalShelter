import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (firstName, lastName, email, password, photo) => {
  try {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("photo", photo);

    const response = await $host.post('api/user/registration', formData);

    if (response.data && response.data.token) {
      const token = response.data.token;

      // Сохранить токен в локальном хранилище
      localStorage.setItem('token', token);
      return token;
    } else {
      throw new Error('Token not found in server response');
    }
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  const {data} = await $host.post('api/user/login', {email, password})
  localStorage.setItem('token', data.token)
  return jwtDecode(data.token)
}

export const check = async () => {
  const {data} = await $authHost.get('api/user/auth')
  localStorage.setItem('token', data.token)
  return jwtDecode(data.token)
}
