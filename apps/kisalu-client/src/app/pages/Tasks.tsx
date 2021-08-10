import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonPage,
  IonItem,
  IonInput,
  IonCard,
  IonDatetime,
  IonButton,
  useIonToast,
} from '@ionic/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { API, graphqlOperation } from 'aws-amplify';
import { createTodo } from '../../graphql/mutations';

import './Tasks.css';
const initialState = { title: '', date: '' };
type Inputs = {
  title: string;
  date: string;
};

const Tasks: React.FC = () => {
  const [formState, setFormState] = useState(initialState);
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const [text, setText] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>(date);
  const [saveFlag, setSaveFlag] = useState(false);
  const [todos, setTodos] = useState<any>([]);
  console.log(date);

  const [present, dismiss] = useIonToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function setInput(key: any, value: any) {
    setFormState({ ...formState, [key]: value });
  }
  async function addTodo() {
    try {
      if (!formState.title) return;
      const todo = { ...formState };
      setTodos([...todos, todo]);
      setFormState(initialState);
      const data = await API.graphql(
        graphqlOperation(createTodo, { input: todo })
      );
      console.log(data);
    } catch (err) {
      console.log('error creating todo:', err);
    }
  }

  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    setSaveFlag(true);
    console.log(data);
  };
  console.log(errors);

  useEffect(() => {
    if (saveFlag) {
      console.log(
        'Button Cliled values are(Title: ' +
          text +
          ', Date: ' +
          selectedDate +
          ').'
      );
      addTodo();
      present({
        buttons: [{ text: 'hide', handler: () => dismiss() }],
        message: 'Task added',
        onDidDismiss: () => console.log('dismissed'),
        onWillDismiss: () => console.log('will dismiss'),
      });
    }
  }, [saveFlag]);
  return (
    <IonPage>
      <IonContent>
        <div className="start">
          <h1 className="text-6xl text-white flex justify-center my-16">
            <b>Task</b>
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <IonCard>
              <IonItem>
                <IonInput
                  {...register('title', { required: true })}
                  clearInput={true}
                  placeholder="task title"
                  onIonChange={(e) => setInput('title', e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCard>
            {errors.title && (
              <p className="text-red-500 ml-4 -mt-1">Title is required</p>
            )}
            <IonCard>
              <IonItem>
                <IonDatetime
                  min="2021-07-18"
                  max="2050-07"
                  displayFormat="YYYY-MM-DD"
                  {...register('date', { required: true })}
                  onIonChange={(e) => setInput('date', e.detail.value!)}
                  placeholder="due date"
                ></IonDatetime>
              </IonItem>
              {errors.date && <p>Date is required</p>}
            </IonCard>

            <IonButton className="flex justify-center mx-8 my-8" type="submit">
              Save
            </IonButton>
          </form>
          <IonButton
            color="secondary"
            className="flex justify-center mx-24 my-8 "
            href="/taskList"
          >
            List of tasks
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tasks;
