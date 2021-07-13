import { ErrorMessage } from '@hookform/error-message'
import React, { InputHTMLAttributes } from 'react'
import { DeepMap, FieldError, FieldValues } from 'react-hook-form'

type IOwnProps = {
	errors: DeepMap<FieldValues, FieldError>
	name: String
}
type IProps = InputHTMLAttributes<HTMLInputElement> & IOwnProps

export default function FormInput(props: IProps) {
	const hasError = props.errors && props.errors.hasOwnProperty(props.name)
	const classes =
		'block border border-grey-light w-full p-3 rounded mt-4 ' +
		(hasError ? 'border-red-600' : '')
	return (
		<>
			<input
				autoComplete='off'
				autoFocus={true}
				className={classes}
				{...props}
			/>
			<p className='h-5 text-red-600'>
				<ErrorMessage errors={props.errors} name={props.name} />
			</p>
		</>
	)
}
