export const END_POINT_URL = 'https://api.brawijaya-hotel.ngopi.men/'

export const getEndPoint = params => `${END_POINT_URL}${params || ''}`

export default {
  END_POINT_URL,
  getEndPoint
}