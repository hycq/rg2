/*
 * @Author: baizn
 * @Date: 2018-11-29 11:52:59
 * @LastEditors: baizn
 * @LastEditTime: 2018-11-30 14:41:45
 * @Description: 封装G2的tootips组件
 */

import React from 'react'
import { ChartContext } from './context'
import _ from 'lodash'

const defaultConfig = {
  show: true,
  // tooltip 的触发方式，默认为 mousemove 
  triggerOn: 'mousemove',
  // 是否展示 title，默认为 true
  showTitle: true,
  crossshairs: {
    type: 'rect',
    style: {
      // 图形样式

    }
  },
  // tooltip 辅助线配置
  // 距离鼠标的偏移量
  offset: 10,
  // tooltip 容器模板
  containerTpl: `
    <div class="g2-tooltip">
      <div class="g2-tooltip-title" style="margin:10px 0;"></div>
      <ul class="g2-tooltip-list"></ul>
    </div>
  `,
  // tooltip 每项记录的默认模板
  itemTpl: `
    <li data-index={index}>
      <span style="background-color:{color};
        width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>
        {name}: {value}
    </li>
  `,
  // 将 tooltip 展示在指定区域内
  inPlot: true,
  // tooltip 是否跟随鼠标移动
  follow: true,
  // 默认为 true, false 表示只展示单条 tooltip
  shared: true,
  // 固定位置展示 tooltip
  position: 'left'
}

function ToolTips({ config }) {
  return (
    <ChartContext.Consumer>
      {
        chart => {
          if(!chart) return null
          let mergeOpt = _.merge({}, defaultConfig, config)
          const { show, ...opt} = mergeOpt
          chart.tooltip(show, opt)
          chart.render()
        }
      }
    </ChartContext.Consumer>
  )
}

export default ToolTips
