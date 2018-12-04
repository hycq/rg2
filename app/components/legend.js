/*
 * @Author: baizn
 * @Date: 2018-11-30 15:00:36
 * @LastEditors: baizn
 * @LastEditTime: 2018-12-03 16:02:27
 * @Description: 可视化图表图例组件
 */
import React from 'react'
import { ChartContext } from './context'

function Legend({ show = true, position, config}) {
  return (
    <ChartContext.Consumer>
      {
        ({ chart, view }) => {
          if(!chart || !view) return null
          if(!show) {
            // 不展示图例，则忽略其他配置
            chart.legend(show)
          } else {
            // 展示图例，则根据其他配置判断
            if(position) {
              // 设置单个字段的图例
              chart.legend(position, config)
            } else {
              // 设置全部图例
              chart.legend(config)
            }
          }
          chart.render()
        }
      }
    </ChartContext.Consumer>
  )
}

export default Legend
