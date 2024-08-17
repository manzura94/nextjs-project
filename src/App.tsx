import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ControlledFormPage } from './pages/ControlledFormPage'
import { Main } from './pages/Main'
import { UncontrolledFormPage } from './pages/UncontrolledFormPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/form-uncontrolled" element={<UncontrolledFormPage />} />
        <Route path="/form-controlled" element={<ControlledFormPage />} />
      </Routes>
    </Router>
  )
}

export default App
