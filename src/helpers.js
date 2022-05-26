// get all transactions and make it devided into arrays by gateways or projects
// depending on the filter
// or make single array of all transactions if project and gateway are both selected
export function buildReportObject(transactions, projects, gateways, filters) {
    let report = [];
    if(filters.projectId && filters.gatewayId) {
        report = transactions;
    } else if(filters.projectId) {
        report = Array.from(Array(gateways.length), () => []);
        let gatewayIdsWithIndexes = {};
        for(let i in gateways) {
            gatewayIdsWithIndexes[gateways[i].gatewayId] = i;
        }
        console.log(report);
        console.log(gatewayIdsWithIndexes);
        for(let transaction of transactions) {
            let gatewayIndex = gatewayIdsWithIndexes[transaction.gatewayId];
            report[gatewayIndex].push(transaction);
        } 
    } else {
        report = Array.from(Array(projects.length), () => []);
        let projectIdsWithIndexes = {};
        for(let i in projects) {
            projectIdsWithIndexes[projects[i].projectId] = i;
        }

        for(let transaction of transactions) {
            let projectIndex = projectIdsWithIndexes[transaction.projectId];
            report[projectIndex].push(transaction);
        } 
    }

    return report;
}

export function addGatewayNameToTransactions(transactions, gateways) {
    let gatewayNamesWithIds = {};
    for(let gateway of gateways) {
        gatewayNamesWithIds[gateway.gatewayId] = gateway.name;
    }

    for(let transaction of transactions) {
        transaction.gatewayName = gatewayNamesWithIds[transaction.gatewayId];
    }

    return transactions;
}

export function generateTableHeaders(withGateway = true) {
    let headers = [
        { text: 'Date', key: 'created' },
        { text: 'Gateway', key: 'gatewayName' },
        { text: 'Transaction ID', key: 'paymentId' },
        { text: 'Amount', key: 'amount' },
    ];

    if(!withGateway) {
        headers.splice(1, 1);
    }

    return headers;
}

export function numberToUSD(value) {
    // Create our number formatter.
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
  
  return formatter.format(value).slice(1, -3) + ' USD'; /* $2,500.00 */
}

export function calculateTotal(transactions) {
    return transactions.reduce((prev, cur) => {
        return prev + cur.amount;
    }, 0);
}