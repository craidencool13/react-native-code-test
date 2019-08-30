import config from './config'
import axios from 'axios'
import { AsyncStorage } from 'react-native';

import helpers from 'app/global/helpers'

export const FetchApi = (
  append,
  payload = {},
  methodParams = 'POST',
  header = {'ContentType': 'application/json',
            'Accept': 'application/json'} ) => {
    
  return new Promise(async (resolve, reject) => {

    switch(methodParams.toUpperCase()){

      case 'GET':
          // Serialize parameter
          let params = await (payload != undefined || payload != '' ? '?' + helpers.serialize(payload) : '');

          axios.get(config.url + append + params, { header: header }).then((response) => {
            const { data } = response
            resolve(data)
          }).catch((error) => {
            let { response } = error
            reject(response)
          })
      break
  
      case 'POST':
        return axios.post(config.url + append, payload).then( (response) => {
            const { data } = response
            resolve(data)
          }).catch( (error) => {
            let { response } = error
            reject(response)
          })
      break
      
    }

  })



}
