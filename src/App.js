import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import { Searchbar } from './Component/Searchbar/Searchbar'
import Spinner from './Component/Spinner/Spinner'
import { ImageGallery } from './Component/ImageGallery/ImageGallery'
import fetchAPI from '../src/Servise/imagesApi'
import { Button } from './Component/Button/Button'
import { Modal } from './Component/Modal/Modal'

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
    /* ---------------------------- Предыдущий запрос --------------------------- */
    const prevName = prevState.searchinput
    /* ---------------------------- Текущий запрос --------------------------- */
    const nextName = this.state.searchinput
    /* --------------------------- Сравнение запросов --------------------------- */
    if (prevName !== nextName) {
      this.setState({ status: 'panding', page: 1 })
      this.imgFatchApi()
      return
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
            error: 'Нет картинок по запросу',
            status: 'resolved',
          })
        } else {
          this.setState((prevProps) => ({
            result: [...prevProps.result, ...images.hits],
            status: 'resolved',
            page: prevProps.page + 1,
            searchinput: searchinput,
          }))
          // window.scrollTo({
          //   top: document.documentElrmrnt.searchinput,
          //   behavior: 'smooth',
          // })
        }
      })
      .catch((error) => this.setState({ error, status: 'rejected' }))
  }

  /* ------------------------ Функция открытия модалки ------------------------ */
  handelOpenModal = (url, alt) => {
    this.setState({
      largImageURL: url,
      alt: alt,
    })
  }

  /* ------------------------ функция закрытия модалки ------------------------ */
  handelCloseModal = () => {
    this.setState({
      largImageURL: '',
      alt: '',
    })
  }

  /* ------------------------- функция поиска в форме ------------------------- */
  handelSearchSubmitForm = (imagesName) => {
    // console.log(imagesName)
    this.setState({ searchinput: imagesName, page: 1, result: [], error: null })
    this.imgFatchApi()
  }

  /* ---------------------- Функция кнопки загрузить ещё ---------------------- */
  handelLoadMore = () => {
    this.setState({
      status: 'panding',
    })
    this.imgFatchApi()
  }

  render() {
    const { largImageURL, alt, error, status, result } = this.state

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
          <Modal
            largImageURL={largImageURL}
            alt={alt}
            onClick={this.handelCloseModal}
          />
        )}
        {status === 'rejected' && <p>{error}</p>}

        <ToastContainer autoClose={3000} position="top-center" />
      </div>
    )
  }
}
