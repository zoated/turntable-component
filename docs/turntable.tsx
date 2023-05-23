import React, { useState } from 'react';
import Wheel from '@turntable-component/react';
import './index.css'

const mock ={
    fonts:  [{
    title: '镇水神兽',
    fontColor: '#000000',
    backgroundColor: '#eee',
    fontSize: 18,
},
{
    title: '镇水神兽',
    fontColor: '#000000',
    backgroundColor: '#eee',
    fontSize: 18,
},
{
    title: '镇水神兽',
    fontColor: '#000000',
    backgroundColor: '#eee',
    fontSize: 18,
},
{
    title: '镇水神兽',
    fontColor: '#000000',
    backgroundColor: '#eee',
    fontSize: 18,
},
{
    title: '镇水神兽',
    fontColor: '#000000',
    backgroundColor: '#eee',
    fontSize: 18,
},
{
    title: '镇水神兽',
    fontColor: '#000000',
    backgroundColor: '#eee',
    fontSize: 18,
},
{
    title: '镇水神兽',
    fontColor: '#000000',
    backgroundColor: '#eee',
    fontSize: 18,
    }],
    imgs: [
        {
            src: 'https://4tune-wemore.oss-cn-beijing.aliyuncs.com/turntable/assets/images/turntable-background.png'
        },
        {
            src: 'https://4tune-wemore.oss-cn-beijing.aliyuncs.com/turntable/assets/images/turntable-background.png'
        },
        {
            src: 'https://4tune-wemore.oss-cn-beijing.aliyuncs.com/turntable/assets/images/turntable-background.png'
        },
    ]
}

const mockString = ['真心话', '真的话', '大冒险', '小冒险', '冒险家', '下水道']
const Turntable = () => { 
    const [lockTurn, setLockTurn] = useState(false)
    const [width, setWidth] = useState(600)
    const [buttons, setButtons] = useState<any>({
        title: '开转'
    })
    const afterTurn = (index: number) => {
        console.warn('index', index)
    }

    const onChangeWidth = (e) => {
        setWidth(Number(e?.target?.value))
    }

    const onChangeButtons = (e, key) => {
        setButtons((pre) => ({
            ...pre,
            [key]: e?.target?.value
        }))
    }
    return(
        <div className='turntable-component-wrapper'>
            <text className='turntable-component-title'>
                转盘组件
            </text>
            <Wheel width={width} buttons={buttons} background="https://4tune-wemore.oss-cn-beijing.aliyuncs.com/turntable/assets/images/turntable-background.png" options={mockString}
            pointer={{src: 'https://static.wemore.com/turntable/assets/images/single-pointer.png'}}
            lockTurn={lockTurn}
            setLockTurn={setLockTurn}
            afterTurn={afterTurn}
            />
            <div className='turntable-options-wrapper'>
                <text className='turntable-options-title'>转盘配置</text>
                <div className='turntable-options-content'>
                    <div className='turntable-options-item'>
                        <div className='turntable-options-item-title'>width</div>
                        <input className='turntable-options-item-component' type="number" onChange={onChangeWidth} value={width} min={300} max={800} />
                    </div>
                    <div className='turntable-options-item'>
                        <div className='turntable-options-item-title'>buttons</div>
                        <div>
                            <div className='turntable-options-item-item'>
                                <text>title：</text>
                                <input className='turntable-options-item-component' onChange={(e) => onChangeButtons(e, 'title')} value={buttons?.title} max={4} />
                            </div>
                            <div className='turntable-options-item-item'>
                                <text>fontSize：</text>
                                <input className='turntable-options-item-component' onChange={(e) => onChangeButtons(e, 'fontSize')} value={buttons?.fontSize} max={4} />
                            </div>
                            <div className='turntable-options-item-item'>
                                <text>backgroundColor：</text>
                                <div>linear-gradient(180deg, rgba(252, 255, 105, 0) 36.72%, #FFFFFF 100%)</div>
                            </div>
                            <div className='turntable-options-item-item'>
                                <text>fontColor：</text>
                                <div>#E96E14</div>
                            </div>
                        </div>
                    </div>
                    <div className='turntable-options-item'>
                        <div className='turntable-options-item-title'>options</div>
                        <div className='turntable-options-item-component'>string[]</div>
                    </div>
                    <div className='turntable-options-item'>
                        <div className='turntable-options-item-title'>background</div>
                        <div className='turntable-options-item-component'>string</div>
                    </div>
                    <div className='turntable-options-item'>
                        <div className='turntable-options-item-title'>afterTurn</div>
                        <div className='turntable-options-item-component'>{`(resIndex: number) => void`}</div>
                    </div>
                </div>
            </div>
          </div>
    )
}

export default Turntable