const isDefined = (value) => {
  return value !== undefined && value !== null && value !== "";
};

const formatUserData = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
};

export {
  isDefined,
  formatUserData
}