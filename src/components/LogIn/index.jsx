import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { PrimaryLink } from 'uiKit/Link'
import { PrimaryButton } from 'uiKit/Button'
import { TextField } from 'uiKit/userInput/TextField'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { AuthContext } from '../../contexts/AuthContext'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 70px 50px;
  max-width: 487px;
  margin: 150px auto 0 auto;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.15);
`

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`

const NoAccountText = styled.div`
  margin-right: 5px;
`

const SignUpPrompt = styled.div`
  display: flex;
  flex-direction: row;
`

const TextFieldContainer = styled.div`
  margin: 16px 0;
  width: 100%;
`

const ButtonContainer = styled.div`
  margin: 28px 0px;
`

const ValidationSchema = Yup.object().shape({
  email: Yup.string().required('This field is required'),
  password: Yup.string().required('This field is required'),
})

const LogInPage = () => {
  const history = useHistory()
  const { loginUser } = useContext(AuthContext)

  return (
    <Container>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={ValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true)
          loginUser(values.email, values.password)
          resetForm()
        }}
      >
        {(props) => <LogInForm {...props} />}
      </Formik>
      <SignUpPrompt>
        <NoAccountText>No account?</NoAccountText>
        <PrimaryLink onClick={() => history.push('/sign-up')}>
          Create account
        </PrimaryLink>
      </SignUpPrompt>
    </Container>
  )
}

const LogInForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  isValid,
  // validateForm
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <TextFieldContainer>
        <TextField
          required
          label="Email"
          type="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          touched={touched.email}
          error={errors.email}
        />
      </TextFieldContainer>

      <TextFieldContainer>
        <TextField
          required
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          touched={touched.password}
          error={errors.password}
        />
      </TextFieldContainer>

      <ButtonContainer>
        <PrimaryButton
          type="submit"
          disabled={isSubmitting || (!isValid && touched !== {})}
        >
          Login
        </PrimaryButton>
      </ButtonContainer>
    </Form>
  )
}

export default LogInPage
