import useAxios from '@/hooks/useAxios'

export function useAdminPanelRoutes() {
  const axiosInstance = useAxios()

  const getUsersList = async () => {
    return await axiosInstance.get('/admin/api/v1/users')
  }

  const getCategoriesList = async () => {
    return await axiosInstance.get('/admin/api/v1/skill-teach/category', {})
  }

  const addNewCategory = async ({ name_en, name_fa, description, is_active, parent_id, tags, poster_image, settings }) => {
    const addFormData = new FormData()
    addFormData.append('name_en', name_en)
    addFormData.append('name_fa', name_fa)
    addFormData.append('description', description)
    addFormData.append('is_active', is_active)
    addFormData.append('parent_id', parent_id)
    // addFormData.append('tags[]', tags)
    tags.forEach((item, index) => {
      addFormData.append(`tags[${index}]`, item)
    })
    addFormData.append('settings', JSON.stringify(settings))

    if (poster_image) {
      // Ensure proper file handling
      const file = new File([poster_image], poster_image.name, {
        type: poster_image.type || 'image/png',
      })
      addFormData.append('poster_image', file)
    }

    return await axiosInstance.post(`/admin/api/v1/skill-teach/category`, addFormData, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'multipart/form-data', // Correct MIME type
      },
    })
  }

  const updateCategory = async ({ id, name_en, name_fa, description, is_active, tags, poster_image, settings }) => {
    const updateFormData = new FormData()
    updateFormData.append('name_en', name_en)
    updateFormData.append('name_fa', name_fa)
    updateFormData.append('description', description)
    updateFormData.append('is_active', is_active)
    // updateFormData.append('tags[]', tags)
    tags.forEach((item, index) => {
      updateFormData.append(`tags[${index}]`, item)
    })
    updateFormData.append('_method', 'PUT')
    updateFormData.append('settings', JSON.stringify(settings))

    if (poster_image && poster_image instanceof File) {
      // Ensure proper file handling
      const file = new File([poster_image], poster_image.name, {
        type: poster_image.type || 'image/png',
      })
      updateFormData.append('poster_image', file)
    }
    return await axiosInstance.post(`/admin/api/v1/skill-teach/category/${id}`, updateFormData, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'multipart/form-data', // Correct MIME type
      },
    })
  }

  const updateSubCategory = async ({ id, name_en, name_fa, description, is_active, parent_id, tags, poster_image }) => {
    const updateSubFormData = new FormData()
    updateSubFormData.append('name_en', name_en)
    updateSubFormData.append('name_fa', name_fa)
    updateSubFormData.append('description', description)
    updateSubFormData.append('is_active', is_active)
    updateSubFormData.append('parent_id', parent_id)
    // updateSubFormData.append('tags[]', tags)
    tags.forEach((item, index) => {
      updateSubFormData.append(`tags[${index}]`, item)
    })
    updateSubFormData.append('_method', 'PUT')

    if (poster_image && poster_image instanceof File) {
      // Ensure proper file handling
      const file = new File([poster_image], poster_image.name, {
        type: poster_image.type || 'image/png',
      })
      updateSubFormData.append('poster_image', file)
    }
    return await axiosInstance.post(`/admin/api/v1/skill-teach/category/${id}`, updateSubFormData, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'multipart/form-data', // Correct MIME type
      },
    })
  }

  const deleteCategory = async ({ id }) => {
    return await axiosInstance._delete(`/admin/api/v1/skill-teach/category/${id}`, {
      id,
    })
  }

  const getBooksList = async () => {
    return await axiosInstance.get('/admin/api/v1/skill-teach/book', {})
  }

  const addNewBook = async ({ title_en, title_fa, description, is_active, is_free, tags, category_ids, poster_image, score }) => {
    const addFormData = new FormData()
    addFormData.append('title_en', title_en)
    addFormData.append('title_fa', title_fa)
    addFormData.append('description', description)
    addFormData.append('is_active', is_active)
    addFormData.append('is_free', is_free)
    // addFormData.append('tags[]', tags)
    tags.forEach((item, index) => {
      addFormData.append(`tags[${index}]`, item)
    })
    // addFormData.append('category_ids[]', category_ids)
    category_ids.forEach((item, index) => {
      addFormData.append(`category_ids[${index}]`, item)
    })
    addFormData.append('score', score)

    if (poster_image) {
      // Ensure proper file handling
      const file = new File([poster_image], poster_image.name, {
        type: poster_image.type || 'image/png',
      })
      addFormData.append('poster_image', file)
    }

    return await axiosInstance.post(`/admin/api/v1/skill-teach/book`, addFormData, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'multipart/form-data', // Correct MIME type
      },
    })
  }

  const deleteBook = async ({ id }) => {
    return await axiosInstance._delete(`/admin/api/v1/skill-teach/book/${id}`, {
      id,
    })
  }

  const updateBook = async ({ id, title_en, title_fa, description, is_active, is_free, tags, category_ids, poster_image, score }) => {
    const updateBookFormData = new FormData()
    updateBookFormData.append('title_en', title_en)
    updateBookFormData.append('title_fa', title_fa)
    updateBookFormData.append('description', description)
    updateBookFormData.append('is_active', is_active)
    updateBookFormData.append('is_free', is_free)
    // updateBookFormData.append('tags[]', tags)
    tags.forEach((item, index) => {
      updateBookFormData.append(`tags[${index}]`, item)
    })
    // updateBookFormData.append('category_ids[]', category_ids)
    category_ids.forEach((item, index) => {
      updateBookFormData.append(`category_ids[${index}]`, item)
    })
    updateBookFormData.append('score', score)
    updateBookFormData.append('_method', 'PUT')

    if (poster_image && poster_image instanceof File) {
      // Ensure proper file handling
      const file = new File([poster_image], poster_image.name, {
        type: poster_image.type || 'image/png',
      })
      updateBookFormData.append('poster_image', file)
    }
    return await axiosInstance.post(`/admin/api/v1/skill-teach/book/${id}`, updateBookFormData, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'multipart/form-data', // Correct MIME type
      },
    })
  }

  const deleteBookPage = async ({ id }) => {
    return await axiosInstance._delete(`/admin/api/v1/skill-teach/book-page/${id}`, {
      id,
    })
  }

  return { getUsersList, getCategoriesList, addNewCategory, updateCategory, updateSubCategory, deleteCategory, getBooksList, addNewBook, deleteBook, updateBook, deleteBookPage }
}
