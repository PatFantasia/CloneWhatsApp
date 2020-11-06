import styled from 'styled-components';

const StyledMessageView = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    // while waiting background image
    background : ${ ({theme}) => theme.messageView.color.background};
    
`

export default StyledMessageView;