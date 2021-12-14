import React, { Component } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ImSearch } from 'react-icons/im'
import s from './Searchbar.module.css'

export class Searchbar extends Component {
  state = {
    sairchinput: '',
  }

  handelNameImg = (e) => {
    this.setState({ sairchinput: e.currentTarget.value.toLowerCase() })
  }

  handelSubmit = (e) => {
    e.preventDefault()
    const { sairchinput } = this.state

    if (sairchinput.trim() === '') {
      return toast.error('Введите запрос')
    }

    this.props.onSubmit(sairchinput)
    this.setState({ sairchinput: '' })
  }

  render() {
    const { sairchinput } = this.state
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
            value={sairchinput}
            onChange={this.handelNameImg}
          />
        </form>
      </header>
    )
  }
}
