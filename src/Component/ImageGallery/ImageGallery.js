import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import s from './ImageGallery.module.css'
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'

export function ImageGallery({ onModalOpen, result }) {
  return (
    <ul className={s.ImageGallery}>
      {result.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          imgAlt={tags}
          imgUrl={largeImageURL}
          imgSrc={webformatURL}
          onModalOpen={onModalOpen}
        />
      ))}
    </ul>
  )
}
