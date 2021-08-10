
import React from "react";
import { IonMenu, IonContent, IonList, IonItem, IonRouterOutlet } from '@ionic/react';

const Header: React.FC = () => (
  <IonMenu side="start" >
    <IonContent>
      <IonList>
        <IonItem>Menu Item</IonItem>
        <IonItem>Menu Item</IonItem>
        <IonItem>Menu Item</IonItem>
        <IonItem>Menu Item</IonItem>
        <IonItem>Menu Item</IonItem>
      </IonList>
    </IonContent>
  </IonMenu>
  );

export default Header;
