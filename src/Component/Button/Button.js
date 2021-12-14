import React from 'react'
import PropTypes from 'prop-types'

export const Button = ({ onLoadMore }) => {
  return (
    <>
      <button type="button" onClick={onLoadMore}>
        Загрузить ещё
      </button>
    </>
  )
}

Button.propTypes = {}

// export default Button
