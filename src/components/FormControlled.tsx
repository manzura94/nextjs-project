import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addControlledData } from '../store/formSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchema } from '../validation'
import { RootState } from '../store'
import { useNavigate } from 'react-router'
import '../styles/Form.css'

export const FormControlled = () => {
  const dispatch = useDispatch()
  const countries = useSelector((state: RootState) => state.form.countries)
  const navigate = useNavigate()

  console.log(
    useSelector((state: RootState) => state.form.controlled),
    'form',
  )

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      age: 0,
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      country: '',
      picture: undefined,
      terms: false,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const onSubmit = (data) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      data.picture = reader.result
      dispatch(addControlledData(data))
      navigate('/')
    }
    reader.readAsDataURL(data.picture[0])
  }

  console.log(errors)

  return (
      <div className="form_wrapper">
          
      <form onSubmit={handleSubmit(onSubmit)} className="form_container">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <div className='form_wrap'>
              {errors.name && (
                <span className="form_error">{errors.name.message}</span>
              )}
              <label htmlFor="name" className="form_label">
                Name:
              </label>
              <input type="text" {...field} className="form_input" id="name" />
            </div>
          )}
        />
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <div className='form_wrap'>
              {errors.age && (
                <span className="form_error">{errors.age.message}</span>
              )}
              <label className="form_label" htmlFor="age">
                Age:
              </label>
              <input type="number" {...field} className="form_input" id="age" />
            </div>
          )}
        />
              <Controller
                
          name="email"
          control={control}
          render={({ field }) => (
            <div className='form_wrap'>
              <label className="form_label" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                {...field}
                className="form_input"
                id="email"
              />
              {errors.email && (
                <span className="form_error">{errors.email.message}</span>
              )}
            </div>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <div className='form_wrap'>
              <label className="form_label" htmlFor="password">
                Password:
              </label>
              <input
                type="password"
                {...field}
                className="form_input"
                id="password"
              />
              {errors.password && (
                <span className="form_error">{errors.password.message}</span>
              )}
            </div>
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <div className='form_wrap'>
              <label htmlFor="confirmPassword" className="form_label">
                Confirm Password:
              </label>
              <input
                type="password"
                {...field}
                className="form_input"
                id="confirmPassword"
              />
              {errors.confirmPassword && (
                <span className="form_error">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          )}
        />
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <div className='form_special-wrap gender_container'>
              <label htmlFor="gender" className="form_label">
                Gender:
              </label>
              <select id="gender" {...field}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <span className="form_gender-error">{errors.gender.message}</span>
              )}
            </div>
          )}
        />
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <div className='form_wrap'>
              <label htmlFor="country" className="form_label">
                Country:
              </label>
              <input
                type="text"
                id="country"
                list="country-list"
                {...field}
                className="form_input"
              />
              <datalist id="country-list">
                {countries.map((country) => (
                  <option key={country} value={country} />
                ))}
              </datalist>
              {errors.country && (
                <span className="form_error">{errors.country.message}</span>
              )}
            </div>
          )}
        />
        <Controller
          name="picture"
          control={control}
          render={({ field }) => (
            <div className='form_special-wrap'>
              <label htmlFor="picture" className="form_label picture_label">
                Picture:
              <input
                id="picture"
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                    field.onChange(e.target.files)
                }}
                onBlur={field.onBlur}
                />
                </label>
              {errors.picture && (
                <span className="form_picture-error">{errors.picture.message}</span>
              )}
            </div>
          )}
        />
        <Controller
          name="terms"
          control={control}
                  render={({ field }) => (
              <div className='form_special-wrap terms_container'>
            <label htmlFor="terms" className="form_checklabel">
              Accept Terms and Conditions:
              <input
                id="terms"
                type="checkbox"
                name={field.name}
                onChange={(e) => {
                    field.onChange(e.target.checked)
                }}
                onBlur={field.onBlur}
                />
              {errors.terms && (
                  <span className="form_terms-error">{errors.terms.message}</span>
                  )}
            </label>
                  </div>
          )}
        />

        <button
          className="form_button"
          disabled={Object.keys(errors).length > 0}
          type="submit"
        >
          Sumbit
        </button>
      </form>
    </div>
  )
}
