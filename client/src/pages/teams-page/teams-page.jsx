import React, { useEffect } from "react";
import { connect } from "react-redux";

import Teams from "../../components/teams/teams.component";

import { fetchAllTeams } from "../../redux/team/team-action";

import "./teams-page.styles.scss";

const TeamsPage = ({ teams = [], loading, dispatchFetchAllTeams }) => {
  useEffect(() => {
    dispatchFetchAllTeams();
  }, [dispatchFetchAllTeams]);

  return (
    <div className="team-page">
      <Teams teams={teams} />
    </div>
  );
};
const mapStateToProps = (state) => ({
  loading: state.loading,
  teams: state.teams.teams,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchAllTeams: () => dispatch(fetchAllTeams()),
});
export default connect(mapStateToProps, mapDispatchToProps)(TeamsPage);
