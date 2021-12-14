// import PropTypes from 'prop-types'

function ImageGalleryItem({ imgSrc, imgAlt, imgUrl, onModalOpen }) {
  return (
    <li
      onClick={() => {
        onModalOpen(imgUrl, imgAlt)
      }}
    >
      <img src={imgSrc} alt={imgAlt} />
    </li>
  )
}

ImageGalleryItem.propTypes = {}

export default ImageGalleryItem
