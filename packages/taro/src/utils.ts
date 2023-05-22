import Taro from '@tarojs/taro'

export const onHandleVibration = (
    length: number,
    info: {index: number; resIndex: number},
    callback
  ) => {
    const {index, resIndex} = info
    Taro.vibrateShort({
      type: 'heavy',
    })
    let currentIndex = index
    // 真实的初始index
    const vibrationIndex = length - 1 - index
    // 转盘3秒经过的总选项个数
    const turnsTotal =
      length * 3 +
      (vibrationIndex > resIndex ? vibrationIndex - resIndex : vibrationIndex + length - resIndex)
    const lastTotal = length > 3 ? length / 2 : length
    const interval = setInterval(() => {
      Taro.vibrateShort({
        type: 'heavy',
      })
      callback(++currentIndex % length)
    }, 2000 / (turnsTotal - lastTotal))
    const timer = setTimeout(() => {
      clearInterval(interval)
      clearTimeout(timer)
      const interval2 = setInterval(() => {
        Taro.vibrateShort({
          type: 'heavy',
        })
        callback(++currentIndex % length)
      }, 1000 / lastTotal)
      const timer2 = setTimeout(() => {
        clearInterval(interval2)
        clearTimeout(timer2)
      }, 1000)
    }, 2000)
  }
