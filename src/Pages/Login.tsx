import { Button, Container } from "react-bootstrap";
import googleLogo from "../assets/googleLogo.svg";
import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { usefirebaseContext } from "../context/FirebaseContext";

import { toast } from "react-toastify";
import { memo, useMemo } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const firebase = usefirebaseContext();

  const handleLogin = useMemo(
    () => async (data: FieldValues) => {
      const res = await firebase.loginUser(data.email, data.password);
      if (res === "login successfull") {
        toast.success(res);
      } else {
        toast.warning(res);
      }
    },
    []
  );

  async function guestLoginHandler() {
    let guestEmail = `guest${Math.floor(Math.random() * 1000)}@gmail.com`;
    const res = await firebase.createUser(guestEmail, "123456789");
    if (res === "registration successfull") {
      toast.success("Guest Logged In");
    } else {
      toast.warning(res);
    }
  }
  return (
    <>
      <h1 className="text-center">Login</h1>

      <Container style={{ maxWidth: "500px" }}>
        <form
          style={{ height: "400px" }}
          className="d-flex flex-column justify-content-evenly aligen-items-center"
          onSubmit={handleSubmit((data) => handleLogin(data))}
        >
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="form-control"
              placeholder="Enter email"
            />
            <small className="form-text" style={{ color: "red" }}>
              {errors.email && "email is required"}
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              {...register("password", { required: true })}
              type="password"
              className="form-control"
              placeholder="Password"
            />
            <small className="form-text" style={{ color: "red" }}>
              {errors.password && "password is required"}
            </small>
          </div>
          <Button
            variant="light"
            onClick={() => firebase.createUserUsingGoogle()}
          >
            <img src={googleLogo} alt="logo" height={"28px"} />
            Login with google
          </Button>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <button
          className="btn btn-primary w-100 mb-5"
          onClick={guestLoginHandler}
        >
          Login as Guest
        </button>
        <p className="text-center">
          Don't have an account ? <Link to={"/register"}>Register here</Link>
        </p>
      </Container>
    </>
  );
};

export default memo(Login);
