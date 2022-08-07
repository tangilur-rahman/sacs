//external components

// internal components
import "./LeftSidebar.css";
import TabContainer from "./TabContainer/TabContainer";

const LeftSidebar = ({ currentUser, selected, setSelected }) => {
	return (
		<>
			<div className="current-user">
				<img
					src={`uploads/profile-img/${currentUser.profile_img}`}
					alt="profile-img"
					className="img-fluid"
				/>
				<div className="info">
					<h4>{currentUser.name}</h4>
					<div>
						<h6>ID :</h6> <span>{currentUser.id}</span>
					</div>
				</div>
			</div>

			<div className="tab-container">
				<TabContainer
					selected={selected}
					setSelected={setSelected}
					currentUser={currentUser}
				/>
			</div>
		</>
	);
};

export default LeftSidebar;
