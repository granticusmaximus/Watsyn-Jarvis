import {todosRef} from '../Firebase/firebase';
import {FETCH_TODOS, FETCH_NOTES} from './types';

//Adding ToDo Items
export const addToDo = newToDo => async dispatch => {
  todosRef.push().set(newToDo);
};

export const completeToDo = completeToDoId => async dispatch => {
  todosRef.child(completeToDoId).remove();
};

export const fetchToDos = () => async dispatch => {
  todosRef.on("value", snapshot => {
    dispatch({
      type: FETCH_TODOS,
      payload: snapshot.val()
    });
  });
};

//Adding Notes
export const addNote = newNote => async dispatch => {
  todosRef.push().set(newNote);
};

export const fetchNotes = () => async dispatch => {
  todosRef.on("value", snapshot => {
    dispatch({
      type: FETCH_NOTES,
      payload: snapshot.val()
    });
  });
};