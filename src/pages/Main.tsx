import { UncontrolledForm } from '../components/UncontrolledForm'
import { ControlledForm } from '../components/ControlledForm'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import '../styles/Main.css'
import * as React from 'react'

export const Main = () => {
  const navigate = useNavigate()
  const { controlled, uncontrolled } = useSelector(
    (state: RootState) => state.form,
  )
  console.log(controlled, uncontrolled)

  return (
    <div className="main_container">
      <h1 className="main_title">Main Page</h1>
      <div className="form_wrapper">
        <div
          className="controlled_form form"
          onClick={() => navigate('/form-controlled')}
        >
          <h2 className="form_title">Controlled Form</h2>
          {controlled?.length ? (
            <div className="form_wrap-container">
              <ControlledForm />
            </div>
          ) : (
            <p className="form_paragraph">No information available yet</p>
          )}
        </div>
        <div
          className="uncontrolled_form form"
          onClick={() => navigate('/form-uncontrolled')}
        >
          <h2 className="form_title">Uncontrolled Form</h2>
          {uncontrolled?.length ? (
            <div className="form_wrap-container">
              <UncontrolledForm />
            </div>
          ) : (
            <p className="form_paragraph">No information available yet</p>
          )}
        </div>
      </div>
    </div>
  )
}
