import {useState} from 'react'
import Taro from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import './index.css'
import CommonTurntable from '../../common/src/index'

type TextProps ={
  title: string,
  fontColor?: string
  backgroundColor?: string
  fontSize?: number
  fontWeight?: number
  selectedColor?: string
}

type ImageProps = {
  src: string
  top?: number
  width?: number
  height?: number
}
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
  options: string[] | {
    fonts: TextProps[],
    imgs?: ImageProps[]
  }
  pointer?: {
    src: string
    top?: number
    width?: number
    height?: number
  }
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
  pointer,
  lockTurn,
  setLockTurn,
  afterTurn,
}: BaseWheelProps) => {
  const turntableOptions =  Array.isArray(options) ? options : options?.fonts
  const prizesLength = turntableOptions?.length
  const initRotate = 360 / prizesLength / 2
  const turntable = new CommonTurntable({width, options: turntableOptions})
  const initAnimation = Taro.createAnimation({
    duration: 3000,
    timingFunction: 'ease',
  })
  const [resIndex, setResIndex] = useState(-1)
  const [animationData, setAnimationData] = useState(initAnimation.export())

  const playTurn = () => {
      setLockTurn(true)
      if (!lockTurn) {
        setResIndex(-1)
        const {data, newRunDegs} = turntable?.play()
        initAnimation.rotateZ(newRunDegs).step()
        setAnimationData(initAnimation.export())
        const timer = setTimeout(() => {
          setResIndex(data!)
          afterTurn(data!)
          setLockTurn(false)
          clearTimeout(timer)
        }, 3000)
      }
  }

  const renderLists = () => {
    return turntableOptions?.map((item, index) => {
      const {sectorStyle, innerStyle, spanStyle} = turntable?.getTurntableStyle(index, resIndex)
      const isSelected = index === resIndex
      return (
        <View className="sector" key={index} style={sectorStyle}>
          <View className="sector-inner" style={innerStyle}>
            <View style={spanStyle}>
              <View
                className={`content${item?.length > 9 ? ' max' : ''}`}
                style={{color: isSelected ? '#fff' : item?.fontColor, fontSize: item?.fontSize, fontWeight: item?.fontWeight}}
              >
                 {item?.title || item}
              </View>
              {!Array.isArray(options) && options?.imgs?.[index]?.src && <Image src={options?.imgs[index]?.src} className='option-img-item' style={{top: options?.imgs[index]?.top, width: options?.imgs[index]?.width, height: options?.imgs[index]?.height}} />}
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
        style={pannerStyle}>
        {renderLists()}
      </View>
      {pointer && <Image className="turntable-pointer" src={pointer?.src} style={{top: pointer?.top, width: pointer?.width, height: pointer?.height}} />}

      {buttons && 
      (<View className='base-btn-wrapper' onClick={playTurn} style={{fontSize: buttons?.fontSize, fontWeight: buttons?.fontWeight, background: buttons?.backgroundColor, color: buttons?.fontColor}}>
        <View className="btn-bg-wrapper">
        <View className="btn-bg" />
        <View className='btn-title'> {buttons?.title}</View>
      </View>
      </View>)}
    </View>
  )
}

export default Wheel
