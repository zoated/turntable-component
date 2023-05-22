import React, {useRef, useState} from 'react'
import './index.css'

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
  const [turnResIndex, setTurnResIndex] = useState(-1)
  const panelRefs = useRef<any>(null)


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
        // initAnimation.rotateZ(newRunDegs).step()
        // setAnimationData(initAnimation.export())
        panelRefs.current.style.transform = `rotate(${newRunDegs}deg)`;
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
        <div className="sector" key={index} style={sectorStyle}>
          <div className="sector-inner" style={innerStyle}>
            <div style={spanStyle}>
              <div
                className={`content${item?.length > 9 ? ' max' : ''}`}
                style={{color: isSelected ? '#fff' : '#CF5A59'}}
              >
                {item}
              </div>
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
        // animation={animationData}
        className="panel"
        ref={refs => panelRefs.current = refs}
        key={options?.toString()}
        style={pannerStyle}>
        {renderLists()}
      </div>
      <div className='base-btn-wrapper' onClick={playTurn} style={{fontSize: buttons?.fontSize, fontWeight: buttons?.fontWeight, background: buttons?.backgroundColor, color: buttons?.fontColor}}>
        <div className="btn-bg-wrapper">
        <div className="btn-bg" />
        <div className='btn-title'> {buttons?.title}</div>
      </div> 
      </div>
      {/* <image className="turntable-pointer" src={multi ? MULTI_POINTER : SINGLE_POINTER} /> */}
      {/* <BaseButton disabled={lockTurn} onClick={playTurn} title={multi ? '准备' : '开转'} /> */}
    </div>
  )
}

export default Wheel
