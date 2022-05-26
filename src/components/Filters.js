import styled from 'styled-components';
import Button from './UI/Button';
import Input from './UI/Input';
import Select from './UI/Select';

const FiltersWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 25px;
`;

function generateOptions(data, label) {
    let options = [{key: 0, text: 'All ' + label + 's', value: 0}];
    for(let d of data) {
        options.push({
            key: d[label + 'Id'],
            value: d[label + 'Id'],
            text: d.name,
        });
    }

    return options;
}

export default function Filters({filters, setFilters, projects, gateways, onGenerate}) {
    return (
        <FiltersWrapper>
            <Select 
                options={generateOptions(projects, 'project')} 
                value={filters.projectId || 0}
                onChange={(_, d) => setFilters({...filters, projectId: d.value || null})}
            />
            <Select 
                options={generateOptions(gateways, 'gateway')} 
                value={filters.gatewayId || 0}
                onChange={(_, d) => setFilters({...filters, gatewayId: d.value || null})}
            />
            <Input 
                type="date"
                value={filters.from}
                onChange={(_, d) => setFilters({...filters, from: d.value})}
            />
            <Input 
                type="date"
                value={filters.to}
                onChange={(_, d) => setFilters({...filters, to: d.value})}
            />
            <Button onClick={onGenerate}>Generate Report</Button>
        </FiltersWrapper>
    );
}