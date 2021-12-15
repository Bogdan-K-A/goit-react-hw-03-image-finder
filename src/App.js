import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import Searchbar from './Component/Searchbar/Searchbar'
import Spinner from './Component/Spinner/Spinner'
import ImageGallery from './Component/ImageGallery/ImageGallery'
import fetchAPI from '../src/Servise/imagesApi'
import Button from './Component/Button/Button'
import Modal from './Component/Modal/Modal'

export class App extends Component {
  state = {
    searchinput: '',
    error: null,
    status: 'idle',
    page: 1,
    result: [],
  }

  /* -------------------- Сравнение запроса при  обновлении ------------------- */
  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.searchinput //Предыдущий запрос
    const nextName = this.state.searchinput //Текущий запрос
    /* --------------------------- Сравнение запросов --------------------------- */
    if (prevName !== nextName) {
      this.setState({ status: 'panding', page: 1 })
      this.imgFatchApi()

      // console.log('zamena')
      // console.log('prevName:', prevName)
      // console.log('nextName:', nextName)
    }
  }

  /* -------------------------- функция фетч запроса -------------------------- */
  imgFatchApi = () => {
    const { searchinput, page } = this.state
    // console.log(searchinput)
    // console.log(page)

    fetchAPI(searchinput, page)
      .then((images) => {
        if (images.total === 0) {
          this.setState({
            error: `Нет картинок по запросу ${searchinput}`,
            status: 'rejected',
          })
        } else {
          this.setState((prevProps) => ({
            result: [...prevProps.result, ...images.hits],
            status: 'resolved',
            page: prevProps.page + 1,
            searchinput: searchinput,
          }))
          /* ---------------- проскроливает после нажатия загрузить ещё --------------- */
          this.handleSroll()
        }
      })
      .catch((error) => this.setState({ error, status: 'rejected' }))
  }

  /* ------------------------ Функция прокрутки ------------------------ */
  handleSroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }
  /* ------------------------ Функция открытия модалки ------------------------ */
  // передаём в функцию аргумент url в который будет записан пропс в компоненте модалки
  handelOpenModal = (url) => {
    this.setState({
      largImageURL: url,
    })
  }

  /* ------------------------ функция закрытия модалки ------------------------ */
  handelCloseModal = () => {
    this.setState({
      largImageURL: '',
    })
  }

  /* ------------------------- функция запроса в форме ------------------------- */
  handelSearchSubmitForm = (imagesName) => {
    // console.log(imagesName)
    this.setState({ searchinput: imagesName })
  }

  /* ---------------------- Функция кнопки загрузить ещё ---------------------- */
  handelLoadMore = () => {
    this.setState({
      status: 'panding',
    })
    this.imgFatchApi()
  }

  render() {
    const { largImageURL, error, status, result } = this.state

    return (
      <div>
        <Searchbar onSubmit={this.handelSearchSubmitForm} />

        {status === 'panding' && <Spinner />}

        {status === 'resolved' && (
          <>
            <ImageGallery onModalOpen={this.handelOpenModal} result={result} />
            <Button onLoadMore={this.handelLoadMore} />
          </>
        )}

        {largImageURL && (
          <Modal largImageURL={largImageURL} onClick={this.handelCloseModal} />
        )}

        {status === 'rejected' && <p>{error}</p>}

        <ToastContainer autoClose={3000} position="top-center" />
      </div>
    )
  }
}
