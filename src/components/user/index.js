const UserComponent = (props) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <div>
      <h1>Welcome {props.userName}!</h1>
      <a onClick={handleLogout} className="btn-logout">
        Logout
      </a>
    </div>
  );
};

export default UserComponent;
