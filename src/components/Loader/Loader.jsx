import { MagnifyingGlass } from 'react-loader-spinner';
import { Wrapper } from './Loader.styled';

export const Loader = ({visible}) => {
	return (
    <Wrapper>
      <MagnifyingGlass
        visible={visible}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#5b64e1"
      />
    </Wrapper>
  );
}  
