import React from 'react';
import ReactApexChart from 'react-apexcharts';

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: 'basic-line'
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec']
        }
      },
      series: [
        {
          name: 'Series 1',
          data: [30, 40, 25, 50, 49, 60, 70, 91, 125, 100, 90, 150]
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
      </div>
    );
  }
}

export default LineChart;
