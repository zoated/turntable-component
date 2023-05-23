export default class CommonTurntable {
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
      const initBackground = 'rgba(255, 255, 255, 0.3)'
      const initSelectBackground = `linear-gradient(${90 + (this.options === null || this.options === void 0 ? void 0 : this.options.length - 2) * 17.5}deg, #FF5555 30.13%, #FFACAC 60.21%)`
      
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
