import G2 from '@antv/g2'

/**
 * 自定义Shape形状
 * @param {string} type 几何标记类型
 * @param {*} name 自定义Shape形状的名称
 * @param {*} callback 实现自定义形状的回调函数
 */
export const registerShape = (type, name, callback) => {
  return G2.Shape.registerShape(type, name, {
    draw: callback
  })
}

// 默认提供花瓣形状
export const petal = (type) => {
  const pointRatio = 0.7 // 设置开始变成圆弧的位置 0.7
  // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
  const sliceNumber = 0.005
  
  // 根据比例，获取两点之间的点
  function getPoint(p0, p1, ratio) {
    return {
      x: (1 - ratio) * p0.x + ratio * p1.x,
      y: (1 - ratio) * p0.y + ratio * p1.y
    }
  }
  
  registerShape(type, 'petal', function(cfg, container) {
    cfg.points[1].y = cfg.points[1].y - sliceNumber
      cfg.points[2].y = cfg.points[2].y - sliceNumber
      let centerPoint = {
        x: cfg.points[3].x,
        y: (cfg.points[2].y + cfg.points[3].y) / 2
      }
      
      centerPoint = this.parsePoint(centerPoint)
      let points = this.parsePoints(cfg.points)
      let path = []
      let tmpPoint1 = getPoint(points[0], points[3], pointRatio)
      let tmpPoint2 = getPoint(points[1], points[2], pointRatio)
      path.push(['M', points[0].x, points[0].y])
      path.push(['L', tmpPoint1.x, tmpPoint1.y])
      path.push(['Q', points[3].x, points[3].y, centerPoint.x, centerPoint.y])
      path.push(['Q', points[2].x, points[2].y, tmpPoint2.x, tmpPoint2.y])
      path.push(['L', points[1].x, points[1].y])
      path.push(['z'])
      return container.addShape('path', {
        attrs: {
          fill: cfg.color,
          path: path
        }
      })
  })
}