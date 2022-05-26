import styled from 'styled-components';
import { Input as SemanticInput } from 'semantic-ui-react'

const StyledInput = styled(SemanticInput)`
    &.ui.input {
        width: 135px;
        height: 32px;
        min-width: auto;
        min-height: auto;
        font-size: 14px;

        input {
            background-color: #1BC5BD;
            color: #FFF;
        }
    }
`;

export default function Input(props) {
    return (
        <StyledInput {...props} />
    );
}