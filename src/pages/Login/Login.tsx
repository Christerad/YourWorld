import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonCol
, IonInput, IonItem, IonLabel, IonButton, IonCard, IonImg, IonAlert } from '@ionic/react';
import { IonIcon } from '@ionic/react';
import { logoGoogle } from "ionicons/icons";
import "./Login.css";
import { useHistory } from 'react-router';
import { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider,signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
import { getDatabase, ref, child, get, set } from "firebase/database";

import MainIcon from '../../components/Image/Icon.png'

const Login: React.FC = () => {
    const auth = getAuth();
    const history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ErrorMessage, SetErrorMessage]=useState('')
    const [ErrorCode, SetErrorCode]=useState('')
    const [showAlert1, setShowAlert1] = useState(false);

    console.log('Opening Login')

    async function LoginGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((result) => { 
            const userID = result.user.uid;
            const userName = result.user.displayName;
            const UserEmail = result.user.email;
            console.log('user ID :',userID)
            console.log('user userName :',userName)
            console.log('user UserEmail :',UserEmail)

            get(child(ref(getDatabase()), 'users/'+userID))
            .then((snapshot) => {
                if (snapshot.exists()) {
                //   console.log(snapshot.val());
                } else {
                    console.log("No data available");
                    set(ref(getDatabase(), 'users/' +   userID), {
                        username: userName,
                        email: UserEmail,
                        Level: 1,
                        XP :0, 
                        TaskDone :0,
                        TaskDoneQuickly :0,
                        TaskStudyDone :0,
                        TaskTestDone:0,
                        TaskClassDone:0,
                        TaskHomeWorkDone:0,
                        SummonTicket :1,
                        FieldTicket :1,
                        SummonPulled:0,
                        FieldClaimed:0
                    });
                }
            }).catch((error) => {
                console.error(error);
              })
            ;
            console.log('login success')
            history.push("/Schedule")
        }).catch((error) => {
            console.log('login gagal')
            console.log('error :',error)
        });
        // const user = auth.currentUser;  
    }

    async function loginUser(email:string, password:string){
            const res =  await signInWithEmailAndPassword(auth, email, password)
            .catch((error) => {
                console.log('Error code :',error.code)
                console.log('Error Message :',error.message)
                SetErrorCode(error.message);
                SetErrorMessage(error.message);
            });
            const user = auth.currentUser;            
            console.log('user : ',user)
            console.log(res,'res')
            return res
    }

    async function login() {
        const res = await loginUser(email, password)
         console.log(`${res ? 'login success' : 'login failed'}`)
        if (res)
        {
            history.push("/Schedule")
        } 
        else 
        (
            setShowAlert1(true)
        )
    }

    const db = getDatabase();
    //console.log('db :',db)

    onAuthStateChanged(auth, (user) => {
        if (user) {
          //console.log('User :',user)

          history.push('/Schedule');
          
        } 
      });
return (


<IonPage>
    <IonHeader>
        <IonToolbar>
            <IonTitle>Login Page</IonTitle>
        </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
        <IonRow>
            <IonCol class='ion-text-center'>
                <IonRow class='ion-justify-content-center'>
                    <IonImg
                        class='Main-Icon'
                        src={MainIcon}>

                        </IonImg>
                </IonRow>

            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol>
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
                <IonRow>
                    <IonCol class='ion-text-center'>
                        <IonButton className="button1" onClick={login}  class="button">
                            Login
                        </IonButton>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonItem>
                        <IonLabel class="to-register">
                        Don't have an account? <a href="Register">Register Here</a>
                        </IonLabel>
                    </IonItem>
                </IonRow>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol class='ion-text-center'>
                
                <IonCard onClick={LoginGoogle} class="google1">
                    <IonIcon icon={logoGoogle} size='large'> </IonIcon>
                </IonCard>
            </IonCol>
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
  
  export default Login;