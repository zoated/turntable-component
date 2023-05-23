import React, { useMemo, useRef, useState } from 'react';

class CommonTurntable {
  constructor(data) {
      this.width = data.width;
      this.options = data.options;
      this.rotateDeg = 360 / (data.options === null || data.options === void 0 ? void 0 : data.options.length);
      this.degs = {
          before: 0,
          after: 360 / (data.options === null || data.options === void 0 ? void 0 : data.options.length) / 2,
      };
  }

  getTurntableStyle(index, turnResIndex) {
      const deg = -(this.rotateDeg / 2) + this.rotateDeg * index;
      const isSelected = index === turnResIndex;
      const sectorStyle = {
          transform: `rotate(${deg}deg)`,
          left: `${this.width / 2}px`,
          width: `${this.width / 2}px`,
          height: `${this.width}px`,
          borderRadius: `0px ${this.width / 2}px ${this.width / 2}px 0`,
      };
      const initBackground = 'rgba(255, 255, 255, 0.3)';
      const initSelectBackground = `linear-gradient(${90 + (this.options === null || this.options === void 0 ? void 0 : this.options.length - 2) * 17.5}deg, #FF5555 30.13%, #FFACAC 60.21%)`;
      
      const innerStyle = {
          transform: `translateX(-${this.width / 2}px) rotate(${this.rotateDeg}deg)`,
          height: `${this.width}px`,
          width: `${this.width /2}px`,
          borderRadius: `${this.width / 2}px 0 0 ${this.width / 2}px`,
          background: isSelected
              ? this.options?.[index]?.selectedColor || initSelectBackground
              : this.options?.[index]?.backgroundColor || initBackground
      };
      const spanStyle = {
          transform: `rotate(-${this.rotateDeg / 2}deg) translateX(${this.width / 4}px)`,
          height: `${this.width}px`,
          transformOrigin: 'right center',
          display: 'flex',
          justifyContent: 'center',
      };
      return { sectorStyle, innerStyle, spanStyle };
  }
  play() {
      const randomDegs = Math.round(Math.random() * 360) + this.degs.after;
      // 要转多少度deg
      const newRunDegs = randomDegs + 360 * 4;
      const resIndex = this.options === null || this.options === void 0 ? void 0 : this.options.length - Math.round((randomDegs% 360) / (360 / (this.options === null || this.options === void 0 ? void 0 : this.options.length)));
      this.degs = {
          before: this.degs.after,
          after: newRunDegs,
      };
      const data = resIndex === (this.options === null || this.options === void 0 ? void 0 : this.options.length) ? 0 : resIndex;
      return { data, newRunDegs };
  }
}

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

var css_248z = ".wrapper {\n  position: relative;\n  \n  \n}\n.turntable-background{\n  position: absolute;\n  border-radius: 50%;\n}\n.turntable-pointer{\n  position: absolute;\n  width: 56px;\n  height: 62px;\n  top: -12px;\n  left: calc(50% - 28px);\n}\n\n.panel {\n  position: relative;\n  margin: 0 auto;\n  top: 28px;\n  transform: rotateZ(0deg);\n  transform-origin: 'center center';\n  -webkit-transform-origin: 'center center';\n  transition: transform 3s ease-in-out;\n}\n\n.sector {\n  position: absolute;\n  top: 0px;\n  font-size: 14px;\n  overflow: hidden;\n  transform-origin: left center;\n}\n\n.sector-inner {\n  text-align: center;\n  display: block;\n  transform-origin: right center;\n  background: rgba(255, 255, 255, 0.3);\n  box-shadow: inset 3px -3px 14px rgba(251, 160, 160, 0.6);\n}\n.sector-inner span {\n  display: block;\n  color: #d46854;\n}\n\n.content {\n  white-space:normal;\n  word-break:break-all;\n  transform: translateY(20px);\n  max-width: 50%;\n  font-weight: 400;\n  font-size: 16px;\n  line-height: 24px;\n  text-align: center;\n  color: #CF5A59;\n  &.max{\n    transform: translateY(12px);\n  }\n}\n\n.success-animation{\n  position: fixed;\n  z-index: -1;\n  width: 100%;\n  top: 40px;\n}\n\n\n.base-btn-wrapper{\n  position: absolute;\n  top: calc(50% - 46px);\n  left: calc(50% - 46px);\n  z-index: 88;\n}\n.btn-bg-wrapper{\n  position: relative;\n  width: 84px;\n  height: 84px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(180deg, #FFDFA9 0%, #FFA60F 100%);\n  border: 4px solid #FFFFFF;\n  box-shadow: 0px 0px 30px #FD5F5E;\n}\n\n.btn-bg{\n  padding: 7px;\n  width: 70px;\n  height: 70px;\n  border-radius: 50%;\n  background: linear-gradient(180deg, rgba(252, 255, 105, 0) 36.72%, #FFFFFF 100%);\n  opacity: 0.6;\n  filter: blur(3px);\n}\n.btn-title{\n  position: absolute;\n  font-weight: 900;\n  font-size: 26px;\n  line-height: 31px;\n  text-align: center;\n  color: #E96E14;\n}\n\n.turntable-pointer{\n  position: absolute;\n  width: 56px;\n  height: 62px;\n  top: 0px;\n  left: calc(50% - 28px);\n}\n\n.option-img-item{\n  position: absolute;\n  top: 60px;\n  width: 60px;\n  height: 60px;\n  object-fit: cover;\n}";
styleInject(css_248z);

