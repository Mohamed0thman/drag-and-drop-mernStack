import { ListActionTypes } from "./list-type";
import { CardActionTypes } from "./card-type";

const INITIAL_STATE = {
  toggleListForm: false,
  toggleCardForm: false,
  lists: [],
};

const listsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ListActionTypes.TOGGLE_LIST_FORM:
      return {
        ...state,
        toggleListForm: !state.toggleListForm,
      };
    case CardActionTypes.TOGGLE_CARD_FORM:
      return {
        ...state,
        toggleCardForm: !state.toggleCardForm,
      };
    case ListActionTypes.SET_ALL_LIST:
      return {
        ...state,
        lists: action.payload,
      };
    case ListActionTypes.ADD_LIST:
      return {
        ...state,
        lists: state.lists.concat(action.payload),
      };
    case CardActionTypes.ADD_CARD:
      return {
        ...state,
        lists: state.lists.map((list) => {
          console.log(action.payload.ownerList);
          if (list._id === action.payload.ownerList) {
            console.log("yes");
            return {
              ...list,
              cards: [...list.cards, action.payload],
            };
          } else {
            return list;
          }
        }),
      };
    case ListActionTypes.REMOVE_LIST:
      return {
        ...state,
        lists: state.lists.filter((list) => list._id !== action.payload),
      };
    case CardActionTypes.REMOVE_CARD:
      return {
        ...state,
        lists: state.lists.map((list) => {
          console.log(action.payload.ownerList);
          if (list._id === action.payload.ownerList) {
            console.log("yes");
            return {
              ...list,
              cards: list.cards.filter(
                (list) => list._id !== action.payload._id
              ),
            };
          } else {
            return list;
          }
        }),
      };
    case ListActionTypes.UPDATE_LIST:
      return state.map((team) => {
        if (team._id === action.payload.teamId)
          return { ...team, ...action.payload.data };
        else return team;
      });
    case CardActionTypes.UPDATE_CARD:
      return state.map((team) => {
        if (team._id === action.payload.teamId)
          return { ...team, ...action.payload.data };
        else return team;
      });

    case ListActionTypes.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIdIndexStart,
        droppableIdIndexEnd,
        draggableId,
        type,
      } = action.payload;
      const newState = { ...state };

      if (type === "list") {
        const list = newState.lists.splice(droppableIdIndexStart, 1);
        newState.lists.splice(droppableIdIndexEnd, 0, ...list);
        return newState;
      }

      if (droppableIdStart === droppableIdEnd) {
        const list = state.lists.find(
          (list) => droppableIdStart.replace("list-", "") === list._id
        );
        console.log(list);
        const card = list.cards.splice(droppableIdIndexStart, 1);
        console.log(card);
        list.cards.splice(droppableIdIndexEnd, 0, ...card);
        return newState;
      }

      if (droppableIdStart !== droppableIdEnd) {
        const listStart = state.lists.find(
          (list) => droppableIdStart.replace("list-", "") === list._id
        );
        console.log(listStart);
        const card = listStart.cards.splice(droppableIdIndexStart, 1);
        console.log(card);
        const listEnd = state.lists.find(
          (list) => droppableIdEnd.replace("list-", "") === list._id
        );

        console.log(listEnd);
        listEnd.cards.splice(droppableIdIndexEnd, 0, ...card);
        return newState;
      }

    case ListActionTypes.RESET_USER_INFO:
      return [];
    default:
      return state;
  }
};

export default listsReducer;
