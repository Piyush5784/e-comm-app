import { Button, Container } from "react-bootstrap";

import googleLogo from "../assets/googleLogo.svg";
import { FieldValues, useForm } from "react-hook-form";
import { usefirebaseContext } from "../context/FirebaseContext";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { memo } from "react";

const Register = () => {
  const firebase = usefirebaseContext();
  const navigate: NavigateFunction = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlerRegister = async (data: FieldValues) => {
    const res = await firebase.createUser(data.email, data.password);
    if (res == "user already exists") {
      toast.warning(res);
      navigate("/login");
    } else {
      toast.success(res);
    }
  };

  return (
    <>
      <h1 className="text-center">Registration</h1>
      <p className="text-center">Use Any username and password for testing</p>

      <Container style={{ maxWidth: "500px" }}>
        <form
          style={{ height: "400px" }}
          className="d-flex flex-column justify-content-evenly aligen-items-center"
          onSubmit={handleSubmit((data) => handlerRegister(data))}
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
            Register
          </button>
          <p className="text-center">
            Already have an account ? <Link to={"/login"}>Login here</Link>
          </p>
        </form>
      </Container>
    </>
  );
};

export default memo(Register);
