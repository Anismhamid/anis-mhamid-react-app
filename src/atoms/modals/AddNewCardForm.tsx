import {FormikValues, useFormik} from "formik";
import {FunctionComponent} from "react";
import {Cards} from "../../interfaces/Cards";
import {createNewCard} from "../../services/cardsServices";
import {errorMSG, successMSG} from "../taosyify/Toastify";
import CardsInput from "./CardsInput";
import {plus} from "../../fontAwesome/Icons";
import {
	cardsFormikValues,
	cardsFormikValuesSchema,
} from "../../fomikFormsValidation/cardsFormikValues";

interface AddNewCardFormProps {
	refresh: Function;
}

const AddNewCardForm: FunctionComponent<AddNewCardFormProps> = ({refresh}) => {
	const formik: FormikValues = useFormik<Cards>({
		initialValues: cardsFormikValues,
		validationSchema: cardsFormikValuesSchema,
		onSubmit: (values: Cards) => {
			createNewCard(values)
				.then(() => {
					successMSG(`${values.title} card is created successfuly`);
					refresh();
				})
				.catch((err) => {
					errorMSG(err);
				});
		},
	});

	return (
		<div className='container mt-5'>
			<form
				onSubmit={formik.handleSubmit}
				className='fw-bold card p-4 shadow-lg rounded-3'
			>
				{/* Title and Subtitle */}
				<div className='row'>
					<div className='col-6'>
						<CardsInput
							placeholder='Title'
							name='title'
							type='text'
							value={formik.values.title}
							error={formik.errors.title}
							touched={formik.touched.title}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					<div className='col-6'>
						<CardsInput
							placeholder='Subtitle'
							name='subtitle'
							type='text'
							value={formik.values.subtitle}
							error={formik.errors.subtitle}
							touched={formik.touched.subtitle}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
				</div>

				{/* Description */}
				<div className='form-floating mb-3'>
					<textarea
						style={{height: "100px"}}
						id='description'
						name={"description"}
						value={formik.values.description}
						placeholder={"description"}
						className={`form-control w-100 ${
							formik.touched.description && formik.errors.description
								? "is-invalid"
								: ""
						}`}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						aria-label={"description"}
					/>
					{formik.touched.description && formik.errors.description && (
						<div className='invalid-feedback'>
							{formik.errors.description}
						</div>
					)}
					<label
						htmlFor={"description"}
						className='form-label fw-bold text-secondary'
					>
						{"description"}
					</label>
				</div>

				{/* Phone and Email */}
				<div className='row'>
					<div className='col-6'>
						<CardsInput
							placeholder='Phone (9-11)'
							name='phone'
							type='tel'
							value={formik.values.phone}
							error={formik.errors.phone}
							touched={formik.touched.phone}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					<div className='col-6'>
						<CardsInput
							placeholder='Email'
							name='email'
							type='email'
							value={formik.values.email}
							error={formik.errors.email}
							touched={formik.touched.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
				</div>

				{/* Website URL */}
				<CardsInput
					placeholder='Website url '
					name='web'
					type='url'
					value={formik.values.web}
					error={formik.errors.web}
					touched={formik.touched.web}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>

				{/* Image URL and Alt */}
				<div className='row'>
					<div className='col-8'>
						<CardsInput
							placeholder='image Url'
							name='image.url'
							type='url'
							value={formik.values.image.url}
							error={formik.errors.image?.url}
							touched={formik.touched.image?.url}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					<div className='col-4'>
						<CardsInput
							placeholder='img name'
							name='image.alt'
							type='text'
							value={formik.values.image.alt}
							error={formik.errors.image?.alt}
							touched={formik.touched.image?.alt}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
				</div>

				{/* Address Fields */}
				<div className='row'>
					<div className='col-4'>
						<CardsInput
							placeholder='state'
							name='address.state'
							type='text'
							value={formik.values.address.state}
							error={formik.errors.address?.state}
							touched={formik.touched.address?.state}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					<div className='col-4'>
						<CardsInput
							placeholder='country'
							name='address.country'
							type='text'
							value={formik.values.address.country}
							error={formik.errors.address?.country}
							touched={formik.touched.address?.country}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					<div className='col-4'>
						<CardsInput
							placeholder='city'
							name='address.city'
							type='text'
							value={formik.values.address.city}
							error={formik.errors.address?.city}
							touched={formik.touched.address?.city}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
				</div>

				{/* Street, House Number, Zip */}
				<div className='row'>
					<div className='col-4'>
						<CardsInput
							placeholder='street'
							name='address.street'
							type='text'
							value={formik.values.address.street}
							error={formik.errors.address?.street}
							touched={formik.touched.address?.street}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					<div className='col-4'>
						<CardsInput
							placeholder='houseNo'
							name='address.houseNumber'
							type='number'
							value={formik.values.address.houseNumber}
							error={formik.errors.address?.houseNumber}
							touched={formik.touched.address?.houseNumber}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					<div className='col-4'>
						<CardsInput
							placeholder='zip'
							name='address.zip'
							type='string'
							value={formik.values.address.zip}
							error={formik.errors.address?.zip}
							touched={formik.touched.address?.zip}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
				</div>

				<div className='mb-3'>
					<button
						type='submit'
						className='btn btn-success w-100 py-2 fw-bold shadow-lg'
					>
						{plus}
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddNewCardForm;
