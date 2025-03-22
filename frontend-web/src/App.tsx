import '@lynx-js/web-core'
import '@lynx-js/web-elements/all'

import '@lynx-js/web-core/index.css'
import '@lynx-js/web-elements/index.css'
import './App.css'

const App = () => (
	<lynx-view
		style={{ height: '100vh', width: '100vw' }}
		url="/main.web.bundle"
	></lynx-view>
)

export default App
