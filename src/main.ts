import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '../style.css'


import App from './App.vue'
import router from './router'

import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'xirr';
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
