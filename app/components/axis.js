/*
 * @Author: baizn
 * @Date: 2018-11-28 11:30:58
 * @LastEditors: baizn
 * @LastEditTime: 2018-11-30 14:42:23
 * @Description: 坐标轴组件
 */
import React from 'react'
import { ChartContext } from './context'

function Axis({ field, config}) {
  return (
    <ChartContext.Consumer>
      {
        chart => {
          if(!chart) return null
          chart.axis(field, config)
          chart.render()
        }
      }
    </ChartContext.Consumer>
  )
}

export default Axis
