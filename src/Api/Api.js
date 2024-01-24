import Axios from "axios";

const Api = Axios.create({
	baseURL: "https://save-qa.onrender.com/api",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${localStorage.getItem("save-qa-token")}`,
	},
});

export default Api;
