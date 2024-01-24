import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import * as Yup from "yup";
import "./styles.css";
import Api from "../../Api/Api";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
	username: Yup.string()
		.required("User Name is required !")
		.min(5, "It should container at least 5 characters")
		.max(15, "Maximum it can contain only 15 characters..."),
	email: Yup.string().required("Email is required !").email("Invalid Email !"),
	password: Yup.string()
		.min(8, "Password must be at least 8 characters")
		.required("Password is required"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password"), null], "Passwords must match")
		.required("Confirm Password is required"),
	phone: Yup.string().required("Phone number is required"),
});

export default function Registration() {
	const navigate = useNavigate();
	const [image, setImage] = React.useState("");

	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
			phone: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			const body = {
				username: values.username,
				email: values.email,
				password: values.password,
				phone: values.phone,
				image: image,
			};
			postValuesToApi(body);
		},
	});

	const postValuesToApi = async (body) => {
		try {
			const res = await Api.post("/auth/register", body);
			if (res) {
				toast.success(res.data?.message);
				if (res.data.message) {
					navigate("/login");
				}
			}
		} catch (err) {
			toast.error(err.response.data?.message);
		}
	};

	const changeImage = async (file) => {
		if (file === null) {
			return;
		} else if (
			file.type === "image/jpeg" ||
			"image/png" ||
			"image/jpg" ||
			"image/svg" ||
			"image/avif"
		) {
			const imageData = new FormData();
			imageData.append("file", file);
			imageData.append("upload_preset", "save-qa-jwt");
			imageData.append("cloud_name", "dakda5ni3");
			await fetch("https://api.cloudinary.com/v1_1/dakda5ni3/image/upload", {
				method: "POST",
				body: imageData,
			})
				.then((res) => res.json())
				.then((result) => setImage(result?.url))
				.catch((err) => console.log(err));
		} else {
			return;
		}
	};

	return (
		<React.Fragment>
			<div
				style={{ minHeight: "100vh" }}
				className="register-bg container-fluid d-flex align-items-center justify-content-center p-4">
				<div className="w-100 d-flex flex-column align-items-center justify-content-center">
					<h3 className="text-primary">
						Already have an account ? Please{" "}
						<Link to="/login" style={{ position: "relative" }}>
							Login
						</Link>
					</h3>
					<RegistrationForm
						image={image}
						changeImage={(event) => changeImage(event.target.files[0])}
						formik={formik}
					/>
				</div>
			</div>
		</React.Fragment>
	);
}
