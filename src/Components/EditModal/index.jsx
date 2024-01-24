import { Formik, Form, Field } from "formik";
import React from "react";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import Api from "../../Api/Api";

export default function EditModal(props) {
	const { showEditModal, closeEditModal } = props;
	const initialValues = {
		toolId: showEditModal.dataWithId?.toolId,
		question: showEditModal.dataWithId?.question,
		answer: showEditModal.dataWithId?.answer,
		importance: showEditModal.dataWithId?.importance,
	};

	const user = JSON.parse(localStorage.getItem("save-qa-user"));

	const submitEditForm = async (values) => {
		const body = {
			userId: user?._id,
			toolId: values.toolId,
			question: values.question,
			answer: values.answer,
			importance: values.importance,
		};
		try {
			const res = await Api.patch(`/qa/update/${showEditModal.id}`, body);
			// console.log(res);
			if (res.data) {
				toast.success(res.data.message);
				closeEditModal();
			}
		} catch (err) {
			toast.error(err.response.data?.message);
		}
	};

	return (
		<React.Fragment>
			<Modal
				show={showEditModal.bool}
				onHide={closeEditModal}
				size="lg"
				centered>
				<Modal.Header closeButton>
					<Modal.Title>Edit Question</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="form-section">
						<Formik
							initialValues={initialValues}
							onSubmit={(values) => submitEditForm(values)}>
							<Form>
								<div className="form-group mb-3">
									<Field
										className="form-control"
										type="text"
										name="question"
										placeholder="Write your Question"
									/>
								</div>
								<div className="form-group mb-3">
									<Field
										as="textarea"
										className="form-control"
										type="text"
										name="answer"
										placeholder="Write your answer"
									/>
								</div>
								<div className="form-group mb-3 d-flex align-items-center gap-2">
									<Field type="checkbox" name="importance" id="imp" />
									<label htmlFor="imp">Importance</label>
								</div>
								<button type="submit" className="btn btn-success w-100">
									Submit
								</button>
							</Form>
						</Formik>
					</div>
				</Modal.Body>
			</Modal>
		</React.Fragment>
	);
}
