import { createRoot } from 'react-dom/client'
import './index.css'
import './assets/global.css' // 导入全局样式
import App from './App.jsx'
import 'lib-flexible' 
import { BrowserRouter as Router} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <Router>
        <App />
    </Router>
)
