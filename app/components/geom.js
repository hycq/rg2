/*
 * @Author: baizn
 * @Date: 2018-11-28 14:36:34
 * @LastEditors: baizn
 * @LastEditTime: 2018-12-03 16:08:03
 * @Description: Geom 几何标记组件，适用于折线图、柱状图、点图等基本图形，支持自定义图形形状
 */
import React from 'react'
import { ChartContext } from './context'
import _ from 'lodash'

function Geom({ type, position, config }) {
  return (
    <ChartContext.Consumer>
      {
        ({ chart, view }) => {
          if(!chart || !view) return null
          let geom = view[type]().position(position)
          if(config) {
            // 配置config，则循环遍历各个对象值
            for(let c in config) {
              if(!geom[c]) continue
              let value = config[c]
              if(_.isObject(value)) {
                // 按字段配置，则遍历设置
                for(let key in value) {
                  geom[c](key, value[key])
                }
              } else if(_.isString(value) || _.isNumber(value)) {
                // 如果是字符串值，则直接设置
                geom[c](value) 
              }
            }
          }
          chart.render()
        }
      }
    </ChartContext.Consumer>
  )
}

export default Geom