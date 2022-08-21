// external components
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// internal components
import "./MessageSkeleton.css";

const MessageSkeleton = () => {
	return (
		<>
			<div
				className="message-box-skeleton"
				data-aos="fade-right"
				data-aos-delay="0"
				id="whenIsLoadingOverFlow"
			>
				<Skeleton count={7} className="width-skeleton" />
			</div>
		</>
	);
};

export default MessageSkeleton;
