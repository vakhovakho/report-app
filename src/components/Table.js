import { useMemo, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import styled from 'styled-components';
import { calculateTotal, numberToUSD } from '../helpers';

const TableWrapper = styled.div`
    margin-top: 35px;

    .ui.grid {
        padding: 15px;
        margin: 0;
        overflow-y: scroll;
        max-height: 300px;

        .row {
            padding: 5px;

            &:nth-child(2n + 1) {
                background-color: #FFF;
            }
        }

        .column {
            padding: 0;
            font-size: 16px;
            line-height: 26px;

            &:not(:first-child) {
                text-align: center;
            }
    
            &:last-child {
                text-align: right;
            }
        }

        

    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    padding: 25px;
    background: #FFF;
    border-radius: 10px;
    cursor: pointer;
`;

export default function Table({title, headers, data, expandedInitially = false, withoutHeader = false}) {
    const [isExpanded, setIsExpanded] = useState(data.length > 0 && (withoutHeader || expandedInitially));

    const total = useMemo(() => {
        let total = calculateTotal(data);

        return numberToUSD(Math.round(total));
    }, [data])

    return (
        <TableWrapper>
            {!withoutHeader && <Header onClick={() => setIsExpanded(!isExpanded)}>
                <span>{title}</span>
                <span>TOTAL: {total}</span>
            </Header>}
            {(isExpanded || withoutHeader) && <Grid columns={headers.length}>
                <Grid.Row key={0}>
                {headers.map(header => (
                    <Grid.Column key={header.key}>
                        {header.text}
                    </Grid.Column>
                ))}
                </Grid.Row>

                {data.map(row => (
                    <Grid.Row key={row.paymentId}>
                        {headers.map(header => (
                            <Grid.Column key={header.key}>
                                {row[header.key]}
                            </Grid.Column>
                        ))}
                    </Grid.Row>
                ))}
            </Grid>}
        </TableWrapper>
    );
}