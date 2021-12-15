import React from 'react'
import PropTypes from 'prop-types'
import s from './ImageGallery.module.css'
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'

/* --------------------------- result приходит из handelSearchSubmitForm--------------------------- */
function ImageGallery({ onModalOpen, result }) {
  // console.log(result)
  return (
    <ul className={s.ImageGallery}>
      {/* достаём из массива result нужные элементы и передаём в item  */}
      {result.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          imgUrl={largeImageURL}
          imgSrc={webformatURL}
          onModalOpen={onModalOpen}
        />
      ))}
    </ul>
  )
}

ImageGallery.propTypes = {
  onModalOpen: PropTypes.func.isRequired,
  result: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
}

export default ImageGallery
