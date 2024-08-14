import * as Yup from 'yup'

const isFile = (value: any): value is File => {
  return value instanceof File
}

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
  picture: Yup.mixed<File>()
    .test(
      'fileSize',
      'File too large',
      (value) => value && isFile(value) && value.size <= 1024 * 1024,
    )
    .test(
      'fileType',
      'Unsupported File Format',
      (value) =>
        value &&
        isFile(value) &&
        ['image/jpeg', 'image/png'].includes(value.type),
    ),
  country: Yup.string().required('Country is required'),
})
