import React from "react";
import EditModal from "../EditModal";

export default function QaItem(props) {
	const { qaItem, showEditModal, closeEditModal, openEditModal, deleteQA } =
		props;
	// console.log(qaItem)

	return (
		<React.Fragment>
			<div className="w-100 bg-white rounded px-3 py-2 mb-5">
				<div className="d-flex align-items-center justify-content-between">
					<h3 className="text-dark">{qaItem.question}</h3>
					<div>
						{qaItem.importance ? (
							<div className="bg-success rounded d-flex align-items-center justify-content-center p-3">
								<p className="text-white fw-bold m-0">Important</p>
							</div>
						) : (
							<div className="bg-warning rounded d-flex align-items-center justify-content-center p-3">
								<p className="text-white fw-bold m-0">Less Important</p>
							</div>
						)}
					</div>
				</div>
				<h4 className="text-dark">{qaItem.answer}</h4>
				<div className="d-flex align-items-center justify-content-between">
					<button
						onClick={() => openEditModal(qaItem)}
						className="btn btn-primary">
						Edit
					</button>
					{showEditModal.bool && (
						<EditModal
							showEditModal={showEditModal}
							closeEditModal={closeEditModal}
						/>
					)}
					<button
						onClick={() => deleteQA(qaItem._id)}
						className="btn btn-danger">
						Delete
					</button>
				</div>
			</div>
		</React.Fragment>
	);
}
