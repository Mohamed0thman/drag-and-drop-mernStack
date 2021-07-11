export const addMemberToInvite = (invitedUser, invitedUserToAdd) => {
  const existinginvitedUser = invitedUser.find(
    (invitedUser) => invitedUser.id === invitedUserToAdd.id
  );
  if (existinginvitedUser) {
    return invitedUser;
  }
  return [...invitedUser, { ...invitedUserToAdd }];
};

export const removeMemberFromInvite = (invitedUser, invitedUserToAdd) => {
  const existingInvitedUser = invitedUser.find(
    (invitedUser) => invitedUser.id === invitedUserToAdd.id
  );
  if (existingInvitedUser) {
    return invitedUser.filter(
      (invitedUser) => invitedUser !== invitedUserToAdd.id
    );
  }
};
