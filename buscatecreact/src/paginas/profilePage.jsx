import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import Navbar from 'components/Navbar';
import { useAuth } from 'hooks/auth';
import { useLocation } from 'react-router';
import { profile} from 'hooks/search';
import { useState } from 'react';
import { set } from 'date-fns';
import { get } from 'react-hook-form';
import { db } from "lib/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

export default function ProfilePage() {
  const {user, isLoading} = useAuth();
  const [profile_data, setProfile] = useState("");
  const variable = useLocation();
  const id = variable.search.split('=')[1];
  const matricula = variable.search.split('=')[1];
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(profile_data.name);
  const [editedPhone, setEditedPhone] = useState(profile_data.PhoneNo)
  const {editedEmail, setEditedEmail} = useState(profile_data.email)


  const isMe = user?.matricula === matricula;
  
  useEffect(() => {
    getUser();
  },[])

  const getUser = () => {
    const getFromFirebase = collection(db,"users");
    getDocs(getFromFirebase).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data().matricula);
        if(doc.data().matricula === matricula){
          setProfile(doc.data());
        }
      });
    });
    console.log("datos");
    console.log(profile_data);
  }

  const handleSaveClick = async () => {
    const updatedData = {
      name: editName,
      PhoneNo: editedPhone,
    }

    const userRef = doc(db, "users", user?.id);
    try {
      await updateDoc(userRef, updatedData);
      console.log("Document updated successfully");
      setEditName(updatedData.name);
      setEditedPhone(updatedData.PhoneNo);
      setEditMode(false);
    } catch (error){
      console.error("Error", error);
    }
  };

  return (
    <section style={{ backgroundColor: '#eee' }}>
    <Navbar />
    <MDBContainer>
      <MDBRow>
        <MDBCol lg="4">
          {editMode ? ( // Show edit fields when in edit mode
          <div>
            {/* Input fields and "Save" button here */}
            <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <input
                type="text"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
              <input
                type="text"
                value={editedPhone}
                onChange={(e) => setEditedPhone(e.target.value)}
              />
              <MDBBtn onClick={handleSaveClick}>Save</MDBBtn>
          </div>
          ) : (
            <div>
            <MDBBtn onClick={() => setEditMode(true)}>Edit Profile</MDBBtn>
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid
                />
                <p className="text-muted mb-1">Puesto</p>
                <p className="text-muted mb-4">{profile_data?.matricula}</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">Message</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fas icon="globe fa-lg text-warning" />
                    <MDBCardText>LINK A PAGINA WEB</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                    <MDBCardText>PONER TU GITHUB</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-contentbetween align-items-center p-3">
                    <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                    <MDBCardText>@X</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                    <MDBCardText>INSTASGRAM</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                    <MDBCardText>FACEBOOK</MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
            </div>
          )}
        </MDBCol>

        <MDBCol lg="8">
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Full Name</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">
                    {editMode ? (
                      // Editable input field for name
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    ) : (
                      profile_data?.name
                    )}
                  </MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Email</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">
                    {editMode ? (
                      // Editable input field for email
                      <input
                        type="text"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                      />
                    ) : (
                      profile_data?.email
                    )}
                  </MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Phone</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">
                    {editMode ? (
                      // Editable input field for phone
                      <input
                        type="text"
                        value={editedPhone}
                        onChange={(e) => setEditedPhone(e.target.value)}
                      />
                    ) : (
                      profile_data?.phone
                    )}
                  </MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              {/* Add other fields similarly */}
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Mobile</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">
                  </MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Address</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">
                  </MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
            </MDBCardBody>
          </MDBCard>

            <MDBRow>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    {/* ESTO SERA EDITABLE PARA QUE PONGAS TUS SKILLLS EN CADA UNA */}
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">SKILLS </span> ESPICIALIZACION DE LA SKILL</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
{/* ESTO SERA EDITABLE PARA QUE PONGAS TUS SKILLLS EN CADA UNA, iguale esta o dejar solo una tsrjeta?*/}
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                    </MDBProgress>

                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                    </MDBProgress>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}