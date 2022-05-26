import styled from "styled-components"
import {NoReportsIcon} from './UI/icons';

const NoReportsWrapper = styled.div`
    width: 500px;
    margin: 200px auto;
    font-weight: 700;
    text-align: center;

    h2 {
        font-size: 24px;
    }

    p {
        margin: 20px 0;
        font-size: 16px;
        color: #7E8299;
    }
`;

export default function NoReports() {
    return (
        <NoReportsWrapper>
            <h2>No reports</h2>
            <p>
            Currently you have no data for the reports to be generated.
Once you start generating traffic through the Balance application 
the reports will be shown.
            </p>
            <NoReportsIcon />
        </NoReportsWrapper>
    )
}