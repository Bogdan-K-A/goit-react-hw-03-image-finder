import PropTypes from 'prop-types'
import s from './ImageGalleryItem.module.css'

/* ------------------------ пропсы приходят через ImageGallery------------------------ */

function ImageGalleryItem({ imgSrc, imgUrl, onModalOpen }) {
  return (
    <li
      className={s.ImageGalleryItem}
      onClick={() => {
        onModalOpen(imgUrl)
      }}
    >
      <img src={imgSrc} alt="" className={s.ImageGalleryItemImage} />
    </li>
  )
}

ImageGalleryItem.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  onModalOpen: PropTypes.func.isRequired,
}

export default ImageGalleryItem
