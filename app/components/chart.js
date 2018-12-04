import React, { Component } from 'react'
import G2 from '@antv/g2'
import DataSet from '@antv/data-set'
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
    chart: null,
    view: null
  }
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.view = null
  }
  componentDidMount() {
    const { config, data, styles, coord} = this.props
    let chartConfig = _.merge(defaultConfig, config)
    let styleConfig = _.merge(defaultStyles, styles)
    let chartMergeConfig = Object.assign({
      container: this.ref.current
    }, chartConfig, styleConfig)

    console.log(chartMergeConfig)

    // step 1：创建chart对象
    const chartInstance = new G2.Chart(chartMergeConfig)

    // step 2：创建视图
    this.view = chartInstance.view()

    // 自定义坐标系
    if(coord) {
      this.view.coord(coord.name, coord.config)
    }
    
    let dataView = null
    if(data) {
      const ds = new DataSet()
      dataView = ds.createView()
      if(chartConfig.dataConfig) {
        dataView.source(data, chartConfig.dataConfig)
      } else {
        dataView.source(data)
      }
    }
    
    this.view.source(dataView)

    this.setState({
      chart: chartInstance,
      view: this.view
    })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.data !== this.props.data) {
      this.view.source(this.props.data)
    }
  }

  render() {
    return (
      <ChartContext.Provider value={this.state}>
        <div ref={this.ref}>{this.props.children}</div>
      </ChartContext.Provider>
    )
  }

}

export default Chart
