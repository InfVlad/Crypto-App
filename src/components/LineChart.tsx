import React from "react";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);
import { Col, Row, Typography } from "antd";

const { Title: AntTitle } = Typography;

function LineChart({ coinHistory, currentPrice, coinName }: any) {
	const coinPrice = [];
	const coinTimestamp = [];
	for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
		coinPrice.unshift(coinHistory.data.history[i].price);
		coinTimestamp.unshift(
			new Date(coinHistory.data.history[i].timestamp*1000).toLocaleDateString()
		);
	}
	const data = {
		labels: coinTimestamp,
		datasets: [
			{
				label: "Price in USD",
				data: coinPrice,
				fill: false,
				backgroundColor: "#0071bd",
				borderColor: "#0071bd",
			},
		],
	};
	// const options = {
	//     scales: {
	//         yAxes: [
	//             {
	//                 ticks: {
	//                     beginAtZero: true
	//                 }
	//             }
	//         ]
	//     }
	// }
	const options = {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	return (
		<>
			<Row className="chart-header">
				<AntTitle level={2} className="chart-title">
					{coinName} Price Chart
				</AntTitle>
				<Col className="price-container">
					<AntTitle level={5} className="price-change">
						{coinHistory?.data?.change}%
					</AntTitle>
					<AntTitle level={5} className="current-price">
						Current {coinName} Price: $ {currentPrice}
					</AntTitle>
				</Col>
			</Row>
			<Line data={data} options={options} />
		</>
	);
}

export default LineChart;
