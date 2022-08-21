// external components
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// internal components
import "./DashboardSkeleton.css";

const DashboardSkeleton = () => {
	return (
		<>
			<div
				className="dashboard-box-skeleton"
				data-aos="fade-right"
				data-aos-delay="0"
				id="whenIsLoadingOverFlow"
			>
				<Skeleton count={5} className="width-skeleton" />
			</div>
		</>
	);
};

export default DashboardSkeleton;
