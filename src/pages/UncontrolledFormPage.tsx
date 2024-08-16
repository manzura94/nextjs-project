import React from 'react'
import { useNavigate } from 'react-router'
import { FormUncontrolled } from '../components/FormUncontrolled'
import '../styles/pages.css'

export const UncontrolledFormPage = () => {
  const navigate = useNavigate()
  return (
    <div>
      <button onClick={() => navigate('/')} className="home-button">
        Home
      </button>
      <h1>Uncontrolled form</h1>
      <FormUncontrolled />
    </div>
  )
}
