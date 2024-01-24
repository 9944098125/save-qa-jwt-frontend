import React from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../Api/Api";
import toast from "react-hot-toast";
import QaItem from "../../Components/QaItem";
import Spinner from "react-bootstrap/Spinner";

export default function Home() {
	const [selectedToolId, setSelectedToolId] = React.useState("1");
	const [qaList, setQAList] = React.useState([]);
	const [deleted, setDeleted] = React.useState(false);

	const changeToolId = (event) => {
		setSelectedToolId(event.target.value);
	};
	// console.log(selectedToolId);
	const user = JSON.parse(localStorage.getItem("save-qa-user"));

	const navigate = useNavigate();
	React.useEffect(() => {
		if (!localStorage.getItem("save-qa-token")) {
			navigate("/login", { replace: true });
		}
	}, [navigate]);
	// console.log(qaList);

	const oldData = {
		toolId: "",
		question: "",
		answer: "",
		importance: false,
	};

	const [showEditModal, setShowEditModal] = React.useState({
		id: "",
		bool: false,
		dataWithId: { ...oldData },
	});

	const closeEditModal = () => {
		setShowEditModal({
			id: "",
			bool: !showEditModal.bool,
			dataWithId: { ...oldData },
		});
	};

	const openEditModal = (qa) => {
		setShowEditModal({
			id: qa._id,
			bool: !showEditModal.bool,
			dataWithId: { ...qa },
		});
	};

	const deleteQA = async (qaId) => {
		const res = await Api.delete(`/qa/delete/${qaId}`);
		if (res.data) {
			toast.success(res.data.message);
			setDeleted(!deleted);
		}
	};

	React.useEffect(() => {
		const fetchQAList = async () => {
			try {
				const res = await Api.get(`/qa/${user?._id}/${selectedToolId}`);
				// console.log(res);
				if (res.data) {
					toast.success(res.data.message);
					setQAList(res.data.qa);
				}
			} catch (err) {
				toast.error(err.response.data?.message || err.response.data?.error);
			}
		};

		fetchQAList();
	}, [user?._id, selectedToolId, showEditModal.bool, deleted]);

	return (
		<React.Fragment>
			<div className="container-fluid h-100 p-3 bg-dark">
				<div className="d-flex justify-content-center align-items-center gap-5 mb-5">
					<label
						htmlFor="html"
						className="text-primary d-flex align-items-center gap-2"
						style={{ cursor: "pointer" }}>
						<input
							type="radio"
							name="tool"
							value="1"
							checked={selectedToolId === "1"}
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
							name="tool"
							value="2"
							checked={selectedToolId === "2"}
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
							name="tool"
							value="3"
							checked={selectedToolId === "3"}
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
							name="tool"
							value="4"
							checked={selectedToolId === "4"}
							onChange={changeToolId}
							id="react"
						/>
						<h6>ReactJS</h6>
					</label>
				</div>
				{qaList.length > 0 ? (
					qaList.map((item, idx) => {
						return (
							<QaItem
								qaItem={item}
								key={idx}
								showEditModal={showEditModal}
								openEditModal={openEditModal}
								closeEditModal={closeEditModal}
								deleteQA={deleteQA}
							/>
						);
					})
				) : (
					<div className="d-flex align-items-center justify-content-center">
						<Spinner animation="border" size="lg" />
					</div>
				)}
			</div>
		</React.Fragment>
	);
}
