import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { PrimaryButton, TertiaryButton } from "uiKit/Button";
import { TextField } from "uiKit/userInput/TextField";
import { UploadPictureField } from "uiKit/UploadPictureField";
import { SelectInvestorType } from "uiKit/userInput/SelectInvestorType";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from '../../config/axiosConfig';
import { AuthContext } from "../../contexts/AuthContext";
// import SubmitDocuments from "../DocumentsUpload/SubmitDocuments";
import { Input } from "@material-ui/core";
import UploadProfileImage from '../DocumentsUpload/UploadProfileImage'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 36px 50px 100px 32px;
  width: 40vw;
  margin: 150px auto 0 auto;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.15);
`;

const Title = styled.div`
  font-size: 16px;
  margin-bottom: 12px;
`;

const TextFieldContainer = styled.div`
  margin: 16px 0;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 28px 0px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const ValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Must be at least 2 characters")
    .required("This field is required"),
  lastName: Yup.string()
    .min(2, "Must be at least 2 characters")
    .required("This field is required"),
  address: Yup.string().required("This field is required"),
  contactNumber: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("This field is required"),
  investorType: Yup.string()
    .oneOf(["individual", "individualTrustee", "company", "corporateTrustee"])
    .required("Please select an investor type")
});

const CreateProfilePage = () => {
  const { currentUser, currentUserProfile, setCurrentUserProfile } = useContext(AuthContext);
  const history = useHistory();

  const createProfile = async (firstName, lastName, address, contactNumber, investorType) => {
    try {
      console.log("in AuthContext createProfile function");
      const response = await axios.post("/profiles", {
        userId: currentUser._id,
        firstName,
        lastName,
        address,
        phone: contactNumber,
        investorType,
        appProgress: 0,
        approved: false,
        dateStarted: new Date(),
        profileImage: ""
      });
      console.log(response.data);
      const profile = response.data;
      setCurrentUserProfile(profile);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          address: "",
          contactNumber: "",
          investorType: "",
          profileImage: ""
        }}
        validationSchema={ValidationSchema}
        onSubmit={(values, { setSubmitting, setErrors, setStatus, resetForm }) => {
          try {
            setSubmitting(true);
            createProfile(values.firstName, values.lastName, values.address, values.contactNumber, values.investorType,values.profileImage);
            history.push(`/submit-documents/`);
            // resetForm();
            setStatus({ success: true });
          } catch (error) {
            setStatus({ success: false });
            setSubmitting(false);
            setErrors({ submit: error.message });
          }
        }}
      >
        {props => <CreateProfileForm {...props} />}
      </Formik>
    </Container>
  );
};

const CreateProfileForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  isValid,
  validateForm
}) => {
  useEffect(() => {
    (() => validateForm())();
  }, []);

  const uploadProfileImage = async () => {
    
    // const response = await axios.post(`/profiles/${userId}/uploadProfileImage}`)
    console.log("whatsup my dudes");
  };

  // console.log(touched)
  // console.log(errors)
  console.log(values);
  // console.log(isValid)

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Please complete your profile</Title>
      <TextFieldContainer>
        <TextField
          required
          label="First name"
          type="text"
          name="firstName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
          touched={touched.firstName}
          error={errors.firstName}
        />
      </TextFieldContainer>
      <TextFieldContainer>
        <TextField
          required
          label="Last name"
          type="text"
          name="lastName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
          touched={touched.lastName}
          error={errors.lastName}
        />
      </TextFieldContainer>
      <TextFieldContainer>
        <TextField
          required
          label="Address"
          type="text"
          name="address"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.address}
          touched={touched.address}
          error={errors.address}
        />
      </TextFieldContainer>
      <TextFieldContainer>
        <TextField
          required
          label="Contact number"
          type="tel"
          name="contactNumber"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.contactNumber}
          touched={touched.contactNumber}
          error={errors.contactNumber}
        />
      </TextFieldContainer>
      <TextFieldContainer>
        <SelectInvestorType
          required
          name="investorType"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.investorType}
          touched={touched.investorType}
          error={errors.investorType}
        />
      </TextFieldContainer>
      <UploadProfileImage/>
      {/* <p>Profile Image(optional)</p>
      <Input
        name="profileImage"
        type="file"
        label="Choose A Profile Image(optional)"
        // style={{ display: "none" }}
        onChange={handleChange}
        value={values.profileImage}
      >
        Choose A file
      </Input> */}
      <ButtonContainer>
        <PrimaryButton
          label="submit"
          name="submit"
          onChange={handleChange}
          type="submit"
          disabled={isSubmitting || (!isValid && touched !== {})}
        >
          Submit
        </PrimaryButton>
      </ButtonContainer>
    </Form>
  );
};

export default CreateProfilePage;
