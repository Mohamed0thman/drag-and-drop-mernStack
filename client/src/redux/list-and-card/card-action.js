import { CardActionTypes } from "./card-type";

export const toggleCreateCard = () => ({
  type: CardActionTypes.TOGGLE_CARD_FORM,
});
export const createCard = (data, listId, onSuccess, onError) => ({
  type: CardActionTypes.API,
  payload: {
    method: "POST",
    url: `/api/${listId}/cards`,
    data,
    success: (card) => addCard(card),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

export const deleteCard = (cardId, onSuccess, onError) => {
  console.log("id", cardId);
  return {
    type: CardActionTypes.API,
    payload: {
      method: "DELETE",
      url: `/api/${cardId}/cards`,
      success: (cardId) => removeCard(cardId),
      postProcessSuccess: onSuccess,
      postProcessError: onError,
    },
  };
};
const addCard = (card) => {
  console.log(card);
  return {
    type: CardActionTypes.ADD_CARD,
    payload: card,
  };
};

const removeCard = (cardId) => ({
  type: CardActionTypes.REMOVE_CARD,
  payload: cardId,
});
