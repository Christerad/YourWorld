import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonCol
    , IonInput, IonItem, IonLabel, IonButton, IonAlert, IonImg } from '@ionic/react';

import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { getAuth, createUserWithEmailAndPassword , updateProfile} from "firebase/auth";
import { useHistory } from 'react-router';
import { getDatabase, ref, set, push, child, update} from "firebase/database";

import MainIcon from '../../components/Image/Icon.png'
const Register: React.FC = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, confirmsetPassword] = useState('')
    
    console.log('Opening Register')

    const [showAlert1, setShowAlert1] = useState(false);
    const [ErrorMessage, SetErrorMessage]=useState('')
    const [ErrorCode, SetErrorCode]=useState('')
    const auth=getAuth();

    const history = useHistory();

    

    const formatDate = (value: string) => {
        return format(parseISO(value), 'dd MMM yyyy');
      };

       async function registerUser(email:string, password:string){
           if(!name)
           {
            SetErrorCode('Name is Empty');
            SetErrorMessage('Name Field Is Required.');
            return false
           }
           else if (!email) {
            SetErrorCode('Email is Empty');
            SetErrorMessage('Email Field Is Required.');
            return false
           }else if (!password) {
            SetErrorCode('Password is Empty');
            SetErrorMessage('Password Field Is Required.');
            return false
           }else if (!confirmpassword) {
            SetErrorCode('Repeat Password is Empty');
            SetErrorMessage('Repeat Password Field Is Required.');
            return false
           }
           else if (password !== confirmpassword) {
            SetErrorCode('Incorrect Confirmed Passwor');
            SetErrorMessage('Password Field Is not the same with ConfirmPassword.');
            return false
           }else{
            const db = getDatabase();
            const res =  await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                updateProfile(user, {
                    displayName: name, photoURL: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/profile-design-template-4c23db68ba79c4186fbd258aa06f48b3_screen.jpg?ts=1581063859"
                }).then(() => {
                    console.log('success:',user)
                });
                
                
                console.log('DB :',db)
                console.log('User :',user.uid)
                set(ref(db, 'users/' + user.uid), {
                    username: name,
                    email: email,
                    Level: 1,
                    XP :0,
                    TaskDone :0,
                    SummonTicket :1,
                    FieldTicket :1,
                    TaskDoneQuickly :0,
                    TaskStudyDone :0,
                    TaskTestDone:0,
                    TaskClassDone:0,
                    TaskHomeWorkDone:0,                        
                    SummonPulled:0,
                    FieldClaimed:0
                });

                const newPostKey = push(child(ref(db), 'World/'+user.uid)).key;
                const postData = {
                    Planted : false
                  };
                console.log('data :',postData)
                const res1 = update(ref(db,'/World/' + user.uid + '/' + newPostKey), postData).then(() => {
                    console.log('World Updated')
                    //return true
                  })
                
                return true
              })
            .catch((error) => {
                console.log('Error code :',error.code)
                console.log('Error Message :',error.message)
                SetErrorCode(error.message);
                SetErrorMessage(error.message);
              });      

            console.log(res)
            return res
            }

    }

    async function register() {
        const res = await registerUser(email, password)
        console.log(`${res ? 'Register success' : 'Register failed'}`)
        if (res)
        {
            history.push("/Schedule")
        } 
        else 
        {
            setShowAlert1(true);
        }
    }
return (
<IonPage>
    <IonHeader>
        <IonToolbar>
            <IonTitle>Register Page</IonTitle>
        </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
        <IonRow>
            <IonCol class='ion-text-center'>
                <IonImg
                style={{ fontSize: "100px"}}
                 src={MainIcon}>

                 </IonImg>
                {/* <IonIcon 
                    style={{ fontSize: "100px", color: "#0040ff" }}
                    icon={personCircle}
                /> */}
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol>
                <IonItem>
                    <IonLabel position="floating"> Name</IonLabel>
                    <IonInput
                        id="Input-name"
                        type="text"
                        placeholder="Input Email"
                        onIonChange={(e: any) => setName(e.target.value)}
                        >
                    </IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating"> Email</IonLabel>
                    <IonInput
                        id="login-email"
                        type="email"
                        placeholder="Input Email"
                        onIonChange={(e: any) => setEmail(e.target.value)}
                        >
                    </IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating"> Password</IonLabel>
                    <IonInput
                        //   onIonInput={(e: any) => setPassword(e.target.value)}
                        id="login-password"
                        type="password"
                        placeholder="Input password"
                        onIonChange={(e: any) => setPassword(e.target.value)}
                    >
                    </IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Repeat Password</IonLabel>
                    <IonInput
                        //   onIonInput={(e: any) => setPassword(e.target.value)}
                        id="login-password"
                        type="password"
                        placeholder="Repeat password"
                        onIonChange={(e: any) => confirmsetPassword(e.target.value)}
                    >
                    </IonInput>
                </IonItem>
                <IonRow>
                    <IonCol class='ion-text-center'>
                        <IonButton className="button1" onClick={register}  class="button">
                            Register
                        </IonButton>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonItem>
                        <IonLabel class="to-register">
                        Already have an account? <a href="/Login">Login Here</a>
                        </IonLabel>
                    </IonItem>
                </IonRow>
            </IonCol>
        </IonRow>
        <IonRow>
            {/* <IonCol class='ion-text-center'>
                
                <IonCard onClick={LoginGoogle} class="google1">
                    <IonIcon icon={logoGoogle} size='large'> </IonIcon>
                </IonCard>
            </IonCol> */}
        </IonRow>
        <IonAlert
          isOpen={showAlert1}
          onDidDismiss={() => setShowAlert1(false)}
          cssClass='my-custom-class'
          header={ErrorCode}
          message={ErrorMessage}
          buttons={['OK']}
        />
    </IonContent>
</IonPage>
    );
  };
  
  export default Register;