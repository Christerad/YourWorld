import { IonContent, IonPage, IonRow, IonCol, IonText, IonRange, IonAlert
    , IonInput, IonItem, IonLabel,  IonFab, IonFabButton, IonModal, IonButton, IonChip, isPlatform, IonToolbar} from '@ionic/react';
import { IonIcon } from '@ionic/react';
import { add, bookSharp, schoolSharp ,documentsSharp , clipboard, closeCircle} from "ionicons/icons";
import React, { useState} from 'react';

import { useHistory } from 'react-router';

import { getDatabase, ref, onValue, set, push, child, update} from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import ProfilePicture from '../Controller/ProfilePicture'
import LevelController from '../Controller/LevelController'
import ExperienceController from '../Controller/ExperienceController';
import TodoList2 from './TodoList';



const Todo: React.FC = () => {
    //console.log('todopage')
    const [ProfilePhotoURL, SetProfilePhotoURL] = useState<string | any>()
    const [Username, SetUsername] = useState<string | any>()
    const [UID,SetUID] = useState<string | any>()

    const [Level, SetLevel] = useState<Number | any>()
    const [XP, SetXP] = useState<Number| any>()
    const [showModalTodo, setShowModalTodo] = useState(false);
    const [showAlert1, setShowAlert1] = useState(false);
    const [ErrorMessage, SetErrorMessage]=useState('')
    const [ErrorCode, SetErrorCode]=useState('')


    // const formatDate = (value: string) => {
    //     return format(parseISO(value), 'dd MMM yyyy');
    //   };

    const[Taskname,SetTaskName] =useState<string>()
    const[Keterangan,SetKeterangan] =useState<string>()
    const[Difficulty,SetDiffculty]=useState<number>(1)
    const[DueDate,SetDuedate]=useState('')
    const[DueDateBackend,SetDuedateBackend]=useState('')
    const[Importance,SetImportance]=useState<number>(1)
    const[StudyState,SetStudyState]=useState<Boolean>(false)
    const[ClassState,SetClassState]=useState<Boolean>(false)
    const[HomeWorkState,SetHomeWorkState]=useState<Boolean>(false)
    const[TestState,SetTestState]=useState<Boolean>(false)

    const [popoverDate2, setPopoverDate2] = useState('');

    // const backendDateSaving=(ValueDate : Date)=>{
    //     setPopoverDate2(ValueDate)
    // }

    const getUserPhotoURLname= async (photoURL2: string | null,username : string | null)=>{
        SetProfilePhotoURL(photoURL2);
        SetUsername(username);
    }

    const getUserData= async (uid: string)=>{
        const ref1 = ref(db, 'users/' + uid );
        onValue(ref1, (snapshot) => {
            const data = snapshot.val();
            //console.log('level :',data.Level);
            SetLevel(data.Level)
            //console.log('XP :',data.XP);
            SetXP(data.XP)

          });
    }

    // LEON
    const history = useHistory();
    const auth = getAuth();
    const db = getDatabase();
    //console.log('db :',db)



        onAuthStateChanged(auth, (user) => {
            if (user) {
              //console.log('User :',user)
              const uid = user.uid;
              //console.log('UID :',UID)
              const UserPhotoURL=user.photoURL;
              const username=user.displayName
              SetUID(uid);
              getUserData(uid);
              getUserPhotoURLname(UserPhotoURL,username);
              
            } else {
                history.push('/login');
            }
              });


    async function AddTodoList(uid: string){
        if(!Taskname)
        {
            SetErrorCode('Name is Empty');
            SetErrorMessage('Name Field Is Required.');
            return false
        }
        else if(!Keterangan)
        {
            SetErrorCode('Keterangan is Empty');
            SetErrorMessage('Keterangan Field Is Required.');
            return false
        }
        else if(!DueDate)
        {
            SetErrorCode('DueDate is Empty');
            SetErrorMessage('DueDate Field Is Required.');
            return false
        }else{
            const newPostKey = push(child(ref(db), 'Schedule/'+uid)).key;
            const postData = {
                TaskName: Taskname,
                Keterangan: Keterangan,
                Difficulty: Difficulty,
                DueDate : DueDate,
                Importance : Importance,
                tags :{
                    Study      : StudyState,
                    HomeWork   : HomeWorkState,
                    Test       : TestState,
                    Class      : ClassState
                },
                StatusBerhasil :false,
                StatusGagal :false,
                StatusSelesai:false
              };
            console.log('data :',postData)
            const res1 = await update(ref(db,'/Schedule/' + uid + '/' + newPostKey), postData).then(() => {
                // Data saved successfully!
                return true
              })
              .catch((error) => {
                // The write failed...
                console.log('Error code :',error.code)
                console.log('Error Message :',error.message)
                SetErrorCode(error.message);
                SetErrorMessage(error.message);
                return false
              });
            return res1
        }
    }    

    async function AddTodoList1() {
        const res = await AddTodoList(UID)
        console.log(`${res ? 'Register success' : 'Register failed'}`)
        if (res)
        {
            setShowModalTodo(false)
        } 
        else 
        {
            setShowAlert1(true);
        }
    }
    async function changestatus(status :Boolean){
        //console.log('Current Status :',status)
        if (status == true)
        {   
            //console.log('returned false')
            return false
        }
        else{
            //console.log('returned true')
            return true 
        } 
    }

    const OpenModal=()=>{
        SetTaskName('')
        SetKeterangan('')
        SetDiffculty(1)
        SetDuedate('')
        setPopoverDate2('')
        SetImportance(1)
        SetStudyState(false)
        SetClassState(false)
        SetHomeWorkState(false)
        SetTestState(false)
        setShowModalTodo(true)
    }

return(
    <IonPage>
    {isPlatform('desktop') && (
        <IonToolbar>
            <IonRow class='ion-justify-content-center'>
                <IonText>Schedule</IonText>
            </IonRow>
        </IonToolbar>
    )}
    <IonContent>
        <IonRow  >
            <IonCol class="ion-text-center" size='size-xs'>
                <ProfilePicture PhotoUrl={ProfilePhotoURL} />
            </IonCol>
            <IonCol>
                <IonRow>
                    <IonText> {Username} </IonText>
                </IonRow>
                <IonRow>
                    <LevelController LvL={Level} />
                </IonRow>
                <ExperienceController LvL={Level} XP={XP} MaxXP={Level*3} />
            </IonCol> 
        </IonRow>
        <IonRow>
                    <h6>*Swipe Right of left to decide success or not </h6>
                </IonRow>
        <IonRow>
            <IonCol>
                <TodoList2 UID={UID} />
            </IonCol>
        
        </IonRow>


        <IonFab slot="fixed"  vertical="bottom" horizontal="end"  id="trigger-button-formtodo" onClick={OpenModal}>
            <IonFabButton id='Add-Todolist'>
                <IonIcon src={add}/>
            </IonFabButton>
        </IonFab>

        <IonModal trigger="trigger-button-formtodo" isOpen={showModalTodo} showBackdrop={false}>
            <IonContent>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating"> Name</IonLabel>
                            <IonInput
                                id="Input-name"
                                type="text"
                                placeholder="Input Task name"
                                onIonChange={(e: any) => SetTaskName(e.target.value)}
                                >
                            </IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating"> Keterangan</IonLabel>
                            <IonInput
                                id="Input-keterangan"
                                type="text"
                                placeholder="Input Additional Information"
                                onIonChange={(e: any) => SetKeterangan(e.target.value)}
                                >
                            </IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating"> Difficulty</IonLabel>
                            <IonRange min={1} max={4} step={1} value={Difficulty} snaps={true} onIonChange={(e: any) => SetDiffculty(e.target.value)}/>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating"> DueDate</IonLabel>
                            <IonInput type='date' id="date-input-2" onIonChange={(e: any) => SetDuedate(e.target.value)}/>
                            {/* <IonButton fill="clear" id="open-date-input-2">
                                <IonIcon icon={calendar} />
                            </IonButton>
                            <IonPopover trigger="open-date-input-2"  showBackdrop={false} dismissOnSelect={true}> 
                                <IonDatetime presentation="date"
                                    onIonChange={ev => setPopoverDate2(ev.detail.value!)} >
                                </IonDatetime>
                            </IonPopover> */}
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonItem>
                            <IonLabel position="floating"> Importance</IonLabel>
                            <IonRange min={1} max={10} step={1} value={Importance} ticks={true} snaps={true} onIonChange={(e: any) => SetImportance(e.target.value)}/>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                        <IonChip onClick={async ()=>SetStudyState( await changestatus(StudyState))} >
                            <IonIcon src={bookSharp}/>
                            <IonLabel>Study</IonLabel>
                            {StudyState &&(
                                    <IonIcon src={closeCircle} />
                            )}
                            
                        </IonChip>
                        <IonChip onClick={async ()=>SetClassState( await changestatus(ClassState))}>
                            <IonIcon src={schoolSharp}/>
                            <IonLabel>Class</IonLabel>
                            {ClassState && (
                                <IonIcon src={closeCircle} />
                            )}
                        </IonChip>
                        <IonChip onClick={async ()=>SetHomeWorkState( await changestatus(HomeWorkState))}>
                            <IonIcon src={clipboard}/>
                            <IonLabel>Homework</IonLabel>
                            {HomeWorkState && (
                                <IonIcon src={closeCircle} />
                            )}
                        </IonChip>
                        <IonChip onClick={async ()=>SetTestState( await changestatus(TestState))}>
                            <IonIcon src={documentsSharp}/>
                            <IonLabel>Test</IonLabel>
                            {TestState && (
                                <IonIcon src={closeCircle} />
                            )}
                        </IonChip>
                </IonRow>
                <IonRow>
                    <IonCol  class="ion-align-self-center" >
                        <IonButton onClick={AddTodoList1}> OK</IonButton>
                    </IonCol>
                    <IonCol  class="ion-align-self-center">
                        <IonButton onClick={() => setShowModalTodo(false)}> Cancel</IonButton>
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
        </IonModal>
    </IonContent>
</IonPage>

);

};
export default Todo;