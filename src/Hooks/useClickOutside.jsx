import React from "react";

export default function useClickOutside(ref, func) {
	const click = (event) => {
		if (!ref.current || ref.current.contains(event.target)) {
			return;
		}
		func();
	};
	React.useEffect(() => {
		document.addEventListener("mousedown", click);
		document.addEventListener("touchstart", click);
		return () => {
			document.removeEventListener("mousedown", click);
			document.removeEventListener("touchstart", click);
		};
	});
	return null;
}
