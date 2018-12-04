import React, { Component } from 'react'
import { connect } from 'react-redux'
import reduxSagaInjector from '@/util/reduxSagaInjector'
import { Chart, Geom, Axis, Tooltip, Legend, Guide, View } from '@/components'
import { petal } from '@/components'
import mapData from './word.json'

function mapStateToProps({ chartData }) {
  if(!chartData) return {}
  return {
    result: chartData.chartData
  }
}

@connect(mapStateToProps)
export default class AntG2Test extends Component {
  constructor(props) {
    super(props)
    // 设置Shape形状
    petal('interval')
  }
  componentDidMount() {
    const { dispatch } = this.props
    reduxSagaInjector(dispatch, 'antv')('fetchChartData', {}, 'chartData')
  }

  render() {
    const { result } = this.props
    if(!result) {
      return null
    }

    const config = {
      shape: 'petal',
      color: 'name',
      opacity: 0.7,
      label: 'name',
      tooltip: false
    }

    // 坐标轴配置
    const axisConfig = {
      title: {

      },
      line: {
        stroke: 'red',
        lineDash: [2, 5],
        lineWidth: 3
      },
      label: {
        textStyle: {
          fill: 'red',
          fontSize: 18,
          // @BUG： 当设置该属性时，只有第一个起作用，在label下面设置该属性，则全部起作用
          rotate: 30
        }
      }
    }

    // 设置图表的坐标系
    const coordConfig= {
      name: 'theta',
      config: {
        radius: 0.75
      }
    }

    const toolTipsConfig = {
      show: true,
      'g2-tooltip': {
        backgroundColor: 'black',
        color: 'white'
      },
      itemTpl: `
        <li data-index={index}>
          <span style="background-color:{color};
            width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>
            {name}: {value}单位
        </li>
      `
    }
    const lineConfig = {
      // shape: '',
      color: 'name'
    }

    const legend = {
      position: 'right',
      title: {
        textAlign: 'center',
        fill: 'red',
        fontSize: 20,
        rotate: 30
      },
      marker: 'hollowTriangle-down',
      layout: 'vertical',
      unCheckColor: 'blue',
      background: {
        fill: 'blue',
        fillOpacity: 0.5
      }
    }

    const lineChartConfig = {
      padding: 60,
      width: 900,
      height: 500
    }

    const guideConfig = {
      line: {
        top: true,
        start: ['10%', 0],
        end: ['10%', '90%'],
        lineStyle: {
          stroke: 'red',
          lineDash: [0, 2, 2],
          lineWidth: 3
        },
        text: {
          position: 'center',
          autoRotate: false,
          content: 'Y轴显示辅助文本',
          style: {
            textAlign: 'center',
            fill: 'blue',
            fontSize: 20
          }
        }
      }
      // image: {},
      // text: {},
      // region: {},
      // regionFilter: {},
      // html: {},
      // arc: {},
      // dataMarker: {},
      // dataRegion: {}
    }
    
    const useData = [{
      name: 'Russia',
      value: 86.8
    }, {
      name: 'China',
      value: 106.3
    }, {
      name: 'Japan',
      value: 94.7
    }, {
      name: 'Mongolia',
      value: 98
    }, {
      name: 'Canada',
      value: 98.4
    }, {
      name: 'United Kingdom',
      value: 97.2
    }, {
      name: 'United States of America',
      value: 98.3
    }, {
      name: 'Brazil',
      value: 96.7
    }]

    const dataSet = {
      dataConfig: {
        type: 'GeoJSON'
      }
    }

    const mapConfig = {
      style: {
        fill: '#fff',
        stroke: '#ccc',
        lineWidth: 1
      }
    }
    return <div>
        <Chart data={result} config={lineChartConfig}>
          <Geom type='interval' position='name*value' config={lineConfig} />
          <Axis field='name' config={axisConfig} />
          <Axis field='value' config={axisConfig} />
          <Tooltip config={toolTipsConfig} />
          <Legend position='name' config={legend} />
          <Guide config={guideConfig} />
        </Chart>
        <Chart data={result} coord={coordConfig}>
          <Geom type='intervalStack' position='value' config={config} />
          <Legend config={legend} />
          {/* <Axis field='genre' config={axisConfig} />
          <Axis field='sold' config={false} /> */}
        </Chart>
        <Chart data={mapData} config={dataSet}>
          <Geom type='polygon' position='longitude*latitude' config={mapConfig} />
          {/* <View data={useData} /> */}
          <Axis config={{show: false}} />
        </Chart>
      </div>
  }
}