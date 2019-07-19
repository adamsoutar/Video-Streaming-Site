import axios from 'axios'
import config from '../config'

export default new axios.create({
    baseURL: config.apiURL,
    timeout: 30000,
    headers: {'Accept': 'application/json'}
})
