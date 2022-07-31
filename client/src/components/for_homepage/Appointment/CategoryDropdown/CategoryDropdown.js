// external components
import { useState } from "react";

// internal components
import "./CategoryDropdown.css";

const CategoryDropdown = ({ getCateV, setCateV, category }) => {
	const [cateDropT, setCateDropT] = useState(false);

	return (
		<>
			<div
				className={
					cateDropT ? "category-container active" : "category-container"
				}
				onClick={() => setCateDropT(!cateDropT)}
			>
				<input
					type="text"
					placeholder="Select Role"
					id="category"
					readOnly
					value={getCateV}
					required
				/>
				<div className="option">
					<div onClick={() => setCateV("Exam Issue")}>
						<span>Exam Issue</span>
					</div>
					<div onClick={() => setCateV("Tuition Fee")}>
						<span>Tuition Fee</span>
					</div>
					<div onClick={() => setCateV("General Issue")}>
						<span>General Issue</span>
					</div>

					<div onClick={() => setCateV("Others")}>
						<span>Others</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default CategoryDropdown;
