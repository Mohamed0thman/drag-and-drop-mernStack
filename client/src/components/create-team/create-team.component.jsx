import React, { useState } from "react";
import { connect } from "react-redux";

import { toast } from "react-toastify";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import SelectOption from "../select-option/select-option.component";

import { createTeam } from "../../redux/team/team-action";

import "./create-team.styles.scss";

const CreateTeam = ({
  dispatchCreateTeamAction,
  toggleForm,
  handleChangeToLeft,
  profile,
}) => {
  const { _id, fullName } = profile;

  const [teamCredentials, setTeamCredentials] = useState({
    teamName: "",
    teamType: "",
    teamDescription: "",
  });

  const { teamName, teamDescription } = teamCredentials;
  const { createTeamFormToLeft } = toggleForm;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setTeamCredentials({
      ...teamCredentials,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatchCreateTeamAction(
      { ...teamCredentials, teamLeader: fullName },
      (data) => handleChangeToLeft(data),
      (message) => toast.error(`Error: ${message}`)
    );
  };
  return (
    <div
      className="create-team"
      style={{
        left: createTeamFormToLeft,
      }}
    >
      <h3 className="create-team__title">Let's Build a Team</h3>
      <p className="create-team__text">
        Boost your productivity by making it easier for everyone to access
        boards in one location.
      </p>
      <form className="create-team__form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="teamName"
          placeholder="Team Name"
          required
          value={teamName}
          onChange={handleChange}
          autoComplete="true"
        />

        <SelectOption name="teamType" handleChange={handleChange} />

        <FormInput
          type="text"
          name="teamDescription"
          placeholder="Team Description"
          required
          value={teamDescription}
          onChange={handleChange}
          autoComplete="true"
          style={{
            marginBottom: "35px",
          }}
        />
        <CustomButton isformBtn="isformBtn">continue</CustomButton>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCreateTeamAction: (data, onSuccess, onError) =>
    dispatch(createTeam(data, onSuccess, onError)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);
