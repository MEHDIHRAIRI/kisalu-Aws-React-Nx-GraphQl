import React from "react";
import {
  IonCard,
  IonLabel,
  IonItem,
  IonCardContent,
  IonButton,
} from "@ionic/react";
import { API } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import { deleteTodo } from "../graphql/mutations";

const TaskCard: React.FC<{ title: string; date: string; id: any }> = ({
  title,
  date,
  id,
}) => {
  const deletedTodo = async (id: any) => {
    console.log(id);
    const todoDetails = {
      id: id,
    };
    
    await API.graphql({
      query: mutations.deleteTodo,
      variables: { input: todoDetails },
    });
  };
  
  

  return (
    <IonCard key={id}>
      <IonItem>
        <IonLabel>{title}</IonLabel>
        <IonButton fill="outline" slot="end" onClick={()=>deletedTodo(id)}>
          Delete
        </IonButton>
      </IonItem>

      <IonCardContent>due date: {date}</IonCardContent>
    </IonCard>
  );
};
export default TaskCard;
