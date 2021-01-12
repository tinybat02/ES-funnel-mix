import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { PanelOptions, Frame } from 'types';
import { Funnel } from './Funnel-React/dist';
import { processData } from './util/helpFunc';
// import Icon from './img/save_icon.svg';
// import useCsvDownloader from 'use-csv-downloader';

interface Props extends PanelProps<PanelOptions> {}
interface State {
  csvData: Array<{
    [key: string]: number | string;
  }>;
  data: Array<{ label: string; quantity: number }>;
}

export class MainPanel extends PureComponent<Props, State> {
  state: State = {
    csvData: [],
    data: [],
  };

  componentDidMount() {
    if (this.props.data.series.length > 0 /*  && this.props.data.series.length == 7 */) {
      const series = this.props.data.series as Array<Frame>;
      const { data, csvData } = processData(series);
      this.setState({ data, csvData });
    }
  }

  componentDidUpdate(prevProps: PanelProps, prevState: State) {
    if (prevProps.data.series !== this.props.data.series) {
      const series = this.props.data.series as Array<Frame>;
      if (series.length == 0) {
        this.setState({
          data: [
            { label: 'Visitors', quantity: 0 },
            { label: 'Engaged Customers', quantity: 0 },
            { label: 'Returning Customers', quantity: 0 },
          ],
          csvData: [],
        });
        return;
      }

      const { data: dataOld } = prevState;
      const { data: dataNew, csvData } = processData(series);

      if (dataOld.length == 0) {
        this.setState({ data: dataNew, csvData });
        return;
      }

      for (let i = 0; i < dataOld.length; i++) {
        if (dataOld[i].quantity !== dataNew[i].quantity) {
          this.setState({ data: dataNew, csvData });
          break;
        }
      }
    }
  }

  // handleDownload = () => {
  //   const downloadCsv = useCsvDownloader({ quote: '', delimiter: ';' });
  //   downloadCsv(this.state.csvData, 'visitors&percentage_duration.csv');
  // };

  render() {
    const { width, height } = this.props;
    const { data } = this.state;

    if (data.length === 0) {
      return <div />;
    }

    return (
      <div style={{ width: width, height: height, position: 'relative' }}>
        {{
          /* <img src={Icon} onClick={this.handleDownload} style={{ position: 'absolute', top: 0, right: 2, zIndex: 2 }} /> */
        }}
        <Funnel
          labelKey="label"
          height={height - 100}
          width={width}
          colors={{
            graph: ['red', 'orange', 'yellow', 'green'],
            label: '#000',
            value: '#000',
          }}
          valueKey="quantity"
          displayPercent={true}
          data={data}
        />
      </div>
    );
  }
}
