import React, { useState } from "react";
import { connect } from "react-redux";

import { toast } from "react-toastify";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { createCard } from "../../redux/list-and-card/card-action";

import "./create-card.styles.scss";

const CreateCard = ({ listId, createCard }) => {
  const [cardInfo, setCardInfo] = useState({
    cardTitle: "",
  });
  const { cardTitle } = cardInfo;

  const handleSubmit = async (event) => {
    event.preventDefault();

    createCard(
      cardInfo,
      listId,
      () => toast.success("Account Created Successfully!"),
      (message) => toast.error(`Error: ${message}`)
    );
    setCardInfo({
      cardTitle: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCardInfo({ ...cardInfo, [name]: value });
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="cardTitle"
          placeholder="card title"
          required
          value={cardTitle}
          onChange={handleChange}
          autoComplete="off"
        />
        <CustomButton isformBtn="isformBtn">Create Card</CustomButton>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createCard: (cardInfo, listId, onSuccess, onError) =>
    dispatch(createCard(cardInfo, listId, onSuccess, onError)),
});

export default connect(null, mapDispatchToProps)(CreateCard);
