import React, { useState, useRef } from 'react';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".wrapper {\n  position: relative;\n  \n  \n}\n.turntable-background{\n  position: absolute;\n  border-radius: 50%;\n}\n.turntable-pointer{\n  position: absolute;\n  width: 56px;\n  height: 62px;\n  top: -12px;\n  left: calc(50% - 28px);\n}\n\n.panel {\n  position: relative;\n  margin: 0 auto;\n  top: 28px;\n  transform: rotateZ(0deg);\n  transform-origin: 'center center';\n  -webkit-transform-origin: 'center center';\n  transition: transform 3s ease-in-out;\n}\n\n.sector {\n  position: absolute;\n  top: 0px;\n  font-size: 14px;\n  overflow: hidden;\n  transform-origin: left center;\n}\n\n.sector-inner {\n  text-align: center;\n  display: block;\n  transform-origin: right center;\n  background: rgba(255, 255, 255, 0.3);\n  box-shadow: inset 3px -3px 14px rgba(251, 160, 160, 0.6);\n}\n.sector-inner span {\n  display: block;\n  color: #d46854;\n}\n\n.content {\n  white-space:normal;\n  word-break:break-all;\n  transform: translateY(20px);\n  max-width: 50%;\n  font-weight: 400;\n  font-size: 16px;\n  line-height: 24px;\n  text-align: center;\n  color: #CF5A59;\n  &.max{\n    transform: translateY(12px);\n  }\n}\n\n.success-animation{\n  position: fixed;\n  z-index: -1;\n  width: 100%;\n  top: 40px;\n}\n\n\n.base-btn-wrapper{\n  position: absolute;\n  top: calc(50% - 46px);\n  left: calc(50% - 46px);\n  z-index: 88;\n}\n.btn-bg-wrapper{\n  position: relative;\n  width: 84px;\n  height: 84px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(180deg, #FFDFA9 0%, #FFA60F 100%);\n  border: 4px solid #FFFFFF;\n  box-shadow: 0px 0px 30px #FD5F5E;\n}\n\n.btn-bg{\n  padding: 7px;\n  width: 70px;\n  height: 70px;\n  border-radius: 50%;\n  background: linear-gradient(180deg, rgba(252, 255, 105, 0) 36.72%, #FFFFFF 100%);\n  opacity: 0.6;\n  filter: blur(3px);\n}\n.btn-title{\n  position: absolute;\n  font-weight: 900;\n  font-size: 26px;\n  line-height: 31px;\n  text-align: center;\n  color: #E96E14;\n}";
styleInject(css_248z);

const Wheel = ({ width, padding = 60, buttons, background, options, lockTurn, setLockTurn, afterTurn, }) => {
    const prizesLength = options?.length;
    const initRotate = 360 / prizesLength / 2;
    const [currentDegs, setCurrentDegs] = useState({
        before: 0,
        after: initRotate,
    });
    const [turnResIndex, setTurnResIndex] = useState(-1);
    const panelRefs = useRef(null);
    const playTurn = () => {
        setLockTurn(true);
        if (!lockTurn) {
            setTurnResIndex(-1);
            const randomDegs = Math.round(Math.random() * 360) + (currentDegs?.after || 0);
            // 要转多少度deg
            const newRunDegs = randomDegs + 360 * 4;
            const resIndex = prizesLength - Math.round((randomDegs % 360) / (360 / prizesLength));
            setCurrentDegs({
                before: currentDegs?.after || 0,
                after: newRunDegs,
            });
            const data = resIndex === prizesLength ? 0 : resIndex;
            // initAnimation.rotateZ(newRunDegs).step()
            // setAnimationData(initAnimation.export())
            panelRefs.current.style.transform = `rotate(${newRunDegs}deg)`;
            const timer = setTimeout(() => {
                setTurnResIndex(data);
                // setTurnIndex?.(data)
                afterTurn(data);
                setLockTurn(false);
                clearTimeout(timer);
            }, 3000);
        }
    };
    const renderLists = () => {
        const rotateDeg = 360 / prizesLength;
        // console.error(rotateWidth, '----rotateWidth')
        return options?.map((item, index) => {
            const deg = -(rotateDeg / 2) + rotateDeg * index;
            // console.warn('index', index)
            const isSelected = index === turnResIndex;
            const sectorStyle = {
                transform: `rotate(${deg}deg)`,
                left: `${width / 2}px`,
                width: `${width / 2}px`,
                height: `${width}px`,
                borderRadius: `0px ${width / 2}px ${width / 2}px 0`,
            };
            const innerStyle = {
                transform: `translateX(-${width / 2}px) rotate(${rotateDeg}deg)`,
                height: `${width}px`,
                width: `${width / 2}px`,
                borderRadius: `${width / 2}px 0 0 ${width / 2}px`,
                background: isSelected
                    ? `linear-gradient(${90 + (prizesLength - 2) * 17.5}deg, #FF5555 30.13%, #FFACAC 60.21%)`
                    : 'rgba(255, 255, 255, 0.3)',
            };
            const spanStyle = {
                transform: `rotate(-${rotateDeg / 2}deg) translateX(${width / 4}px)`,
                height: `${width}px`,
                transformOrigin: 'right center',
                display: 'flex',
                justifyContent: 'center',
            };
            return (React.createElement("div", { className: "sector", key: index, style: sectorStyle },
                React.createElement("div", { className: "sector-inner", style: innerStyle },
                    React.createElement("div", { style: spanStyle },
                        React.createElement("div", { className: `content${item?.length > 9 ? ' max' : ''}`, style: { color: isSelected ? '#fff' : '#CF5A59' } }, item)))));
        });
    };
    const wrapperStyle = {
        width: width + padding,
        height: width + padding,
    };
    const pannerStyle = {
        width,
        height: width,
        borderRadius: '50%',
        transform: `rotateZ(${initRotate}deg)`,
    };
    return (React.createElement("div", { className: "wrapper", style: wrapperStyle },
        React.createElement("img", { className: "turntable-background", src: background, style: wrapperStyle }),
        React.createElement("div", { 
            // animation={animationData}
            className: "panel", ref: refs => panelRefs.current = refs, key: options?.toString(), style: pannerStyle }, renderLists()),
        React.createElement("div", { className: 'base-btn-wrapper', onClick: playTurn, style: { fontSize: buttons?.fontSize, fontWeight: buttons?.fontWeight, background: buttons?.backgroundColor, color: buttons?.fontColor } },
            React.createElement("div", { className: "btn-bg-wrapper" },
                React.createElement("div", { className: "btn-bg" }),
                React.createElement("div", { className: 'btn-title' },
                    " ",
                    buttons?.title)))));
};

export { Wheel as default };
//# sourceMappingURL=index.js.map
