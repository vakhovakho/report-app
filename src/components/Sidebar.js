import styled from 'styled-components';
import { BarChartIcon, PCIcon, PieChartIcon, SwitchIcon, TilesIcon } from './UI/icons';

const SidebarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export default function Sidebar() {
    return (
        <SidebarWrapper>
            <BarChartIcon />
            <TilesIcon />
            <PCIcon />
            <PieChartIcon />
            <SwitchIcon />
        </SidebarWrapper>
    );
}