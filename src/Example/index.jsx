import { useRef } from 'react'
import useForm from '../lib'
import Form from './Form'
import State from './State'
import './app.scss'
// const debug = true

function App() {
  const formRef = useRef()
  const [formState] = useForm(formRef, {
    firstName: 'André',
    lastName: 'Padez',
    gender: 'female',
    dateOfBirth: new Date('1979-08-12'),
    address: {
      street1: 'Av. Ivens',
      street2: '61, 1º Dto',
      postalCode: '1495-727',
      city: 'lisboa',
    },
    test: {
      something: { hobbies: ['guitar', 'swimming'] },
      radioNumber: 0,
    },
    selectMulti: ['green', 'yellow'],
    checkBoolean: true,
    radioBoolean: true,
  })

  const onSubmit = () => {
    // console.log('formState', formState())
  }

  return (
    <div className="app">
      <Form formRef={formRef} onSubmit={onSubmit} />
      <State formState={formState} />
    </div>
  )
}

export default App
