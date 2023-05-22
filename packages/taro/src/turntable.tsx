import {useEffect, useState, useRef} from 'react'
import Taro from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import './index.css'
import { onHandleVibration } from './utils'

type BaseWheelProps = {
  width: number
  padding?: number
  background?: string
  buttons?: {
    title: string,
    fontColor?: string
    backgroundColor?: string
    fontSize?: number
    fontWeight?: number
  }
  options: string[]
  lockTurn: boolean
  setLockTurn(isLock: boolean): void
  afterTurn(index: number): void
}
const Wheel = ({
  width,
  padding = 60,
  buttons,
  background,
  options,
  lockTurn,
  setLockTurn,
  afterTurn,
}: BaseWheelProps) => {
  const prizesLength = options?.length
  const initRotate = 360 / prizesLength / 2
  const [currentDegs, setCurrentDegs] = useState({
    before: 0,
    after: initRotate,
  })
  const resIndexRef = useRef(-1)
  const [turnResIndex, setTurnResIndex] = useState(-1)
  const initAnimation = Taro.createAnimation({
    duration: 3000,
    timingFunction: 'ease',
  })
  const [animationData, setAnimationData] = useState(initAnimation.export())
  const [turnIndex, setTurnIndex] = useState(-1)

  useEffect(() => {
    if (currentDegs.after > initRotate && lockTurn) {
      onHandleVibration(
        options?.length,
        {index: turnIndex === -1 ? 0 : turnIndex, resIndex: resIndexRef.current},
        setTurnIndex
      )
    }
  }, [currentDegs.after, lockTurn])

  const playTurn = () => {
      setLockTurn(true)
      if (!lockTurn) {
        setTurnResIndex(-1)
        const randomDegs = Math.round(Math.random() * 360) + (currentDegs?.after || 0)
        // 要转多少度deg
        const newRunDegs = randomDegs + 360 * 4
        const resIndex = prizesLength - Math.round((randomDegs % 360) / (360 / prizesLength))
        setCurrentDegs({
          before: currentDegs?.after || 0,
          after: newRunDegs,
        })
        const data = resIndex === prizesLength ? 0 : resIndex
        resIndexRef.current = data
        initAnimation.rotateZ(newRunDegs).step()
        setAnimationData(initAnimation.export())
        const timer = setTimeout(() => {
          setTurnResIndex(data)
          // setTurnIndex?.(data)
          afterTurn(data)
          setLockTurn(false)
          clearTimeout(timer)
        }, 3000)
      }
  }

  const renderLists = () => {
    const rotateDeg = 360 / prizesLength

    // console.error(rotateWidth, '----rotateWidth')
    return options?.map((item, index) => {
      const deg = -(rotateDeg / 2) + rotateDeg * index
      // console.warn('index', index)
      const isSelected = index === turnResIndex

      const sectorStyle = {
        transform: `rotate(${deg}deg)`,
        left: `${width / 2}px`,
        width: `${width / 2}px`,
        height: `${width}px`,
        borderRadius: `0px ${width / 2}px ${width / 2}px 0`,
      }
      const innerStyle = {
        transform: `translateX(-${width / 2}px) rotate(${rotateDeg}deg)`,
        height: `${width}px`,
        width: `${width / 2}px`,
        borderRadius: `${width / 2}px 0 0 ${width / 2}px`,
        background: isSelected
          ? `linear-gradient(${90 + (prizesLength - 2) * 17.5}deg, #FF5555 30.13%, #FFACAC 60.21%)`
          : 'rgba(255, 255, 255, 0.3)',
      }
      const spanStyle = {
        transform: `rotate(-${rotateDeg / 2}deg) translateX(${width / 4}px)`,
        height: `${width}px`,
        transformOrigin: 'right center',
        display: 'flex',
        justifyContent: 'center',
      }
      return (
        <View className="sector" key={index} style={sectorStyle}>
          <View className="sector-inner" style={innerStyle}>
            <View style={spanStyle}>
              <View
                className={`content${item?.length > 9 ? ' max' : ''}`}
                style={{color: isSelected ? '#fff' : '#CF5A59'}}
              >
                {item}
              </View>
            </View>
          </View>
        </View>
      )
    })
  }

  const wrapperStyle = {
    width: width + padding,
    height: width + padding,
  }
  const pannerStyle = {
    width,
    height: width,
    borderRadius: '50%',
    transform: `rotateZ(${initRotate}deg)`,
  }
  return (
    <View className="wrapper" style={wrapperStyle}>
      <Image
        className="turntable-background"
        src={background!}
        style={wrapperStyle}
      />
      <View
        animation={animationData}
        className="panel"
        key={options?.toString()}
        style={pannerStyle}>
        {renderLists()}
      </View>
      <View className='base-btn-wrapper' onClick={playTurn} style={{fontSize: buttons?.fontSize, fontWeight: buttons?.fontWeight, background: buttons?.backgroundColor, color: buttons?.fontColor}}>
        <View className="btn-bg-wrapper">
        <View className="btn-bg" />
        <View className='btn-title'> {buttons?.title}</View>
      </View>
      </View>
    </View>
  )
}

export default Wheel
