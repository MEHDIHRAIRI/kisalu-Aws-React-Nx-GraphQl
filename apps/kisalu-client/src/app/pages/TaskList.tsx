import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listTodos } from '../../graphql/queries';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/react';
import Card from '../../components/TaskCard';
import { Todo } from '../../API';
import '../pages/Tasks.css';

const TaskList: React.FC = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchTodos();
  }, []);
  async function fetchTodos() {
    try {
      const todoData: any = await API.graphql(graphqlOperation(listTodos));
      //const {data} = todoData ;
      setTodos(todoData.data.listTodos.items);
      console.log(todoData.data.listTodos.items);
    } catch (err) {
      console.log('error fetching todos', err);
    }
  }
  return (
    <IonPage>
      <IonHeader className="bg-blue-500">
        <IonToolbar>
          <IonTitle className="text-center">Task List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="start">
          {todos.map((e: Todo, index) => (
            <Card key={index} id={e.id} title={e.title} date={e.date} />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TaskList;
