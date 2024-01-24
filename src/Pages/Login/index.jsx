import React from "react";

import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import Api from "../../Api/Api";
import toast from "react-hot-toast";
import { Spinner } from "react-bootstrap";

export default function Login() {
	const navigate = useNavigate();
	const [loginFormValues] = React.useState({
		email: "",
		password: "",
	});
	const [error, setError] = React.useState(false);

	const [loading, setLoading] = React.useState(false);

	const validate = (values) => {
		let errors = {};
		if (!values.email) {
			errors.email = "Email is required !";
		} else if (!values.email.includes("@")) {
			errors.email = "Email is invalid !";
		}
		if (!values.password) {
			errors.password = "Password is required !";
		} else if (values.password.length < 8) {
			errors.password = "Password must be 8 characters long !";
		}
		return errors;
	};

	const submitLoginForm = async (values) => {
		if (values) {
			// submit the values into the api
			// console.log(values);
			try {
				setLoading(true);
				const res = await Api.post("/auth/login", values);
				// console.log(res);
				if (res.data?.user) {
					// console.log(res);
					toast.success(res.data?.message);
					// console.log(res.data?.user);
					localStorage.setItem("save-qa-user", JSON.stringify(res.data?.user));
					localStorage.setItem("save-qa-token", res.data?.token);
					setLoading(false);
				}
			} catch (err) {
				console.log(err);
				toast.error(err.response.data?.message);
				setLoading(false);
				setError(true);
			}
		}
	};

	React.useEffect(() => {
		if (localStorage.getItem("save-qa-token")) {
			navigate("/", { replace: true });
		}
	}, [navigate, loading]);

	return (
		<React.Fragment>
			<div
				style={{ minHeight: "100vh" }}
				className={`${
					error
						? "container-fluid p-3 bg-danger d-flex align-items-center justify-content-center"
						: "container-fluid p-3 login-bg d-flex align-items-center justify-content-center"
				}`}>
				<div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
					<h3 className="text-dark fs-4 fw-bold">Login</h3>
					<p className="text-dark">
						If you don't have an account Please{" "}
						<Link
							className="link"
							to="/registration"
							style={{ textDecoration: "none", color: "inherit" }}>
							Register !
						</Link>
					</p>
					<div className="glass-effect form-section">
						<Formik
							initialValues={loginFormValues}
							validate={(values) => validate(values)}
							onSubmit={(values) => submitLoginForm(values)}>
							{({ errors, touched }) => {
								return (
									<Form>
										<div className="form-group mb-3">
											<Field
												type="text"
												name="email"
												placeholder="Enter your Email address"
												className={
													errors.email && touched.email
														? "is-invalid form-control login-fields"
														: "form-control login-fields"
												}
											/>
											{errors.email && touched.email && (
												<div className="invalid-feedback">{errors.email}</div>
											)}
										</div>
										<div className="form-group mb-3">
											<Field
												type="text"
												name="password"
												placeholder="Enter your Password"
												className={
													errors.password && touched.password
														? "is-invalid form-control login-fields"
														: "form-control login-fields"
												}
											/>
											{errors.password && touched.password && (
												<div className="invalid-feedback">
													{errors.password}
												</div>
											)}
										</div>
										<button
											disabled={loading}
											className="btn btn-primary w-100"
											type="submit">
											Login{" "}
											{loading && (
												<Spinner
													size="sm"
													variant="warning"
													animation="border"
												/>
											)}
										</button>
									</Form>
								);
							}}
						</Formik>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
