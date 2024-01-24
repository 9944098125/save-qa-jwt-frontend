import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Api from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const validationSchema = Yup.object({
	question: Yup.string().required("Questions is required"),
	answer: Yup.string().required("Answer is required..."),
	importance: Yup.boolean().required("Mention the importance..."),
});

export default function Create() {
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("save-qa-user"));
	const [loading, setLoading] = React.useState(false);

	const formik = useFormik({
		initialValues: {
			toolId: "",
			question: "",
			answer: "",
			importance: false,
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			const body = {
				userId: user?._id,
				toolId: values.toolId,
				question: values.question,
				answer: values.answer,
				importance: values.importance,
			};
			createQA(body);
		},
	});

	async function createQA(body) {
		setLoading(true);
		try {
			const res = await Api.post("/qa/create", body);
			// console.log(res);
			if (res.data) {
				toast.success(res.data.message);
				setLoading(false);
				navigate("/");
			}
		} catch (err) {
			toast.error(err.response?.data.message);
			setLoading(false);
		}
	}

	const changeToolId = (event) => {
		formik.setFieldValue("toolId", event.target.value);
	};

	return (
		<React.Fragment>
			<div className="container-fluid h-100 bg-dark">
				<div className="d-flex justify-content-center align-items-center gap-5 mb-5">
					<label
						htmlFor="html"
						className="text-primary d-flex align-items-center gap-2"
						style={{ cursor: "pointer" }}>
						<input
							type="radio"
							name="toolId"
							value="1"
							checked={formik.values.toolId === "1"}
							onChange={changeToolId}
							id="html"
						/>
						<h6>HTML</h6>
					</label>
					<label
						htmlFor="css"
						className="text-primary d-flex align-items-center gap-2"
						style={{ cursor: "pointer" }}>
						<input
							type="radio"
							name="toolId"
							value="2"
							checked={formik.values.toolId === "2"}
							onChange={changeToolId}
							id="css"
						/>
						<h6>CSS</h6>
					</label>
					<label
						htmlFor="javascript"
						className="text-primary  d-flex align-items-center gap-2"
						style={{ cursor: "pointer" }}>
						<input
							type="radio"
							name="toolId"
							value="3"
							checked={formik.values.toolId === "3"}
							onChange={changeToolId}
							id="javascript"
						/>
						<h6>JavaScript</h6>
					</label>
					<label
						htmlFor="react"
						className="text-primary  d-flex align-items-center gap-2"
						style={{ cursor: "pointer" }}>
						<input
							type="radio"
							name="toolId"
							value="4"
							checked={formik.values.toolId === "4"}
							onChange={changeToolId}
							id="react"
						/>
						<h6>ReactJS</h6>
					</label>
				</div>

				<div className="form-section p-5">
					<form onSubmit={formik.handleSubmit}>
						<div className="form-group mb-4">
							<label htmlFor="" className="text-white fs-4">
								Question
							</label>
							<input
								type="text"
								value={formik.values.question}
								onChange={formik.handleChange}
								name="question"
								className={
									formik.errors.question && formik.touched.question
										? "w-100 form-control is-invalid"
										: "w-100 form-control"
								}
							/>
							{formik.errors.question && formik.touched.question && (
								<div className="text-white">{formik.errors.question}</div>
							)}
						</div>
						<div className="form-group mb-4">
							<label htmlFor="" className="text-white fs-4">
								Answer
							</label>
							<textarea
								rows={5}
								value={formik.values.answer}
								onChange={formik.handleChange}
								name="answer"
								className={
									formik.errors.answer && formik.touched.answer
										? "w-100 form-control is-invalid"
										: "w-100 form-control"
								}
							/>
							{formik.errors.answer && formik.touched.answer && (
								<div className="text-white">{formik.errors.answer}</div>
							)}
						</div>
						<label htmlFor="importance" className="text-white mb-3 fs-4">
							<input
								type="checkbox"
								checked={formik.values.importance}
								onChange={formik.handleChange}
								name="importance"
								id="importance"
							/>
							Importance
						</label>

						<button type="submit" className="w-100 btn btn-primary">
							Submit {loading && <Spinner animation="border" fontSize="sm" />}
						</button>
					</form>
				</div>
			</div>
		</React.Fragment>
	);
}
