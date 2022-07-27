import "./Login.css";

const Login = () => {
	return (
		<>
			<div className="container-fluid p-0">
				<div className="row m-0 login-container">
					<div className="col-9 p-0 form-container">
						<div className="row m-0">
							<div className="col-6">
								<img
									src="/assets/images/login-img.png"
									alt="cover-img"
									className="img-fluid"
								/>
							</div>
							<div className="col-6 right">
								<h2>Login</h2>
								<form>
									<div className="form-floating mb-4">
										<input
											type="email"
											className="form-control"
											id="email"
											placeholder="Email or ID"
										/>
										<label htmlFor="email">Email or ID :</label>
									</div>
									<div className="form-floating">
										<input
											type="password"
											className="form-control"
											id="password"
											placeholder="Password"
										/>
										<label htmlFor="password">Password :</label>
									</div>

									<button type="button" className="btn btn-success mt-4">
										Submit
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
