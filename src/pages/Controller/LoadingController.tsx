import { IonContent, IonHeader, IonPage, IonRow, IonCol, IonImg, IonText, IonLabel,IonLoading
    ,IonItem, IonList} from '@ionic/react';
import { IonIcon } from '@ionic/react';
import { personCircle,calendar, documentText, podium, trophy } from "ionicons/icons";
import React, { useState, useRef, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { useHistory } from 'react-router';




const LoadingController: React.FC<{Show : boolean}> = (props) => {

    return(
        <IonContent>
            
        </IonContent>
    )


};

export default LoadingController;