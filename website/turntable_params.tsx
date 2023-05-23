import React from 'react'

const TURNTABLE_PROPS = [
    {prop: 'width', title: '转盘宽度', type: 'number', initValue: 600}, 
    {prop: 'padding', title: '转盘选项距离转盘边框的距离', type: 'number', initValue: 60},
    {prop: 'buttons', title: '转盘按钮', type: 'TextProps', initValue: '-'},
    {prop: 'pointer', title: '转盘指针', type: 'TextProps', initValue: '-'},
    {prop: 'buttons', title: '转盘按钮', type: 'string[]｜{fonts: TextProps[],imgs?: ImageProps[]}', initValue: '-'},
    {prop: 'lockTurn', title: '是否允许开转标记', type: 'boolean', initValue: false},
    {prop: 'setLockTurn', title: '设置开转限制方法', type: 'function(isLock: boolean)', initValue: '-'},
    {prop: 'afterTurn', title: '开转后回调', type: 'function(index: index)', initValue: '-'},
]

const TEXT_PROPS = [
    {prop: 'title', title: '文字', type: 'string', initValue: '-'}, 
    {prop: 'fontColor', title: '文字颜色', type: 'string', initValue: '#d46854'},
    {prop: 'backgroundColor', title: '当前选项背景颜色', type: 'string', initValue: 'rgba(255, 255, 255, 0.3)'},
    {prop: 'fontSize', title: '文字大小', type: 'number', initValue: 14},
    {prop: 'fontWeight', title: '文字加粗', type: 'number', initValue: '-'},
    {prop: 'selectedColor', title: '选项选中颜色', type: 'string', initValue: 'linear-gradient(120deg, #FF5555 30.13%, #FFACAC 60.21%)'},
]

const IMAGES_PROPS = [
    {prop: 'src', title: '指针图片地址', type: 'string', initValue: '-'}, 
    {prop: 'top', title: '指针和转盘顶部距离', type: 'number', initValue: 0}, 
    {prop: 'width', title: '指针宽度', type: 'number', initValue: 56}, 
    {prop: 'height', title: '指针高度', type: 'number', initValue: 62}, 
]
const TurntableParams = () => {
    const renderTable = (tableArr) => {
        return (
        <table>
            <tr>
                <th>参数</th>
                <th>说明</th>
                <th>类型</th>
                <th>默认值</th>
            </tr>
            {tableArr.map((item,index) => (
                <tr key={index}>
                    <td>{item.prop}</td>
                    <td>{item.title}</td>
                    <td>{item.type}</td>
                    <td>{item.initValue}</td>
                </tr>
            ))}
        </table>
        )
    }
    return (
        <div className='table-params-wrapper'>
            <h2>Api</h2>
            <h3>Turntable props</h3>
                {renderTable(TURNTABLE_PROPS)}
            <h3>TextProps</h3>
                {renderTable(TEXT_PROPS)}
            <h3>ImageProps</h3>
                {renderTable(IMAGES_PROPS)}
        </div>
    )
}

export default TurntableParams
