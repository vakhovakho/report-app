import styled from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';
import Filters from './Filters';
import Table from './Table';
import { useState, useEffect, useMemo } from 'react';
import { getProjects, getGateways, getReport } from '../api';
import { addGatewayNameToTransactions, buildReportObject, calculateTotal, generateTableHeaders, numberToUSD } from '../helpers';
import DoughnutChart from './UI/DoughnutCart';
import NoReports from './NoReports';
import Loader from './UI/Loader';

const Container = styled.div`
    max-width: 1440px;
    margin: 0 auto;
`;

const Main = styled.div`
    display: flex;
    gap: 40px;
    padding: 20px 100px 20px 35px;
`;

const Content = styled.div`
    flex-grow: 1;
`;

const ContentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
        h2 {
            margin: 0;
            padding: 0;
            font-size: 24px;
            font-weight: 700;
        }

        h5 {
            margin-top: 8px;
            font-size: 16px;
            font-weight: 700;
            color: #7E8299;
        }
    }
`;

const ContentBody = styled.div`
    margin-top: 20px;
    padding: 18px 24px;
    background-color: #F1FAFE;
    border-radius: 10px;

    h2 {
        font-size: 16px;
        font-weight: 700;
    }
    
    >div {
        display: flex;
        gap: 20px;

        .tables {
            flex-grow: 1;
        }
    }
`;

const ChartWrapper = styled.div`
    width: ${props => props.show ? '500px' : '0'};
    flex-shrink: 0;

    canvas {
        width: 80%;
        height: 80%;
        margin: 10% auto;
    }
`;

const ContentFooter = styled.div`
    margin-top: 25px;
    padding: 18px;
    background-color: #F1FAFE;
    border-radius: 10px;

    h2 {
        font-size: 16px;
        font-weight: 700;
    }
`;

const initialFilters = {
    from: '',
    to: '',
    projectId: null,
    gatewayId: null
};


function App() {
    const [filters, setFilters] = useState(initialFilters);
    const [projects, setProjects] = useState([]);
    const [gateways, setGateways] = useState([]);
    const [tableHeaders, setTableHeaders] = useState(generateTableHeaders())
    const [report, setReport] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        Promise.all([getProjects(), getGateways()])
            .then(res => {
                setProjects(res[0].data);
                setGateways(res[1].data);
                setDataLoaded(true);
                setLoading(false);
            })
    }, []);

    useEffect(() => {
        if(dataLoaded) {
            generateHandler();
        }
    }, [dataLoaded])

    function generateHandler(){
        setLoading(true);
        getReport(filters)
            .then(res => addGatewayNameToTransactions(res.data, gateways))
            .then(transactions => buildReportObject(transactions, projects, gateways, filters))
            .then(report => {
                setReport(report);
                setTableHeaders(generateTableHeaders(!filters.projectId && !filters.gatewayId));
                setLoading(false);
            });
    }

    const tables = useMemo(() => {
        let tables = [];
        if(filters.projectId && filters.gatewayId) {
            tables.push(<Table withoutHeader headers={tableHeaders} data={report} />);
        } else {
            let title;
            report.forEach((rep, i) => {
                if(filters.projectId) {
                    title = gateways[i].name;
                } else {
                    title = projects[i].name;
                }
                tables.push(<Table key={i} title={title} expandedInitially={i === 0} headers={tableHeaders} data={rep} />)
            });
        }

        return tables;
    }, [report])

    const chart = useMemo(() => {
        if((filters.projectId && !filters.gatewayId) || (filters.gatewayId && !filters.projectId)) {
            let labels = []; 
            let data = [];

            if(filters.projectId) {
                labels = gateways.map(gateway => gateway.name);
                data = report.map(transactions => calculateTotal(transactions));
            } else {
                labels = projects.map(project => project.name);
                data = report.map(transactions => calculateTotal(transactions));
            }

            return <DoughnutChart labels={labels} data={data}/>
        } 
        
        return null;
        
    }, [report]);

    const total = useMemo(() => {
        let total = 0;

        if(filters.projectId && filters.gatewayId) {
            total = calculateTotal(report);
        } else {
            if(report.length) {
                total = calculateTotal(report[0]) + calculateTotal(report[1]);
            }
        }

        return numberToUSD(Math.round(total));
    }, [report])

    const hasReports = useMemo(() => {
        if(filters.projectId && filters.gatewayId) {
            return report.length > 0;
        }
        
        return report[0]?.length > 0 && report[1]?.length > 0;
    }, [report])


    return (
        <Container>
            <Header />
            <Main>
            {loading && <Loader />}
                <Sidebar />
                <Content>
                    <ContentHeader>
                        <div className="title">
                            <h2>Reports</h2>
                            <h5>Easily generate a report of your transactions</h5>
                        </div>
                        <Filters 
                            filters={filters} 
                            setFilters={setFilters} 
                            projects={projects} 
                            gateways={gateways}
                            onGenerate={generateHandler}
                        />
                    </ContentHeader>
                    
                    {hasReports && <ContentBody>
                        <h2>All projects | All gateways</h2>
                        <div>
                            <div className='tables'>
                                {tables}
                            </div>
                            <ChartWrapper show={chart !== null}>
                                {chart}
                            </ChartWrapper>
                        </div>
                    </ContentBody>}
                    {hasReports && <ContentFooter>
                        <h2>TOTAL: {total}</h2>
                    </ContentFooter>}
                    {!hasReports && <NoReports />}
                </Content>
            </Main>
        </Container>
    );
}

export default App;
