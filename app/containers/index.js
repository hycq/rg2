import React, { Component } from 'react'
import { connect } from 'react-redux'
import reduxSagaInjector from '@/util/reduxSagaInjector'
import { Chart, Geom, Axis, Tooltip, Legend, Guide } from '@/components'
import { petal } from '@/components'

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
      position: 'top',
      title: 'xxx',
      marker: 'hollowCircle'
    }

    const lineChartConfig = {
      padding: 50
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
      </div>
  }
}