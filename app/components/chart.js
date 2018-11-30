import React, { Component } from 'react'
import G2 from '@antv/g2'
import _ from 'lodash'
import { ChartContext } from './context'

// 容器默认样式
const defaultStyles = {
  // padding: 10,
  // 图表整体的边框和背景样式
  background: {
    fill: '',
    fillOpacity: 1,
    stroke: '',
    opacity: 1,
    lineWidth: 1,
    radius: 10
  },
  // 图表绘图区域的边框和背景样式
  plotBackground: {
    fill: '',
    fillOpacity: 1,
    stroke: '',
    opacity: 1,
    lineWidth: 1,
    radius: 10
  },
  // 该字段保留
  theme: ''
}

// 容器默认配置
const defaultConfig = {
  width: 600,
  height: 300,
  forceFit: false,
  
  animate: true,
  pixelRatio: window.devicePixelRatio,
  // 渲染方案，默认使用canvas渲染，支持svg
  renderer: 'canvas'
}

class Chart extends Component {
  state = {
    chartContext: null
  }
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.container = null
  }
  componentDidMount() {
    const { config, data, styles , coord} = this.props
    let chartConfig = _.merge(defaultConfig, config)
    let styleConfig = _.merge(defaultStyles, styles)
    let chartMergeConfig = Object.assign({
      container: this.ref.current
    }, chartConfig, styleConfig)

    console.log(chartMergeConfig)

    this.container = new G2.Chart(chartMergeConfig)

    this.setState({
      chartContext: this.container
    })

    // 自定义坐标系
    if(coord) {
      this.container.coord(coord.name, coord.config)
    }
    
    this.container.source(data)
  }

  componentDidUpdate(prevProps) {
    if(prevProps.data !== this.props.data) {
      this.container.source(this.props.data)
    }
  }

  render() {
    return (
      <ChartContext.Provider value={this.state.chartContext}>
        <div ref={this.ref}>{this.props.children}</div>
      </ChartContext.Provider>
    )
  }

}

export default Chart
