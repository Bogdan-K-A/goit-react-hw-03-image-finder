function imagesApi(imagesName, numPage) {
  console.log(imagesName)
  // console.log(numPage)
  const API_KEY = '23996907-65b7baf3ba7389d44636c5d9e'
  const BASE_URL = `https://pixabay.com/api/`
  const params = `?q=${imagesName}&page=${numPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`

  const URL = BASE_URL + params

  return fetch(URL).then((response) => {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(new Error(`Такого названия ${imagesName} нет`))
  })
}

export default imagesApi
