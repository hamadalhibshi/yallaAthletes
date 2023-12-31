import sendRequest from "./send-request";

const BASE_URL = '/api/offers';

export async function createOffer(offerData) {
  return sendRequest(BASE_URL, 'POST', offerData);
}

export async function getAllOffers(status) {
  return sendRequest(`${BASE_URL}/${status}`);
}

export async function getAllAthleteOffers(id, status) {
  return sendRequest(`${BASE_URL}/athlete/${id}/status/${status}`);
}

export async function getAllManagerOffers(id, status) {
  return sendRequest(`${BASE_URL}/manager/${id}/status/${status}`);
}

export async function approveOffer(offerId) {
  return sendRequest(`${BASE_URL}/approveOffer/${offerId}`, 'PUT');
}

export async function rejectOffer(offerId) {
  return sendRequest(`${BASE_URL}/rejectOffer/${offerId}`, 'PUT');
}

export async function removeOffer(offerId) {
  return sendRequest(`${BASE_URL}/removeOffer/${offerId}`, 'PUT');
}