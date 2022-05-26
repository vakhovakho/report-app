import styled from 'styled-components';
import { Select as SemanticSelect } from 'semantic-ui-react'

const StyledSelect = styled(SemanticSelect)`
    &.ui.selection.dropdown {
        width: 135px;
        height: 32px;
        min-width: auto;
        min-height: auto;
        padding: 9px;
        font-size: 14px;
        background-color: #1BC5BD;
        color: #FFF;

        i {
            padding: 8px !important;
        }
    }

    &.ui.selection.visible.dropdown>.text:not(.default) {
        color: #FFF;
    }
`;

export default function Select(props) {
    return (
        <StyledSelect {...props} />
    );
}