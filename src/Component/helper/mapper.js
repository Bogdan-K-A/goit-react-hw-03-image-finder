/* --------------------------------- Маппер является вспомогательной функцией которая обрабатывает то что приходит из response.json() --------------------------------- */

const mapper = (images) => {
  console.log(images)
  return images.map(({ id, webformatURL, largeImageURL }) => ({
    id,
    webformatURL,
    largeImageURL,
  }))
}

export default mapper
