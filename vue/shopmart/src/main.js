import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { vFocus } from './directives/v-focus'


// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
}
const app = createApp(App)
app.use(router)
app.directive('focus', vFocus) // Register the directive
app.mount('#app')