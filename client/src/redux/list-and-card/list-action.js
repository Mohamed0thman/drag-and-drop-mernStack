import { ListActionTypes } from "./list-type";

export const toggleCreateList = () => ({
  type: ListActionTypes.TOGGLE_LIST_FORM,
});

export const fetchAllLists = (boardId) => {
  console.log("id", boardId);
  return {
    type: ListActionTypes.API,
    payload: {
      method: "GET",
      url: `/api/${boardId}/lists`,
      success: (response) => setAllList(response),
    },
  };
};

export const createList = (data, boardId, onSuccess, onError) => {
  console.log("id", boardId);

  return {
    type: ListActionTypes.API,
    payload: {
      method: "POST",
      url: `/api/${boardId}/lists`,
      data,
      success: (list) => addList(list),
      postProcessSuccess: onSuccess,
      postProcessError: onError,
    },
  };
};

export const updateList = (data, boardId, onSuccess, onError) => {
  console.log("id", boardId);
  return {
    type: ListActionTypes.API,
    payload: {
      method: "PATCH",
      url: `/api/${boardId}/lists`,
      data,
    },
  };
};

export const deleteList = (listId, onSuccess, onError) => {
  console.log("id", listId);
  return {
    type: ListActionTypes.API,
    payload: {
      method: "DELETE",
      url: `/api/${listId}/lists`,
      success: (listId) => removeList(listId),
      postProcessSuccess: onSuccess,
      postProcessError: onError,
    },
  };
};

const addList = (list) => ({
  type: ListActionTypes.ADD_LIST,
  payload: list,
});

const setAllList = (data) => {
  console.log(data);
  return {
    type: ListActionTypes.SET_ALL_LIST,
    payload: data,
  };
};

const removeList = (listId) => ({
  type: ListActionTypes.REMOVE_LIST,
  payload: listId,
});

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIdIndexStart,
  droppableIdIndexEnd,
  draggableId,
  type
) => {
  return {
    type: ListActionTypes.DRAG_HAPPENED,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIdIndexStart,
      droppableIdIndexEnd,
      draggableId,
      type,
    },
  };
};
