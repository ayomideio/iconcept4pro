import React from 'react';
import { Chart } from 'primereact/chart';

const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3, 9],
        borderColor: [
            '#7E57C2',
        ],
        borderWidth: 3,
        borderDash: [5, 5],
        fill: false,
        pointRadius: 3
    }, {
        label: 'Income',
        data: [1, 2, 5, 3, 12, 7, 15],
        backgroundColor: [
            'rgba(187,222,251,0.2)',
        ],
        borderColor: [
            '#42A5F5',
        ],
        borderWidth: 3,
        fill: true
    },
    {
        label: 'Expenses',
        data: [7, 12, 15, 5, 3, 13, 21],
        borderColor: [
            '#FFB300',
        ],
        borderWidth: 3,
        fill: false,
        pointRadius: [4, 6, 4, 12, 8, 0, 4]
    },
    {
        label: 'New Users',
        data: [3, 7, 2, 17, 15, 13, 19],
        borderColor: [
            '#66BB6A',
        ],
        borderWidth: 3,
        fill: false
    }]
};

const chartOptions = {
    responsive: true,
    hover: {
        mode: 'index'
    },
    scales: {
        xAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Month'
            }
        }],
        yAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Value'
            }
        }]
    }
};

export const Dashboard = () => {

    
    return (
        <div className="layout-dashboard">
            <div className="p-grid">
                <div className="p-col-12 p-lg-6 p-xl-3">
                    <div className="overview-box sales">
                        <i className="overview-icon pi pi-dollar"></i>
                        <span className="overview-title">Sales</span>
                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                        <div className="overview-numbers">
                            $ 92,440
                        </div>
                        <div className="overview-subinfo">
                            21% more than yesterday
                        </div>
                    </div>
                </div>
                <div className="p-col-12 p-lg-6 p-xl-3">
                    <div className="overview-box views">
                        <i className="overview-icon pi pi-search"></i>
                        <span className="overview-title">Views</span>
                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                        <div className="overview-numbers">
                            7029
                        </div>
                        <div className="overview-subinfo">
                            2% more than yesterday
                        </div>
                    </div>
                </div>
                <div className="p-col-12 p-lg-6 p-xl-3">
                    <div className="overview-box users">
                        <i className="overview-icon pi pi-users"></i>
                        <span className="overview-title">Users</span>
                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                        <div className="overview-numbers">
                            9522
                        </div>
                        <div className="overview-subinfo">
                            7% more than yesterday
                        </div>
                    </div>
                </div>
                <div className="p-col-12 p-lg-6 p-xl-3">
                    <div className="overview-box checkin">
                        <i className="overview-icon pi pi-map-marker"></i>
                        <span className="overview-title">Check-Ins</span>
                        <i className="overview-arrow pi pi-chevron-circle-up"></i>
                        <div className="overview-numbers">
                            4211
                        </div>
                        <div className="overview-subinfo">
                            18% more than yesterday
                        </div>
                    </div>
                </div>

                <div className="p-col-12 p-lg-8">
                    <div className="card card-w-title statistics">
                        <h5>Statistics</h5>
                        <Chart type="line" data={chartData} options={chartOptions} />
                    </div>
                </div>

            </div>
        </div>
    );
}
