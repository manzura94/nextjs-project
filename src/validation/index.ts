import * as Yup from 'yup'

const countries = [
  'USA',
  'Canada',
  'Mexico',
  'UK',
  'Germany',
  'France',
  'Uzbekistan',
  'Kazakhistan',
  'Kirgizistan',
  'Georgia',
  'Belarus',
  'Ukraine',
  'Russia',
  'China',
  'Japan',
  'India',
  'Brazil',
  'Australia',
  'South Africa',
]

export const validation = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Z]/, 'First letter must be uppercase')
    .required('Name is required'),
  age: Yup.number()
    .required('Age is required')
    .positive('Age must be positive')
    .integer('Age must be an integer'),
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
    .test('fileType', (value) => {
      return (
        typeof value === 'string' &&
        (value.startsWith('data:image/jpeg') ||
          value.startsWith('data:image/png'))
      )
    })
    .required('Picture is required'),

  country: Yup.string()
    .required('Country is required')
    .test(
      'is-valid-country',
      'Country must be one of the predefined countries',
      (value) => !value || countries.includes(value),
    ),
})

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'First letter must be uppercase'),
  age: Yup.number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === '' ? undefined : value,
    )
    .required('Age is required')
    .positive('Age must be positive')
    .integer('Age must be an integer'),
  email: Yup.string()
    .email('Email must be valid')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must be strong',
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: Yup.string().required('Gender is required'),
  country: Yup.string()
    .required('Country is required')
    .test(
      'is-valid-country',
      'Country must be one of the predefined countries',
      (value) => !value || countries.includes(value),
    ),
  picture: Yup.mixed<FileList>().required('Picture is required'),
  terms: Yup.bool().oneOf([true], 'Terms must be accepted'),
})
