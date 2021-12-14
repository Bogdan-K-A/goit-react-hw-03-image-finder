import React, { Component } from 'react'
import PropTypes from 'prop-types'
import s from './Modal.module.css'

export class Modal extends Component {
  static propTypes = {
    prop: PropTypes,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.closeModal)
  }

  componentWillUnmount() {
    window.addEventListener('keydown', this.closeModal)
  }

  closeModal = (e) => {
    if (e.code === 'Escape') {
      this.props.onClick()
    }
  }
  render() {
    const { onClick, largImageURL, alt } = this.props
    return (
      <div className={s.Overlay} onClick={onClick}>
        <div className={s.Modal}>
          <img src={largImageURL} alt={alt} />
        </div>
      </div>
    )
  }
}
