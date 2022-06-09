import { Redirect, Route, useHistory } from 'react-router-dom';
import {
  IonApp,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonRouterOutlet,
  IonRow,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonText,
  IonTitle,
  IonToolbar,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';

import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

import {} from './FirebaseConfig'


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import ProfilePicture from './pages/Controller/ProfilePicture'
import LevelController from './pages/Controller/LevelController'
import ExperienceController from './pages/Controller/ExperienceController';

import Leaderboard from './pages/Gamification/Leaderboard'
import World from './pages/Gamification/World/World';
import Todolist from './pages/Gamification/TodoPage';
import Schedule from './pages/Gamification/Schedule';
import Achievements2 from './pages/Gamification/Achievements2';
import Gacha from './pages/Gamification/Gacha/Gacha';
import Prob from './pages/Gamification/Prob';
import Profile from './pages/Gamification/Profile'
import Tutorial from './pages/Gamification/Tutorial'


import {calendar, documentText, podium, trophy, globe, leaf } from "ionicons/icons";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { isPlatform } from '@ionic/core';
import { useState } from 'react';
import { getDatabase, onValue, ref } from 'firebase/database';
setupIonicReact();


const App: React.FC = () => {

  const [ProfilePhotoURL, SetProfilePhotoURL] = useState<string | any>()
  const [Username, SetUsername] = useState<string | any>()
  const [Level, SetLevel] = useState<Number | any>()
  const [XP, SetXP] = useState<Number| any>()
  
  const [UID,SetUID] = useState<string | any>()

  const getUserPhotoURLname= async (photoURL2: string | null,username : string | null)=>{
      SetProfilePhotoURL(photoURL2);
      SetUsername(username);
  }

  const getUserData= async (uid: string)=>{
      const ref1 = ref(db, 'users/' + uid );
      onValue(ref1, (snapshot) => {
          const data = snapshot.val();
          SetLevel(data.Level)
          SetXP(data.XP)
        });
  }

  const history = useHistory();
  const auth = getAuth();
  const db = getDatabase();
  
  // onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //         const uid = user.uid;
  //         const UserPhotoURL=user.photoURL;
  //         const username=user.displayName
  //         SetUID(uid);
  //         getUserData(uid);
  //         getUserPhotoURLname(UserPhotoURL,username);
  //     } else {
  //       history.push("/Login")
  //     }
  // });

  if(isPlatform('mobile')){
  return (
    <IonApp>
      <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/">
                <Redirect to="/Login" />
            </Route>
            <Route path ='/Login' >
                <Login />
            </Route>
            <Route  path ='/Register' >
                <Register />
            </Route>
            <Route  path ='/Profile' >
                <Profile />
            </Route>

            
              <IonTabs >
                  <IonRouterOutlet>
                      <Route path='/World' >
                        <World />
                      </Route>
                      <Route path='/Todolist'  >
                        <Todolist/>
                      </Route>
                      <Route path='/Schedule' exact>
                        <Schedule/>
                      </Route>
                      <Route path='/Achievements2' >
                        <Achievements2/>
                      </Route>
                      <Route path='/Leaderboard'  >
                        <Leaderboard/>
                      </Route>
                      <Route path='/Gacha'  >
                        <Gacha/>
                      </Route>
                      <Route path='/Prob'  >
                        <Prob/>
                      </Route>
                      <Route  path ='/Tutorial' >
                          <Tutorial />
                      </Route>
                  </IonRouterOutlet>
                  <IonTabBar slot="bottom">
                        <IonTabButton tab="Profile" href='/World'>
                          <IonIcon icon={globe} class='IconAuto'/>
                            <IonLabel>World</IonLabel>
                      </IonTabButton>

                      <IonTabButton tab="Todolist" href='/Todolist' >
                          <IonIcon icon={documentText} class='IconAuto'/>
                            <IonLabel>To-do List</IonLabel>
                      </IonTabButton>

                      <IonTabButton tab="schedule" href='/Schedule'>
                          <IonIcon icon={calendar} class='IconAuto'/>
                          <IonLabel>Schedule</IonLabel>
                      </IonTabButton>

                      <IonTabButton tab="Achievements" href='/Achievements2'>
                          <IonIcon icon={trophy} class='IconAuto'/>
                          <IonLabel>Achievements</IonLabel>
                      </IonTabButton>

                      <IonTabButton tab="Leaderboard" href='/Leaderboard'>
                          <IonIcon icon={podium} class='IconAuto'/>
                          <IonLabel>Leaderboard</IonLabel>
                      </IonTabButton>

                      <IonTabButton tab="Gacha" href='/Gacha'>
                          <IonIcon icon={leaf} class='IconAuto'/>
                            <IonLabel>summon</IonLabel>
                      </IonTabButton>
                  </IonTabBar>
              </IonTabs>
          </IonRouterOutlet>
      </IonReactRouter>
      {/* <IonMenu side="start" menuId="first">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Start Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>Menu Item</IonItem>
            <IonItem>Menu Item</IonItem>
            <IonItem>Menu Item</IonItem>
            <IonItem>Menu Item</IonItem>
            <IonItem>Menu Item</IonItem>
          </IonList>
        </IonContent>
      </IonMenu> */}
    </IonApp>
  )  }
  else 
  return(
    <IonApp>
      <IonReactRouter>
        <IonMenu side="start" contentId='First'>
          <IonContent>
            <IonList>
              <IonItem href='/World'>
                  <IonIcon icon={globe} class='IconAuto'/>
                  <IonLabel>World</IonLabel>
              </IonItem>
              <IonItem href='/Todolist'>
                  <IonIcon icon={documentText} class='IconAuto'/>
                  <IonLabel>To-do List</IonLabel>
              </IonItem>
              <IonItem href='/Schedule'>
                  <IonIcon icon={calendar} class='IconAuto'/>
                  <IonLabel>Schedule</IonLabel>
              </IonItem>
              <IonItem href='/Achievements2'>
                  <IonIcon icon={trophy} class='IconAuto'/>
                  <IonLabel>Achievements</IonLabel>
              </IonItem>
              <IonItem href='/Leaderboard'>
                  <IonIcon icon={podium} class='IconAuto'/>
                  <IonLabel>Leaderboard</IonLabel>
              </IonItem>
              <IonItem href='/Gacha'> 
                  <IonIcon icon={leaf} class='IconAuto'/>
                  <IonLabel>summon</IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
        </IonMenu>

      
        <IonRouterOutlet id='First'>
          <Route exact path="/">
              <Redirect to="/Login" />
          </Route>
          <Route path ='/Login' >
              <Login />
          </Route>
          <Route  path ='/Register' >
              <Register />
          </Route>
          <Route  path ='/Profile' >
              <Profile />
          </Route>
          <Route path='/World' >
            <World />
          </Route>
          <Route path='/Todolist'  >
            <Todolist/>
          </Route>
          <Route path='/Schedule' exact>
            <Schedule/>
          </Route>
          <Route path='/Achievements2' >
            <Achievements2/>
          </Route>
          <Route path='/Leaderboard'  >
            <Leaderboard/>
          </Route>
          <Route path='/Gacha'  >
            <Gacha/>
          </Route>
          <Route path='/Prob'  >
            <Prob/>
          </Route>
          <Route  path ='/Tutorial' >
                <Tutorial />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>

      < IonHeader>
        <IonToolbar>
          <IonButtons slot='start' >
            <IonMenuButton />
          </IonButtons>
          {/* <IonRow  >
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
                    </IonRow> */}
        </IonToolbar>
      </IonHeader>
    </IonApp>
  )
  };
export default App;
