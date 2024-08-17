import { useNavigate } from 'react-router'
import { FormControlled } from '../components/FormControlled'
import '../styles/pages.css'

export const ControlledFormPage = () => {
  const navigate = useNavigate()
  return (
    <div className="control_container">
      <button onClick={() => navigate('/')} className="home-button">
        Home
      </button>
      <h1 className="control_title">Controlled Form</h1>
      <FormControlled />
    </div>
  )
}
