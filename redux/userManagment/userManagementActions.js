export const SET_USER_DETAILS = 'SET_USER_DETAILS';
export const RESET_USER_DETAILS = 'RESET_USER_DETAILS';

export function setUserDetails(details) {
  return {
    type: SET_USER_DETAILS,
    details
  };
}

export function resetUserDetails() {
  return {
    type: RESET_USER_DETAILS,
  };
}
