/*
 * @Author: baizn
 * @Date: 2018-11-30 15:53:58
 * @LastEditors: baizn
 * @LastEditTime: 2018-11-30 16:13:59
 * @Description: G2图表辅助元素组件
 */
import React from 'react'
import { ChartContext } from './context'

function Guide({ config }) {
  return (
    <ChartContext.Consumer>
      {
        chart => {
          if(!chart) return null
          debugger
          const guide = chart.guide()
          // 配置了辅助信息
          if(config) {
            // 遍历辅助信息对象，设置guide信息
           for(let key in config) {
             guide[key](config[key])
           } 
          }
          chart.render()
        }
      }
    </ChartContext.Consumer>
  )
}

export default Guide
