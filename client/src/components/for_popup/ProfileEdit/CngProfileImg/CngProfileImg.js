// external components
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../../../ContextApi";
import "./CngProfileImg.css";

const CngProfileImg = ({ setChangeProfileT, previewImg, getFile }) => {
	// for updating homepage
	const { setIsSubmitted } = GetContextApi();

	// for close when clicked outside start
	const myUseRef = useRef();

	const handleClickOutside = (e) => {
		if (!myUseRef.current?.contains(e.target)) {
			setChangeProfileT(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for close when clicked outside end

	// for inside clicked stop-propagation start
	const modalRef = useRef();

	useEffect(() => {
		const stopPropagation = (e) => {
			e.stopPropagation();
		};

		const { current: modalDom } = modalRef;
		modalDom.addEventListener("mousedown", stopPropagation);

		return () => {
			modalDom.removeEventListener("mousedown", stopPropagation);
		};
	}, []);
	// for inside clicked stop-propagation end

	const submitHandler = async () => {
		const formData = new FormData();
		formData.append("file", getFile);

		try {
			const response = await fetch("/profile/upload", {
				method: "PUT",
				body: formData
			});

			const result = await response.json();

			if (response.status === 200) {
				toast.success(result.message, {
					position: "top-right",
					theme: "colored",
					autoClose: 1500
				});
				setTimeout(() => {
					setIsSubmitted(Date.now());
					setChangeProfileT(false);
				}, 2500);
			} else if (response.status === 400) {
				toast(result.message, {
					position: "top-right",
					theme: "dark",
					autoClose: 3000
				});
			} else if (result.error) {
				toast.error(result.error, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
			} else {
				toast.error(result.message, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 3000
			});
		}
	};

	return (
		<>
			<div className="c-pro-img-container">
				<div ref={modalRef} className="row m-0 c-pro-layout">
					<div ref={myUseRef} className="col-5 p-0 wrapper">
						<div id="left">
							<img src={previewImg} alt="profile-img" />
						</div>

						<div id="right">
							<h5>Do you want change your profile picture?</h5>
							<div className="c-pro-btn">
								<button
									className="btn btn-danger"
									onClick={() => setChangeProfileT(false)}
								>
									Cancel
								</button>
								<button className="btn btn-success" onClick={submitHandler}>
									Submit
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CngProfileImg;
