import * as Yup from 'yup'

export const validation = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Z]/, 'First letter must be uppercase')
    .required('Name is required'),
  age: Yup.number()
    .positive('Age must be positive')
    .required('Age is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must be strong',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: Yup.string().required('Gender is required'),
  terms: Yup.bool()
    .oneOf([true], 'Terms must be accepted')
    .required('Terms must be accepted'),
  picture: Yup.mixed()
    .nullable()
    .test('fileType', 'Unsupported File Format', (value) => {
      if (!value) return true
      return (
        typeof value === 'string' &&
        (value.startsWith('data:image/jpeg') ||
          value.startsWith('data:image/png'))
      )
    })
    .required('Picture is required'),

  country: Yup.string().required('Country is required'),
})

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Z]/, 'First letter must be uppercase')
    .required('Name is required'),
  age: Yup.number()
    .required('Age is required')
    .positive('Age must be positive')
    .integer('Age must be an integer'),
  email: Yup.string()
    .email('Email must be valid')
    .required('Email is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must be strong',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: Yup.string().required('Gender is required'),
  country: Yup.string().required('Country is required'),
  picture: Yup.mixed()
    .test('fileSize', 'The file is too large', (value) => {
      return value && value[0].size <= 2000000
    })
    .test('fileType', 'Unsupported File Format', (value) => {
      return value && ['image/jpeg', 'image/png'].includes(value[0].type)
    }),
  terms: Yup.bool().oneOf([true], 'Terms must be accepted'),
})
