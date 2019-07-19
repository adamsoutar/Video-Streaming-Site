import axios from 'axios'
import config from '../config'

export default new axios.create({
    baseURL: config.uploadApiURL,
    timeout: 30000,
    headers: {'Accept': 'application/json'}
})
