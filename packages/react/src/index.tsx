import React, {useMemo, useRef, useState} from 'react'
import CommonTurntable from '../../common/src/index'
import './index.css'

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
  buttons?: TextProps
  options: string[] | {
    fonts: TextProps[],
    imgs?: ImageProps[]
  }
  pointer?: ImageProps
  lockTurn: boolean
  setLockTurn(isLock: boolean): void
  afterTurn(index: number): void
}
const Wheel = ({
  width = 600,
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
  const stringOptions = Array.isArray(options) ? options?.toString() : options?.fonts?.map(item => item?.title)?.toString()
  const prizesLength = turntableOptions?.length
  const initRotate = 360 / prizesLength / 2
  const turntable = useMemo(() => new CommonTurntable({width, options: turntableOptions}), [width, stringOptions])
  const panelRefs = useRef<any>(null)
  const [resIndex, setResIndex] = useState(-1)

  const playTurn = () => {
      setLockTurn(true)
      if (!lockTurn) {
        setResIndex(-1)
        const {data, newRunDegs} = turntable?.play()
        panelRefs.current.style.transform = `rotate(${newRunDegs}deg)`;
        const timer = setTimeout(() => {
          // setTurnIndex?.(data)
          setResIndex(data)
          afterTurn(data)
          setLockTurn(false)
          clearTimeout(timer)
        }, 3000)
      }
  }

  const renderLists = () => {
    // console.error(rotateWidth, '----rotateWidth')
    return turntableOptions?.map((item, index) => {
      const {sectorStyle, innerStyle, spanStyle} = turntable?.getTurntableStyle(index, resIndex)
      const isSelected = index === resIndex
      return (
        <div className="sector" key={index} style={sectorStyle}>
          <div className="sector-inner" style={innerStyle}>
            <div style={spanStyle}>
              <div
                className={`content${item?.length > 9 ? ' max' : ''}`}
                style={{color: isSelected ? '#fff' : item?.fontColor, fontSize: item?.fontSize, fontWeight: item?.fontWeight}}
              >
                {item?.title || item}
              </div>
              {!Array.isArray(options) && options?.imgs[index]?.src && <img src={options?.imgs[index]?.src} className='option-img-item' style={{top: options?.imgs[index]?.top, width: options?.imgs[index]?.width, height: options?.imgs[index]?.height}}/>}
            </div>
          </div>
        </div>
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
    <div className="wrapper" style={wrapperStyle}>
      <img
        className="turntable-background"
        src={background}
        style={wrapperStyle}
      />
      <div
        className="panel"
        ref={refs => panelRefs.current = refs}
        style={pannerStyle}>
        {renderLists()}
      </div>
      {pointer && <img className="turntable-pointer" src={pointer?.src} style={{top: pointer?.top, width: pointer?.width, height: pointer?.height}}/>}
      {buttons && 
      (
        <div className='base-btn-wrapper' onClick={playTurn} style={{fontSize: buttons?.fontSize, fontWeight: buttons?.fontWeight, background: buttons?.backgroundColor, color: buttons?.fontColor}}>
          <div className="btn-bg-wrapper">
            <div className="btn-bg" />
            <div className='btn-title'> {buttons?.title}</div>
          </div> 
        </div>
      )}
    </div>
  )
}

export default Wheel
