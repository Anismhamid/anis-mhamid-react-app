import {FormikValues, useFormik} from "formik";
import {FunctionComponent, useContext, useEffect, useState} from "react";
import * as yup from "yup";
import CardsInput from "../atoms/modals/CardsInput";
import {Cards} from "../interfaces/Cards";
import {getCardById, putCard} from "../services/cardsServices";
import {successMSG} from "../atoms/taosyify/Toastify";
import {useParams} from "react-router-dom";
import {SiteTheme} from "../theme/theme";
import { cardsFormikValues } from "../fomikFormsValidation/cardsFormikValues";

interface UpdateCardFormProps {
	refresh: () => void;
}

const UpdateCardForm: FunctionComponent<UpdateCardFormProps> = ({refresh}) => {
	const [card, setCard] = useState<Cards>(cardsFormikValues);
	const {cardId} = useParams<{cardId: string}>();
	const theme = useContext(SiteTheme);

	useEffect(() => {
		getCardById(cardId as string)
			.then((res) => {
				setCard(res);
			})
			.catch((err) => console.log(err));
	}, [cardId]);

	const formik: FormikValues = useFormik<Cards>({
		enableReinitialize: true,
		initialValues: {
			title: card.title,
			subtitle: card.subtitle,
			description: card.description,
			phone: card.phone,
			email: card.email,
			web: card.web,
			image: {
				url: card.image.url,
				alt: card.image.alt,
			},
			address: {
				state: card.address.state,
				country: card.address.country,
				city: card.address.city,
				street: card.address.street,
				houseNumber: card.address.houseNumber,
				zip: card.address.zip,
			},
		},
		validationSchema: yup.object({
			title: yup.string().min(2).max(256).required(),
			subtitle: yup.string().min(2).max(256).required(),
			description: yup.string().min(2).max(1024).required(),
			phone: yup
				.string()
				.min(9, "minimum phone number is 9")
				.max(11, "maximum phone number is 11")
				.required()
				.matches(/^[0-9]{9,11}$/, "Phone number must be between 9 and 11 digits"),
			email: yup.string().min(5).required(),
			web: yup.string().min(14),
			image: yup.object({
				url: yup.string().url().min(14).required(),
				alt: yup.string().min(2).max(256).required(),
			}),
			address: yup.object({
				state: yup.string(),
				country: yup.string().required(),
				city: yup.string().required(),
				street: yup.string().required(),
				houseNumber: yup.number().required(),
				zip: yup.number(),
			}),
		}),
		onSubmit: (values: Cards) => {
			try {
				putCard(cardId as string, values as Cards)
					.then((res) => {
						refresh();
						successMSG(`${res.title} card is updated successfully`);
					})
					.catch((error) => {
						console.error("Error updating card:", error);
					});
			} catch (error) {
				console.log(error);
			}
		},
	});

	return (
		<div className='container'>
			<form
				style={{backgroundColor: theme.background, color: theme.color}}
				onSubmit={formik.handleSubmit}
				className=' card p-4 shadow-lg border rounded-4'
			>
				{/* Title and Subtitle */}
				<div className='row'>
					<div className='col-6 '>
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
				<CardsInput
					placeholder='Card description'
					name='description'
					type='text'
					value={formik.values.description}
					error={formik.errors.description}
					touched={formik.touched.description}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>

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
							placeholder='alt'
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
							placeholder='house NO'
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
							type='number'
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
						disabled={!formik.isValid || !formik.dirty}
						type='submit'
						className='btn btn-success w-100 py-2 fw-bold shadow-lg'
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default UpdateCardForm;
