// API modules are where the code lives to communicate
// with the server via AJAX

import sendRequest from "./send-request";

const BASE_URL = '/api/users';

export async function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData)
}

export async function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials)
}

// get user data to display on profile page
export async function getUser() {
  return sendRequest(`${BASE_URL}/profile`);
}

export async function updateUserProfile(updatedUserData) {
  return sendRequest(`${BASE_URL}/profile`, 'PUT', updatedUserData);
}

export async function deleteUser() {
  return sendRequest(BASE_URL, 'DELETE');
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}