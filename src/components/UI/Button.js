import styled from 'styled-components';
import { Button as SemanticButton } from 'semantic-ui-react'

const StyledButton = styled(SemanticButton)`
    &.ui.button {
        font-size: 14px;
        background-color: #005B96;
        color: #FFF;
    }
`;

export default function Button(props) {
    return (
        <StyledButton {...props} />
    );
}