const mapper = (images) => {
  return images.map(({ id, webformatURL, largeImageURL }) => ({
    id,
    webformatURL,
    largeImageURL,
  }))
}

export default mapper
