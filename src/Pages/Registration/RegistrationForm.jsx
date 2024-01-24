import React from "react";

const RegistrationForm = (props) => {
	const { formik, changeImage, image } = props;
	return (
		<React.Fragment>
			<div className="glass-effect form-section">
				<form onSubmit={formik.handleSubmit}>
					<div className="d-flex align-items-center gap-3 mb-3">
						<div className="col-md form-group">
							<input
								type="text"
								value={formik.values.username}
								name="username"
								placeholder="Enter your username"
								className={
									formik.errors.username && formik.touched.username
										? "is-invalid form-control register-fields"
										: "form-control register-fields"
								}
								onChange={formik.handleChange}
							/>
							{formik.errors.username && formik.touched.username && (
								<div className="invalid-feedback">{formik.errors.username}</div>
							)}
						</div>

						<div className="col-md form-group">
							<input
								type="email"
								value={formik.values.email}
								name="email"
								placeholder="Enter your email address..."
								className={
									formik.errors.email && formik.touched.email
										? "is-invalid form-control register-fields"
										: "form-control register-fields"
								}
								onChange={formik.handleChange}
							/>
							{formik.errors.email && formik.touched.email && (
								<div className="invalid-feedback">{formik.errors.email}</div>
							)}
						</div>
					</div>

					<div className="d-flex align-items-center gap-3 mb-3">
						<div className="col-md form-group">
							<input
								type="password"
								value={formik.values.password}
								name="password"
								placeholder="Enter your password"
								className={
									formik.errors.password && formik.touched.password
										? "is-invalid form-control register-fields"
										: "form-control register-fields"
								}
								onChange={formik.handleChange}
							/>
							{formik.errors.password && formik.touched.password && (
								<div className="invalid-feedback">{formik.errors.password}</div>
							)}
						</div>

						<div className="col-md form-group">
							<input
								type="password"
								value={formik.values.confirmPassword}
								name="confirmPassword"
								placeholder="Enter your confirmPassword address..."
								className={
									formik.errors.confirmPassword &&
									formik.touched.confirmPassword
										? "is-invalid form-control register-fields"
										: "form-control register-fields"
								}
								onChange={formik.handleChange}
							/>
							{formik.errors.confirmPassword &&
								formik.touched.confirmPassword && (
									<div className="invalid-feedback">
										{formik.errors.confirmPassword}
									</div>
								)}
						</div>
					</div>

					<div className="d-flex align-items-center gap-3 mb-3">
						<div className="col-md form-group">
							<input
								type="text"
								value={formik.values.phone}
								name="phone"
								placeholder="Enter your phone"
								className={
									formik.errors.phone && formik.touched.phone
										? "is-invalid form-control register-fields"
										: "form-control register-fields"
								}
								onChange={formik.handleChange}
							/>
							{formik.errors.phone && formik.touched.phone && (
								<div className="invalid-feedback">{formik.errors.phone}</div>
							)}
						</div>

						<div className="d-flex align-items-center gap-2 form-group">
							<input
								type="file"
								name="image"
								className="form-control register-fields"
								onChange={changeImage}
							/>
							{image && <img src={image} alt="" height={50} width={50} />}
						</div>
					</div>
					<div className="form-group w-100">
						<button type="submit" className="btn btn-warning w-100">
							Register
						</button>
					</div>
				</form>
			</div>
		</React.Fragment>
	);
};

export default RegistrationForm;
