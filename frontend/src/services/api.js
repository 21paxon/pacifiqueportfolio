import axios from "axios"

const api = axios.create({ baseURL: import.meta.env.PROD ? "/api/v1" : (import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/v1"), withCredentials: true, timeout: 15000 })
api.interceptors.response.use((response) => response, (error) => {
  const message = error.response?.data?.error || error.message || "Unable to connect to the portfolio API."
  return Promise.reject(new Error(message))
})

export default api
