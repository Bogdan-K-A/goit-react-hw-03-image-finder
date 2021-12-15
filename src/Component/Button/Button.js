import React from 'react'
import PropTypes from 'prop-types'
import s from './Button.module.css'

/* -------------------------- пропс onLoadMore приходит из App ------------------------- */
const Button = ({ onLoadMore }) => {
  return (
    <div className={s.Center}>
      <button className={s.Button} type="button" onClick={onLoadMore}>
        Загрузить ещё
      </button>
    </div>
  )
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
}

export default Button
