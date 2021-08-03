import "../../components/button/style.css";

const LoginPage = (props) => {
  return (
    <div className="center">
      <a href={props.auth_link} className="btn-login">
        Login
      </a>
    </div>
  );
};

export default LoginPage;
