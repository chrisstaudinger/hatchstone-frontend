import { React, useHistory, useContext } from "react";
import FileUpload from "./UploadFile";
import styled from "styled-components";
import { PrimaryButton } from "../../uiKit/Button";
import { PrimaryLink } from "../../uiKit/Link";
import { UserProgressA } from "../../uiKit/UserProgress";
import  UserContext  from "../../contexts/UserContext";



const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 70px 50px 100px 50px;
  width: 40vw;
  margin: 60px auto 0 auto;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.15);
`;
const UploadWrapper = styled.div`
  display: flex;
  /* justify-content: flex-start; */
  margin: 20px;
  flex-direction: column;
  align-items: flex-start;
`;

const SubmitDocuments = props => {
  const { currentUserProfile } = useContext(UserContext)
  const history = useHistory();
  const profileId = props.match.params.id;
  return (
    <>
      <UserProgressA />
      <Container>
        <h2>Upload Documents</h2>
        <p>Approved Identification</p>
        <FileUpload profileId={profileId} documentId={"Approved Identification"} label="Approved Identification" />
        <p>Proof of Address</p>
        <FileUpload profileId={profileId} documentId={"Proof of Address"} />
        <p>Accounting Statement</p>
        <FileUpload profileId={profileId} documentId={"Accounting Statement"} />
        <PrimaryButton onClick={history.push(`/conversations/${currentUserProfile._id}`)}>Submit</PrimaryButton>
        <PrimaryLink onClick={history.push(`/conversations/${currentUserProfile._id}`)}>Skip</PrimaryLink>
      </Container>
    </>
  );
};

export default SubmitDocuments;
