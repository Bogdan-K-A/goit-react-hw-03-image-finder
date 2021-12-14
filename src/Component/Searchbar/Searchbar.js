import React, { Component } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ImSearch } from 'react-icons/im'
import s from './Searchbar.module.css'

export class Searchbar extends Component {
  state = {
    searchinput: '',
  }
  /* ---------------------------- значение в инпуте --------------------------- */
  handelNameImg = (e) => {
    const { value } = e.currentTarget
    this.setState({ searchinput: value.toLowerCase() })
  }
  /* ----------------------------- запрос в сабмит и запись в state---------------------------- */
  handelSubmit = (e) => {
    e.preventDefault()
    const { searchinput } = this.state

    if (searchinput.trim() === '') {
      return toast.error('Введите запрос')
    }

    this.props.onSubmit(searchinput)
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
