/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered (registration) {
      console.log('Service worker has been registered.')
      setTimeout(() => {
          console.log('Buscando actualizacion')
          registration.update()
      }, 1000 * 60)
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound (registration) {
      console.log('New content is available; please refresh1.')
      // document.dispatchEvent(
      //     new CustomEvent('swUpdated', { detail: registration })
      // )
      // console.log('Se lanzo evento')
    },
    updated () {
      console.log('New content is available; please refresh2.')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
