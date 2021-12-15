import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ImSearch } from 'react-icons/im'
import s from './Searchbar.module.css'

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  state = {
    searchinput: '',
  }

  /* ---------------------------- Отслеживает запрос в инпуте --------------------------- */
  handelNameImg = (e) => {
    const { value } = e.currentTarget
    this.setState({ searchinput: value.toLowerCase() })
  }

  /* ----------------------------- запрос в сабмит и запись в state---------------------------- */
  handelSubmit = (e) => {
    e.preventDefault()
    const { searchinput } = this.state

    /* ---------------- если инпут пустой выпадет предупреждение ---------------- */
    if (searchinput.trim() === '') {
      return toast.error('Введите запрос')
    }
    this.props.onSubmit(searchinput)
    /* ------------------- очистка инпута посне нажатия кнопки ------------------ */
    this.setState({ searchinput: '' })
  }

  render() {
    const { searchinput } = this.state
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handelSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <ImSearch style={{ width: 20, height: 20 }} />
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchinput}
            onChange={this.handelNameImg}
          />
        </form>
      </header>
    )
  }
}

export default Searchbar
