import axiosInstance from '@/lib/axiosInstance'

function useAxios() {
  const get = async <T>(url: string, _data?: object | never, config?: object | never): Promise<T> => {
    try {
      const response = await axiosInstance.get<T>(url, config)
      return response.data
    }
    catch (error) {
      throw error
    }
  }

  const post = async <T>(url: string, data?: object | never, config?: object | never): Promise<T> => {
    try {
      const response = await axiosInstance.post<T>(url, data, config)
      // console.warn(response);

      return response.data
    }
    catch (error) {
      throw error
    }
  }

  const put = async <T>(url: string, data?: object | never, config?: object | never): Promise<T> => {
    try {
      const response = await axiosInstance.put<T>(url, data, config)
      return response.data
    }
    catch (error) {
      throw error
    }
  }

  const _delete = async <T>(url: string, data?: object | never, config?: object | never): Promise<T> => {
    try {
      const response = await axiosInstance.delete<T>(url, config)
      return response.data
    }
    catch (error) {
      throw error
    }
  }

  return { get, post, put, _delete }
}

export default useAxios
