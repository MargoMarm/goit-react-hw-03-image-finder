import { ErrorText } from './Error.styled';

const Error = ({ errorText }) => {
	console.log(errorText)
	return <ErrorText>{errorText}</ErrorText>;
};

export default Error;
