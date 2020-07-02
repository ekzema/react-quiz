import axios from 'axios'

export default axios.create({
  baseURL: 'https://ekzema-react-quiz.firebaseio.com/'
})
