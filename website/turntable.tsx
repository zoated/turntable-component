import React, { useState } from 'react';
import Wheel from '@turntable-component/react';
import './index.css'
import TableParams from './table_params';

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
            <h2>一个跨平台（React, Taro）转盘组件</h2>
            <Wheel width={width} buttons={buttons} background="https://4tune-wemore.oss-cn-beijing.aliyuncs.com/turntable/assets/images/turntable-background.png" options={mockString}
            pointer={{src: 'https://static.wemore.com/turntable/assets/images/single-pointer.png'}}
            lockTurn={lockTurn}
            setLockTurn={setLockTurn}
            afterTurn={afterTurn}
            />
            <TableParams />
        </div>
    )
}

export default Turntable