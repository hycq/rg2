/*
 * @Author: baizn
 * @Date: 2018-12-03 16:11:07
 * @LastEditors: baizn
 * @LastEditTime: 2018-12-03 17:31:47
 * @Description: 封装的G2 View组件
 */
import React from 'react'
import DateSet from '@antv/data-set'
import { ChartContext } from './context'
import _ from 'lodash'

// View 默认配置
const defaultViewConfig = {
  start: {
    x: 0,
    y: 0
  },
  end: {
    x: 1,
    y: 1
  },
  animate: true
}

function View({ data, coord, config }) {
  return (
    <ChartContext.Consumer>
      {
        ({ chart }) => {
          if(!chart) return null
          // 合并配置项
          const option = _.merge(defaultViewConfig, config)
          const view = chart.view(option)
          // 设置View的坐标系
          if(coord) {
            const { name, config } = coord
            view.coord(name, config)
          }
          // 设置View源数据
          if(data) {
            const ds = new DateSet()
            const dsView = ds.createView().source(data)
            view.source(dsView)
          }
          
          chart.render()
        }
      }
    </ChartContext.Consumer>
  )
}

export default View
