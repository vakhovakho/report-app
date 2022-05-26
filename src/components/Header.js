import styled from 'styled-components';
import { AvatarIcon, BurgerIcon, LogoIcon } from './UI/icons';

const HeaderWrapper = styled.div`
    padding: 20px 100px 20px 35px;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #F3F6F9;

    >div {
        display: flex;
        align-items: center;
    }
    
    .left {
        gap: 40px;
    }
    
    .right {
        gap: 20px;
    }
`;

export default function Header() {
    return (
        <HeaderWrapper>
            <div className='left'>
                <LogoIcon />
                <BurgerIcon />
            </div>

            <div className='right'>
                <AvatarIcon />
                <span>John Doe</span>
            </div>
        </HeaderWrapper>
    );
}