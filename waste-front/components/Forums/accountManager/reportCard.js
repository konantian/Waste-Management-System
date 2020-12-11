import React from 'react';
import { Card } from 'antd';

const ReportCard = ({account, report}) => {

    return (
        <Card title={`Summary Report for ${account}`} className="report" >
            <p><strong>Manager PID </strong><span>{report.manager_id}</span></p>
            <p><strong>Manager Name </strong><span>{report.manager_name}</span></p>
            <p><strong>Number of Service Agreements  </strong><span>{report.service_count}</span></p>
            <p><strong>Sum of the prices  </strong><span>{report.cost_sum}</span></p>
            <p><strong>Sum of the internal cost  </strong><span>{report.price_sum}</span></p>
            <p><strong>Number of waste type  </strong><span>{report.type_count}</span></p>
        </Card>
    )
}

export default ReportCard;