const Wheel = ({ width, padding = 60, buttons, background, options, pointer, lockTurn, setLockTurn, afterTurn, }) => {
    const turntableOptions = Array.isArray(options) ? options : options?.fonts;
    const prizesLength = turntableOptions?.length;
    const initRotate = 360 / prizesLength / 2;
    const turntable = useMemo(() => new CommonTurntable({ width, options: turntableOptions }), [width]);
    const panelRefs = useRef(null);
    const [resIndex, setResIndex] = useState(-1);
    const playTurn = () => {
        setLockTurn(true);
        if (!lockTurn) {
            setResIndex(-1);
            const { data, newRunDegs } = turntable?.play();
            panelRefs.current.style.transform = `rotate(${newRunDegs}deg)`;
            const timer = setTimeout(() => {
                // setTurnIndex?.(data)
                setResIndex(data);
                afterTurn(data);
                setLockTurn(false);
                clearTimeout(timer);
            }, 3000);
        }
    };
    const renderLists = () => {
        // console.error(rotateWidth, '----rotateWidth')
        return turntableOptions?.map((item, index) => {
            const { sectorStyle, innerStyle, spanStyle } = turntable?.getTurntableStyle(index, resIndex);
            const isSelected = index === resIndex;
            return (React.createElement("div", { className: "sector", key: index, style: sectorStyle },
                React.createElement("div", { className: "sector-inner", style: innerStyle },
                    React.createElement("div", { style: spanStyle },
                        React.createElement("div", { className: `content${item?.length > 9 ? ' max' : ''}`, style: { color: isSelected ? '#fff' : item?.fontColor, fontSize: item?.fontSize, fontWeight: item?.fontWeight } }, item?.title || item),
                        !Array.isArray(options) && options?.imgs[index]?.src && React.createElement("img", { src: options?.imgs[index]?.src, className: 'option-img-item', style: { top: options?.imgs[index]?.top, width: options?.imgs[index]?.width, height: options?.imgs[index]?.height } })))));
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
        React.createElement("div", { className: "panel", ref: refs => panelRefs.current = refs, style: pannerStyle }, renderLists()),
        pointer && React.createElement("img", { className: "turntable-pointer", src: pointer?.src, style: { top: pointer?.top, width: pointer?.width, height: pointer?.height } }),
        buttons &&
            (React.createElement("div", { className: 'base-btn-wrapper', onClick: playTurn, style: { fontSize: buttons?.fontSize, fontWeight: buttons?.fontWeight, background: buttons?.backgroundColor, color: buttons?.fontColor } },
                React.createElement("div", { className: "btn-bg-wrapper" },
                    React.createElement("div", { className: "btn-bg" }),
                    React.createElement("div", { className: 'btn-title' },
                        " ",
                        buttons?.title))))));
};

export { Wheel as default };
//# sourceMappingURL=index.js.map
