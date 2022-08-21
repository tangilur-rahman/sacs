// external components
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// internal components
import "./ChatBoxSkeleton.css";

const ChatBoxSkeleton = () => {
	return (
		<>
			<div
				className="chat-box-skeleton"
				data-aos="fade-right"
				data-aos-delay="0"
				id="whenIsLoadingOverFlow"
			>
				<div>
					<Skeleton className="circle-skeleton" />
					<Skeleton className="width-skeleton" />
				</div>
				<div>
					<Skeleton className="circle-skeleton" />
					<Skeleton className="width-skeleton" />
				</div>
				<div>
					<Skeleton className="circle-skeleton" />
					<Skeleton className="width-skeleton" />
				</div>
				<div>
					<Skeleton className="circle-skeleton" />
					<Skeleton className="width-skeleton" />
				</div>
				<div>
					<Skeleton className="circle-skeleton" />
					<Skeleton className="width-skeleton" />
				</div>
				<div>
					<Skeleton className="circle-skeleton" />
					<Skeleton className="width-skeleton" />
				</div>
				<div>
					<Skeleton className="circle-skeleton" />
					<Skeleton className="width-skeleton" />
				</div>
			</div>
		</>
	);
};

export default ChatBoxSkeleton;
