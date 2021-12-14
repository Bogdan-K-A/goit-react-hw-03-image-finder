import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import { Searchbar } from './Component/Searchbar/Searchbar'
import { Spinner } from './Component/Spinner/Spinner'
import { ImageGallery } from './Component/ImageGallery/ImageGallery'
import fetchAPI from '../src/Servise/imagesApi'
import { Button } from './Component/Button/Button'
import { Modal } from './Component/Modal/Modal'

export class App extends Component {
  state = {
    sairchinput: '',
    error: null,
    status: 'idle',
    page: 1,
    result: [],
  }

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.sairchinput
    const nextName = this.props.sairchinput

    if (prevName !== nextName) {
      this.setState({ status: 'panding', page: 1 })
      this.imgFatchApi()
    }
  }
  imgFatchApi = () => {
    const { sairchinput, page } = this.state
    fetchAPI(sairchinput, page)
      .then((images) => {
        if (images.total === 0) {
          this.setState({
            error: 'Нет картинок по запросу',
            status: 'resolved',
          })
        } else {
          this.setState((prevState) => ({
            result: [...prevState.result, ...images.hits],
            status: 'resolved',
            page: prevState.page + 1,
            sairchinput: sairchinput,
          }))
          window.scrollTo({
            top: document.documentElrmrnt.sairchinput,
            behavior: 'smooth',
          })
        }
      })
      .catch((error) => this.setState({ error, status: 'rejected' }))
  }

  handelOpenModal = (url, alt) => {
    this.setState({
      largImageURL: url,
      alt: alt,
    })
  }

  handelCloseModal = () => {
    this.setState({
      largImageURL: '',
      alt: '',
    })
  }

  handelSearchSubmitForm = (imagesName) => {
    this.setState({ sairchinput: imagesName, page: 1, result: [], error: null })
  }

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
