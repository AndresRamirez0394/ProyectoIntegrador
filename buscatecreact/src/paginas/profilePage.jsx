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
import Sidebar from 'components/Sidebar';
import { Box } from '@mui/system';

export default function ProfilePage() {
  const {user, isLoading} = useAuth();
  const [profile_data, setProfile] = useState("");
  const variable = useLocation();
  const id = variable.search.split('=')[1];
  const matricula = variable.search.split('=')[1];
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(profile_data.name);
  const [editedPhone, setEditedPhone] = useState(profile_data.PhoneNo)
  const [editedEmail, setEditedEmail] = useState(profile_data.email)
  const [webDesignLevel, setWebDesignLevel] = useState(10);
  const [softwareLevel, setSoftwareLevel] = useState(10);
  const [mobileLevel, setMobileLevel] = useState(10);
  const [frontLevel, setFrontLevel] = useState (10);
  const [backLevel, setBackLevel] = useState (10);

  const [experience1Title, setExperience1Title] = useState('');
  const [experience1Description, setExperience1Description] = useState('');

  const [experience2Title, setExperience2Title] = useState('');
  const [experience2Description, setExperience2Description] = useState('');

  const [experience3Title, setExperience3Title] = useState('');
  const [experience3Description, setExperience3Description] = useState('');

  const [experience4Title, setExperience4Title] = useState('');
  const [experience4Description, setExperience4Description] = useState('');

  const [isEditingExperience, setIsEditingExperience] = useState(false);

  const saveExperience = async () => {
    const updatedData = {
      titulo1: experience1Title,
      experiencia1: experience1Description,
      titulo2: experience2Title,
      experiencia2: experience2Description,
      titulo3: experience3Title,
      experiencia3: experience3Description,
    }
    const userRef = doc(db, "users", user?.id);
    try {
      await updateDoc(userRef, updatedData);
      console.log("Document updated successfully");
      setExperience1Title(updatedData.titulo1);
      setExperience1Description(updatedData.experiencia1);
      setExperience2Title(updatedData.titulo2);
      setExperience2Description(updatedData.experiencia2);
      setIsEditingExperience(false);
    } catch (error){
      console.error("Error", error);
    }
  };

  console.log("matricula a buscar" +  matricula);
  const isMe = user?.matricula === matricula;
  
  useEffect(() => {
    const fetchData = async () => {
      await getUser();
    };
    fetchData();
  },[])


  const getUser = async () => {
    const getFromFirebase = collection(db,"users");
    const querySnapshot = await getDocs(getFromFirebase);

    querySnapshot.forEach((doc) => {
      if (doc.data().matricula === matricula){
        setProfile(doc.data());

        setExperience1Title(doc.data().titulo1 || '');
        setExperience1Description(doc.data().experiencia1 || '');
        setExperience2Title(doc.data().titulo2 || '');
        setExperience2Description(doc.data().experiencia2 || '');
        setEditedPhone(doc.data().PhoneNo || '');
      }
    });
  }

  const handleSaveClick = async () => {
    const updatedData = {
      name: editName,
      PhoneNo: editedPhone,
      email: editedEmail,
    }

    const userRef = doc(db, "users", user?.id);
    try {
      await updateDoc(userRef, updatedData);
      console.log("Document updated successfully");
      setEditName(updatedData.name);
      setEditedPhone(updatedData.PhoneNo);
      setEditedEmail(updatedData.email);
      setEditMode(false);
    } catch (error){
      console.error("Error", error);
    }
  };

  const saveSkillLevel = async (skillName, level) => {
    const updatedData = {
      [skillName]: level,
    };

    const userRef = doc(db, "users", user?.id);
    try {
      await updateDoc(userRef, updatedData);
      console.log("Skill level updated successfully");
    } catch (error){
      console.error("Error updating skill level", error);
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
            {isMe && (
            <MDBBtn onClick={() => setEditMode(true)}>Edit Profile</MDBBtn>
            )}
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
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">SKILLS </span> NIVEL DE PROEFICIENCIA</MDBCardText>
                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                    {isMe && (
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={webDesignLevel}
                      onChange={(e) => setWebDesignLevel(parseInt(e.target.value, 10))}
                    />
                    )}
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={(webDesignLevel / 20) * 100} valuemin={0} valuemax={100} />
                    </MDBProgress>
                      {isMe && (
                    <button onClick={() => saveSkillLevel('webDesignLevel', webDesignLevel)}>Save</button>
                    )}
                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Desktop Software Developer</MDBCardText>
                    {isMe && (
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={softwareLevel}
                      onChange={(e) => setSoftwareLevel(parseInt(e.target.value, 10))}
                    />
                    )}

                    <MDBProgress className="rounded">
                      <MDBProgressBar width={(softwareLevel / 20) * 100} valuemin={0} valuemax={100} />
                    </MDBProgress>
                    {isMe && (
                    <button onClick={() => saveSkillLevel('softwareLevel', softwareLevel)}>Save</button>
                    )}
                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Software Developer</MDBCardText>
                    {isMe && (
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={mobileLevel}
                      onChange={(e) => setMobileLevel(parseInt(e.target.value, 10))}
                    />
                    )}
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={(mobileLevel / 20) * 100} valuemin={0} valuemax={100} />
                    </MDBProgress>
                    {isMe && (
                    <button onClick={() => saveSkillLevel('mobileLevel', mobileLevel)}>Save</button>
                    )}
                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Frontend</MDBCardText>
                    {isMe && (
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={frontLevel}
                      onChange={(e) => setFrontLevel(parseInt(e.target.value, 10))}
                    />
                    )}

                    <MDBProgress className="rounded">
                      <MDBProgressBar width={(frontLevel / 20) * 100} valuemin={0} valuemax={100} />
                    </MDBProgress>
                    {isMe && (
                    <button onClick={() => saveSkillLevel('frontLevel', frontLevel)}>Save</button>
                    )}
                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend</MDBCardText>
                    {isMe && (
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={backLevel}
                      onChange={(e) => setBackLevel(parseInt(e.target.value, 10))}
                    />
                    )}
                    <MDBProgress className="rounded">
                      <MDBProgressBar width={(backLevel / 20) * 100} valuemin={0} valuemax={100} />
                    </MDBProgress>
                    {isMe && (
                    <button onClick={() => saveSkillLevel('backLevel', backLevel)}>Save</button>
                    )}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
{/* ESTO SERA EDITABLE PARA QUE PONGAS TUS SKILLLS EN CADA UNA, iguale esta o dejar solo una tsrjeta?*/}
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">EXPERIENCIA</span> Proyectos Anteriores</MDBCardText>
                    {(isEditingExperience || isMe) && (
                      <>
                    <ExperienceInputField
                      title={experience1Title}
                      setTitle={setExperience1Title}
                      description={experience1Description}
                      setDescription={setExperience1Description}
                    />

                    <ExperienceInputField
                      title={experience2Title}
                      setTitle={setExperience2Title}
                      description={experience2Description}
                      setDescription={setExperience2Description}
                    />

                    <ExperienceInputField
                      title={experience3Title}
                      setTitle={setExperience3Title}
                      description={experience3Description}
                      setDescription={setExperience3Description}
                    />

                    <ExperienceInputField
                      title={experience4Title}
                      setTitle={setExperience4Title}
                      description={experience4Description}
                      setDescription={setExperience4Description}
                    />

                    {/* Display "Save" button for previous experience */}
                    {isEditingExperience && (
                      <MDBBtn onClick={saveExperience}>Save Experience</MDBBtn>
                    )}
                  </>
                )}
                {isMe && !isEditingExperience && (
                  <MDBBtn onClick={() => setIsEditingExperience(true)}>
                    Edit Experience
                  </MDBBtn>
                )}
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
const ExperienceInputField = ({ title, setTitle, description, setDescription }) => (
  <>
    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>
      Title
    </MDBCardText>
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    <MDBCardText className="mb-1 mt-2" style={{ fontSize: '.77rem' }}>
      Description
    </MDBCardText>
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
  </>
);
