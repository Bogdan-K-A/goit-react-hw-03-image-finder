import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'

const Spinner = () => {
  return (
    <div>
      <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
    </div>
  )
}
export default Spinner
