const LoginPage = (props) => {
  return (
    <div>
      <h1>Spotify Clone</h1>
      <a href={props.auth_link} className="btn">
        Login
      </a>
    </div>
  );
};

export default LoginPage;
