import React, { Component } from 'react'
import PropTypes from 'prop-types'
import s from './Modal.module.css'

class Modal extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    largImageURL: PropTypes.string.isRequired,
  }

  /* ------------------------- методы жизненного цикла в которые записаны слушатели событий ------------------------ */
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal)
  }

  componentWillUnmount() {
    window.addEventListener('keydown', this.closeModal)
  }

  /* ------------- функция закрытия модалки по нажатию на Escape переданная через пропс ------------ */
  closeModal = (e) => {
    if (e.code === 'Escape') {
      this.props.onClick()
    }
  }
  render() {
    const { onClick, largImageURL } = this.props
    return (
      <div className={s.Overlay} onClick={onClick}>
        <div className={s.Modal}>
          <img src={largImageURL} alt="" />
        </div>
      </div>
    )
  }
}

export default Modal
