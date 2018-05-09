export const PRODUCTS_ENDPOINT_URL = 'http://localhost:5000'

export const getEndPoint = params => `${IAM_ENDPOINT_URL}${params || ''}`

export default {
  PRODUCTS_ENDPOINT_URL,
  getEndPoint
}