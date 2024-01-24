import React from "react";
import useClickOutside from "../../Hooks/useClickOutside";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("save-qa-user"));
	const [showUserMenu, setShowUserMenu] = React.useState(false);

	function toggleUserMenu() {
		setShowUserMenu(!showUserMenu);
	}
	const userMenuRef = React.useRef(null);

	useClickOutside(userMenuRef, () => {
		setShowUserMenu(false);
	});

	const clickLogout = () => {
		localStorage.removeItem("save-qa-token");
		localStorage.removeItem("save-qa-user");
		navigate("/login");
	};

	return (
		<React.Fragment>
			<div
				style={{ borderBottom: "1px solid white" }}
				className="w-100 bg-dark d-flex align-items-center justify-content-between px-5 py-2">
				<h3 className="text-primary fw-extrabold fs-4">SAVE QA</h3>
				<p className="text-danger fw-bold fs-3">
					Save Questions & Answers {user?.username}
				</p>
				<div className="">
					<img
						src={user?.image}
						alt=""
						width={50}
						height={50}
						style={{ borderRadius: "50%", cursor: "pointer" }}
						onClick={toggleUserMenu}
					/>
				</div>
			</div>
			{showUserMenu && (
				<div
					ref={userMenuRef}
					style={{
						position: "absolute",
						top: "68px",
						right: "5px",
						cursor: "pointer",
					}}
					className="bg-dark text-white px-4 p-2 rounded">
					<Link
						to="/create"
						style={{ textDecoration: "none", color: "inherit" }}>
						<h5>Create</h5>
					</Link>
					<hr className="border-1 border-white" />
					<h5 onClick={clickLogout}>Logout</h5>
				</div>
			)}
		</React.Fragment>
	);
}
