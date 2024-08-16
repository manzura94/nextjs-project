import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { validation } from '../validation'
import { addUncontrolledData, FormData } from '../store/formSlice'
import '../styles/Form.css'
import * as Yup from 'yup'
import { useNavigate } from 'react-router'

export const FormUncontrolled = () => {
  const dispatch = useDispatch()
  const countries = useSelector((state: RootState) => state.form.countries)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const navigate = useNavigate()
  console.log(
    useSelector((state: RootState) => state.form.uncontrolled),
    'uncontrol',
  )

  const nameRef = useRef<HTMLInputElement>(null)
  const ageRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const genderRef = useRef<HTMLSelectElement>(null)
  const termsRef = useRef<HTMLInputElement>(null)
  const pictureRef = useRef<HTMLInputElement>(null)
  const countryRef = useRef<HTMLInputElement>(null)

  const handleFormSumbit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data: FormData = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value || null),
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      terms: termsRef.current?.checked || false,
      country: countryRef.current?.value || '',
      picture: pictureRef.current?.value || '',
    }

    if (pictureRef.current?.files && pictureRef.current.files.length > 0) {
      const file = pictureRef.current.files[0]
      const reader = new FileReader()

      reader.onloadend = async () => {
        data.picture = reader.result as string

        try {
          await validation.validate(data, { abortEarly: false })
          dispatch(addUncontrolledData(data))
          navigate('/')
        } catch (error) {
          if (error instanceof Yup.ValidationError) {
            const validationErrors: { [key: string]: string } = {}
            error.inner.forEach((err) => {
              if (err.path) validationErrors[err.path] = err.message
            })
            setErrors(validationErrors)
            console.log(validationErrors)
          }
        }
      }

      reader.readAsDataURL(file)
    } else {
      try {
        await validation.validate(data, { abortEarly: false })
        dispatch(addUncontrolledData(data))
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const validationErrors: { [key: string]: string } = {}
          error.inner.forEach((err) => {
            if (err.path) validationErrors[err.path] = err.message
          })
          setErrors(validationErrors)
          console.log(validationErrors)
        }
      }
    }
  }

  return (
    <div className="form_wrapper">
      <form onSubmit={handleFormSumbit} className="form_container">
        <div className="form_wrap">
          {errors.name && <span className="form_error">{errors.name}</span>}
          <label className="form_label" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            id="name"
            ref={nameRef}
            name="name"
            autoComplete="name"
            className="form_input"
          />
        </div>
        <div className="form_wrap">
          {errors.age && (
            <span className="form_error">{errors.age.toLowerCase()}</span>
          )}
          <label className="form_label" htmlFor="age">
            Age:
          </label>
          <input
            type="number"
            id="age"
            ref={ageRef}
            name="age"
            autoComplete="age"
            className="form_input"
          />
        </div>
        <div className="form_wrap">
          <label className="form_label" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            name="email"
            autoComplete="email"
            className="form_input"
          />
          {errors.email && (
            <span className="form_error">{errors.email.toLowerCase()}</span>
          )}
        </div>
        <div className="form_wrap">
          <label className="form_label" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            name="password"
            autoComplete="new-password"
            className="form_input"
          />
          {errors.password && (
            <span className="form_error">{errors.password.toLowerCase()}</span>
          )}
        </div>
        <div className="form_wrap">
          <label className="form_label" htmlFor="confirmPassword">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            ref={confirmPasswordRef}
            name="confirmPassword"
            autoComplete="new-password"
            className="form_input"
          />
          {errors.confirmPassword && (
            <span className="form_error">
              {errors.confirmPassword.toLowerCase()}
            </span>
          )}
        </div>
        <div className="form_wrap">
          <label className="form_label" htmlFor="country">
            Country:
          </label>
          <input
            type="text"
            id="country"
            name="country"
            list="country-list"
            ref={countryRef}
            autoComplete="country"
            className="form_input"
          />
          <datalist id="country-list">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          {errors.country && (
            <span className="form_error">{errors.country.toLowerCase()}</span>
          )}
        </div>
        <div className="form_special-wrap gender_container">
          <label className="form_label" htmlFor="gender">
            Gender:
          </label>
          <select id="gender" ref={genderRef} name="gender" autoComplete="sex">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <span className="form_gender-error">
              {errors.gender.toLowerCase()}
            </span>
          )}
        </div>
        <div className="form_special-wrap">
          <label className="form_label picture_label" htmlFor="picture">
            Picture:
            <input type="file" id="picture" ref={pictureRef} name="picture" />
          </label>
          {errors.picture && (
            <span className="form_picture-error">
              {errors.picture.toLowerCase()}
            </span>
          )}
        </div>
        <div className="form_special-wrap terms_container">
          <label className="form_checklabel" htmlFor="terms">
            Accept Terms and Conditions:
            <input type="checkbox" id="terms" ref={termsRef} name="terms" />
          </label>
          {errors.terms && (
            <span className="form_terms-error">
              {errors.terms.toLowerCase()}
            </span>
          )}
        </div>
        <button className="form_button" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}
// disabled={Object.keys(errors).length > 0}
