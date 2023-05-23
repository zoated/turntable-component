(function(){"use strict";var __webpack_modules__={27:function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){eval('\n// EXTERNAL MODULE: ./node_modules/react/index.js\nvar react = __webpack_require__(294);\n// EXTERNAL MODULE: ./node_modules/react-dom/client.js\nvar client = __webpack_require__(745);\n// EXTERNAL MODULE: ./node_modules/@turntable-component/react/dist/index.js\nvar dist = __webpack_require__(61);\n// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\nvar injectStylesIntoStyleTag = __webpack_require__(379);\nvar injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);\n// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js\nvar styleDomAPI = __webpack_require__(795);\nvar styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);\n// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js\nvar insertBySelector = __webpack_require__(569);\nvar insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);\n// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\nvar setAttributesWithoutAttributes = __webpack_require__(565);\nvar setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);\n// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js\nvar insertStyleElement = __webpack_require__(216);\nvar insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);\n// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js\nvar styleTagTransform = __webpack_require__(589);\nvar styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);\n// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[2].use[2]!./website/index.css\nvar cjs_ruleSet_1_rules_2_use_2_website = __webpack_require__(184);\n;// CONCATENATED MODULE: ./website/index.css\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (styleTagTransform_default());\noptions.setAttributes = (setAttributesWithoutAttributes_default());\n\n      options.insert = insertBySelector_default().bind(null, "head");\n    \noptions.domAPI = (styleDomAPI_default());\noptions.insertStyleElement = (insertStyleElement_default());\n\nvar update = injectStylesIntoStyleTag_default()(cjs_ruleSet_1_rules_2_use_2_website/* default */.Z, options);\n\n\n\n\n       /* harmony default export */ var website = (cjs_ruleSet_1_rules_2_use_2_website/* default */.Z && cjs_ruleSet_1_rules_2_use_2_website/* default.locals */.Z.locals ? cjs_ruleSet_1_rules_2_use_2_website/* default.locals */.Z.locals : undefined);\n\n// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js\nvar jsx_runtime = __webpack_require__(893);\n;// CONCATENATED MODULE: ./website/turntable.tsx\n\n\n\n\n\nvar mock = {\n  fonts: [{\n    title: \'镇水神兽\',\n    fontColor: \'#000000\',\n    backgroundColor: \'#eee\',\n    fontSize: 18\n  }, {\n    title: \'镇水神兽\',\n    fontColor: \'#000000\',\n    backgroundColor: \'#eee\',\n    fontSize: 18\n  }, {\n    title: \'镇水神兽\',\n    fontColor: \'#000000\',\n    backgroundColor: \'#eee\',\n    fontSize: 18\n  }, {\n    title: \'镇水神兽\',\n    fontColor: \'#000000\',\n    backgroundColor: \'#eee\',\n    fontSize: 18\n  }, {\n    title: \'镇水神兽\',\n    fontColor: \'#000000\',\n    backgroundColor: \'#eee\',\n    fontSize: 18\n  }, {\n    title: \'镇水神兽\',\n    fontColor: \'#000000\',\n    backgroundColor: \'#eee\',\n    fontSize: 18\n  }, {\n    title: \'镇水神兽\',\n    fontColor: \'#000000\',\n    backgroundColor: \'#eee\',\n    fontSize: 18\n  }],\n  imgs: [{\n    src: \'https://4tune-wemore.oss-cn-beijing.aliyuncs.com/turntable/assets/images/turntable-background.png\'\n  }, {\n    src: \'https://4tune-wemore.oss-cn-beijing.aliyuncs.com/turntable/assets/images/turntable-background.png\'\n  }, {\n    src: \'https://4tune-wemore.oss-cn-beijing.aliyuncs.com/turntable/assets/images/turntable-background.png\'\n  }]\n};\nvar mockString = [\'真心话\', \'真的话\', \'大冒险\', \'小冒险\', \'冒险家\', \'下水道\'];\nvar Turntable = function Turntable() {\n  var _useState = (0,react.useState)(false),\n    lockTurn = _useState[0],\n    setLockTurn = _useState[1];\n  var _useState2 = (0,react.useState)(600),\n    width = _useState2[0],\n    setWidth = _useState2[1];\n  var _useState3 = (0,react.useState)({\n      title: \'开转\'\n    }),\n    buttons = _useState3[0],\n    setButtons = _useState3[1];\n  var afterTurn = function afterTurn(index) {\n    console.warn(\'index\', index);\n  };\n  var onChangeWidth = function onChangeWidth(e) {\n    var _e$target;\n    setWidth(Number(e === null || e === void 0 ? void 0 : (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.value));\n  };\n  var onChangeButtons = function onChangeButtons(e, key) {\n    setButtons(function (pre) {\n      var _e$target2, _Object$assign;\n      return Object.assign({}, pre, (_Object$assign = {}, _Object$assign[key] = e === null || e === void 0 ? void 0 : (_e$target2 = e.target) === null || _e$target2 === void 0 ? void 0 : _e$target2.value, _Object$assign));\n    });\n  };\n  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {\n    className: "turntable-component-wrapper",\n    children: [/*#__PURE__*/(0,jsx_runtime.jsx)("text", {\n      className: "turntable-component-title",\n      children: "\\u8F6C\\u76D8\\u7EC4\\u4EF6"\n    }), /*#__PURE__*/(0,jsx_runtime.jsx)(dist/* default */.Z, {\n      width: width,\n      buttons: buttons,\n      background: "https://4tune-wemore.oss-cn-beijing.aliyuncs.com/turntable/assets/images/turntable-background.png",\n      options: mockString,\n      pointer: {\n        src: \'https://static.wemore.com/turntable/assets/images/single-pointer.png\'\n      },\n      lockTurn: lockTurn,\n      setLockTurn: setLockTurn,\n      afterTurn: afterTurn\n    }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {\n      className: "turntable-options-wrapper",\n      children: [/*#__PURE__*/(0,jsx_runtime.jsx)("text", {\n        className: "turntable-options-title",\n        children: "\\u8F6C\\u76D8\\u914D\\u7F6E"\n      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {\n        className: "turntable-options-content",\n        children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {\n          className: "turntable-options-item",\n          children: [/*#__PURE__*/(0,jsx_runtime.jsx)("div", {\n            className: "turntable-options-item-title",\n            children: "width"\n          }), /*#__PURE__*/(0,jsx_runtime.jsx)("input", {\n            className: "turntable-options-item-component",\n            type: "number",\n            onChange: onChangeWidth,\n            value: width,\n            min: 300,\n            max: 800\n          })]\n        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {\n          className: "turntable-options-item",\n          children: [/*#__PURE__*/(0,jsx_runtime.jsx)("div", {\n            className: "turntable-options-item-title",\n            children: "buttons"\n          }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {\n            children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {\n              className: "turntable-options-item-item",\n              children: [/*#__PURE__*/(0,jsx_runtime.jsx)("text", {\n                children: "title\\uFF1A"\n              }), /*#__PURE__*/(0,jsx_runtime.jsx)("input", {\n                className: "turntable-options-item-component",\n                onChange: function onChange(e) {\n                  return onChangeButtons(e, \'title\');\n                },\n                value: buttons === null || buttons === void 0 ? void 0 : buttons.title,\n                max: 4\n              })]\n            }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {\n              className: "turntable-options-item-item",\n              children: [/*#__PURE__*/(0,jsx_runtime.jsx)("text", {\n                children: "fontSize\\uFF1A"\n              }), /*#__PURE__*/(0,jsx_runtime.jsx)("input", {\n                className: "turntable-options-item-component",\n                onChange: function onChange(e) {\n                  return onChangeButtons(e, \'fontSize\');\n                },\n                value: buttons === null || buttons === void 0 ? void 0 : buttons.fontSize,\n                max: 4\n              })]\n            }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {\n              className: "turntable-options-item-item",\n              children: [/*#__PURE__*/(0,jsx_runtime.jsx)("text", {\n                children: "backgroundColor\\uFF1A"\n              }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {\n                children: "linear-gradient(180deg, rgba(252, 255, 105, 0) 36.72%, #FFFFFF 100%)"\n              })]\n            }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {\n              className: "turntable-options-item-item",\n              children: [/*#__PURE__*/(0,jsx_runtime.jsx)("text", {\n                children: "fontColor\\uFF1A"\n              }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {\n                children: "#E96E14"\n              })]\n            })]\n          })]\n        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {\n          className: "turntable-options-item",\n          children: [/*#__PURE__*/(0,jsx_runtime.jsx)("div", {\n            className: "turntable-options-item-title",\n            children: "options"\n          }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {\n            className: "turntable-options-item-component",\n            children: "string[]"\n          })]\n        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {\n          className: "turntable-options-item",\n          children: [/*#__PURE__*/(0,jsx_runtime.jsx)("div", {\n            className: "turntable-options-item-title",\n            children: "background"\n          }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {\n            className: "turntable-options-item-component",\n            children: "string"\n          })]\n        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {\n          className: "turntable-options-item",\n          children: [/*#__PURE__*/(0,jsx_runtime.jsx)("div", {\n            className: "turntable-options-item-title",\n            children: "afterTurn"\n          }), /*#__PURE__*/(0,jsx_runtime.jsx)("div", {\n            className: "turntable-options-item-component",\n            children: "(resIndex: number) => void"\n          })]\n        })]\n      })]\n    })]\n  });\n};\n/* harmony default export */ var turntable = (Turntable);\n;// CONCATENATED MODULE: ./website/root.tsx\n\n\n\n\n(0,client/* createRoot */.s)(document.getElementById(\'root\')).render( /*#__PURE__*/(0,jsx_runtime.jsx)(react.StrictMode, {\n  children: /*#__PURE__*/(0,jsx_runtime.jsx)(turntable, {})\n}));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUFBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFFQTs7QUMxSUE7QUFDQTtBQUNBO0FBQUE7QUFHQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90dXJudGFibGUtY29tcG9uZW50LXBhZ2VzLy4vd2Vic2l0ZS9pbmRleC5jc3M/MDA2YSIsIndlYnBhY2s6Ly90dXJudGFibGUtY29tcG9uZW50LXBhZ2VzLy4vd2Vic2l0ZS90dXJudGFibGUudHN4P2Y2MmYiLCJ3ZWJwYWNrOi8vdHVybnRhYmxlLWNvbXBvbmVudC1wYWdlcy8uL3dlYnNpdGUvcm9vdC50c3g/M2E4MiJdLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1syXS51c2VbMl0hLi9pbmRleC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMl0udXNlWzJdIS4vaW5kZXguY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFdoZWVsIGZyb20gJ0B0dXJudGFibGUtY29tcG9uZW50L3JlYWN0JztcbmltcG9ydCAnLi9pbmRleC5jc3MnXG5cbmNvbnN0IG1vY2sgPXtcbiAgICBmb250czogIFt7XG4gICAgdGl0bGU6ICfplYfmsLTnpZ7lhb0nLFxuICAgIGZvbnRDb2xvcjogJyMwMDAwMDAnLFxuICAgIGJhY2tncm91bmRDb2xvcjogJyNlZWUnLFxuICAgIGZvbnRTaXplOiAxOCxcbn0sXG57XG4gICAgdGl0bGU6ICfplYfmsLTnpZ7lhb0nLFxuICAgIGZvbnRDb2xvcjogJyMwMDAwMDAnLFxuICAgIGJhY2tncm91bmRDb2xvcjogJyNlZWUnLFxuICAgIGZvbnRTaXplOiAxOCxcbn0sXG57XG4gICAgdGl0bGU6ICfplYfmsLTnpZ7lhb0nLFxuICAgIGZvbnRDb2xvcjogJyMwMDAwMDAnLFxuICAgIGJhY2tncm91bmRDb2xvcjogJyNlZWUnLFxuICAgIGZvbnRTaXplOiAxOCxcbn0sXG57XG4gICAgdGl0bGU6ICfplYfmsLTnpZ7lhb0nLFxuICAgIGZvbnRDb2xvcjogJyMwMDAwMDAnLFxuICAgIGJhY2tncm91bmRDb2xvcjogJyNlZWUnLFxuICAgIGZvbnRTaXplOiAxOCxcbn0sXG57XG4gICAgdGl0bGU6ICfplYfmsLTnpZ7lhb0nLFxuICAgIGZvbnRDb2xvcjogJyMwMDAwMDAnLFxuICAgIGJhY2tncm91bmRDb2xvcjogJyNlZWUnLFxuICAgIGZvbnRTaXplOiAxOCxcbn0sXG57XG4gICAgdGl0bGU6ICfplYfmsLTnpZ7lhb0nLFxuICAgIGZvbnRDb2xvcjogJyMwMDAwMDAnLFxuICAgIGJhY2tncm91bmRDb2xvcjogJyNlZWUnLFxuICAgIGZvbnRTaXplOiAxOCxcbn0sXG57XG4gICAgdGl0bGU6ICfplYfmsLTnpZ7lhb0nLFxuICAgIGZvbnRDb2xvcjogJyMwMDAwMDAnLFxuICAgIGJhY2tncm91bmRDb2xvcjogJyNlZWUnLFxuICAgIGZvbnRTaXplOiAxOCxcbiAgICB9XSxcbiAgICBpbWdzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2h0dHBzOi8vNHR1bmUtd2Vtb3JlLm9zcy1jbi1iZWlqaW5nLmFsaXl1bmNzLmNvbS90dXJudGFibGUvYXNzZXRzL2ltYWdlcy90dXJudGFibGUtYmFja2dyb3VuZC5wbmcnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2h0dHBzOi8vNHR1bmUtd2Vtb3JlLm9zcy1jbi1iZWlqaW5nLmFsaXl1bmNzLmNvbS90dXJudGFibGUvYXNzZXRzL2ltYWdlcy90dXJudGFibGUtYmFja2dyb3VuZC5wbmcnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ2h0dHBzOi8vNHR1bmUtd2Vtb3JlLm9zcy1jbi1iZWlqaW5nLmFsaXl1bmNzLmNvbS90dXJudGFibGUvYXNzZXRzL2ltYWdlcy90dXJudGFibGUtYmFja2dyb3VuZC5wbmcnXG4gICAgICAgIH0sXG4gICAgXVxufVxuXG5jb25zdCBtb2NrU3RyaW5nID0gWyfnnJ/lv4Por50nLCAn55yf55qE6K+dJywgJ+Wkp+WGkumZqScsICflsI/lhpLpmaknLCAn5YaS6Zmp5a62JywgJ+S4i+awtOmBkyddXG5jb25zdCBUdXJudGFibGUgPSAoKSA9PiB7IFxuICAgIGNvbnN0IFtsb2NrVHVybiwgc2V0TG9ja1R1cm5dID0gdXNlU3RhdGUoZmFsc2UpXG4gICAgY29uc3QgW3dpZHRoLCBzZXRXaWR0aF0gPSB1c2VTdGF0ZSg2MDApXG4gICAgY29uc3QgW2J1dHRvbnMsIHNldEJ1dHRvbnNdID0gdXNlU3RhdGU8YW55Pih7XG4gICAgICAgIHRpdGxlOiAn5byA6L2sJ1xuICAgIH0pXG4gICAgY29uc3QgYWZ0ZXJUdXJuID0gKGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgY29uc29sZS53YXJuKCdpbmRleCcsIGluZGV4KVxuICAgIH1cblxuICAgIGNvbnN0IG9uQ2hhbmdlV2lkdGggPSAoZSkgPT4ge1xuICAgICAgICBzZXRXaWR0aChOdW1iZXIoZT8udGFyZ2V0Py52YWx1ZSkpXG4gICAgfVxuXG4gICAgY29uc3Qgb25DaGFuZ2VCdXR0b25zID0gKGUsIGtleSkgPT4ge1xuICAgICAgICBzZXRCdXR0b25zKChwcmUpID0+ICh7XG4gICAgICAgICAgICAuLi5wcmUsXG4gICAgICAgICAgICBba2V5XTogZT8udGFyZ2V0Py52YWx1ZVxuICAgICAgICB9KSlcbiAgICB9XG4gICAgcmV0dXJuKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndHVybnRhYmxlLWNvbXBvbmVudC13cmFwcGVyJz5cbiAgICAgICAgICAgIDx0ZXh0IGNsYXNzTmFtZT0ndHVybnRhYmxlLWNvbXBvbmVudC10aXRsZSc+XG4gICAgICAgICAgICAgICAg6L2s55uY57uE5Lu2XG4gICAgICAgICAgICA8L3RleHQ+XG4gICAgICAgICAgICA8V2hlZWwgd2lkdGg9e3dpZHRofSBidXR0b25zPXtidXR0b25zfSBiYWNrZ3JvdW5kPVwiaHR0cHM6Ly80dHVuZS13ZW1vcmUub3NzLWNuLWJlaWppbmcuYWxpeXVuY3MuY29tL3R1cm50YWJsZS9hc3NldHMvaW1hZ2VzL3R1cm50YWJsZS1iYWNrZ3JvdW5kLnBuZ1wiIG9wdGlvbnM9e21vY2tTdHJpbmd9XG4gICAgICAgICAgICBwb2ludGVyPXt7c3JjOiAnaHR0cHM6Ly9zdGF0aWMud2Vtb3JlLmNvbS90dXJudGFibGUvYXNzZXRzL2ltYWdlcy9zaW5nbGUtcG9pbnRlci5wbmcnfX1cbiAgICAgICAgICAgIGxvY2tUdXJuPXtsb2NrVHVybn1cbiAgICAgICAgICAgIHNldExvY2tUdXJuPXtzZXRMb2NrVHVybn1cbiAgICAgICAgICAgIGFmdGVyVHVybj17YWZ0ZXJUdXJufVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd0dXJudGFibGUtb3B0aW9ucy13cmFwcGVyJz5cbiAgICAgICAgICAgICAgICA8dGV4dCBjbGFzc05hbWU9J3R1cm50YWJsZS1vcHRpb25zLXRpdGxlJz7ovaznm5jphY3nva48L3RleHQ+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3R1cm50YWJsZS1vcHRpb25zLWNvbnRlbnQnPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndHVybnRhYmxlLW9wdGlvbnMtaXRlbSc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndHVybnRhYmxlLW9wdGlvbnMtaXRlbS10aXRsZSc+d2lkdGg8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9J3R1cm50YWJsZS1vcHRpb25zLWl0ZW0tY29tcG9uZW50JyB0eXBlPVwibnVtYmVyXCIgb25DaGFuZ2U9e29uQ2hhbmdlV2lkdGh9IHZhbHVlPXt3aWR0aH0gbWluPXszMDB9IG1heD17ODAwfSAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3R1cm50YWJsZS1vcHRpb25zLWl0ZW0nPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3R1cm50YWJsZS1vcHRpb25zLWl0ZW0tdGl0bGUnPmJ1dHRvbnM8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3R1cm50YWJsZS1vcHRpb25zLWl0ZW0taXRlbSc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0PnRpdGxl77yaPC90ZXh0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPSd0dXJudGFibGUtb3B0aW9ucy1pdGVtLWNvbXBvbmVudCcgb25DaGFuZ2U9eyhlKSA9PiBvbkNoYW5nZUJ1dHRvbnMoZSwgJ3RpdGxlJyl9IHZhbHVlPXtidXR0b25zPy50aXRsZX0gbWF4PXs0fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd0dXJudGFibGUtb3B0aW9ucy1pdGVtLWl0ZW0nPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGV4dD5mb250U2l6Ze+8mjwvdGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT0ndHVybnRhYmxlLW9wdGlvbnMtaXRlbS1jb21wb25lbnQnIG9uQ2hhbmdlPXsoZSkgPT4gb25DaGFuZ2VCdXR0b25zKGUsICdmb250U2l6ZScpfSB2YWx1ZT17YnV0dG9ucz8uZm9udFNpemV9IG1heD17NH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndHVybnRhYmxlLW9wdGlvbnMtaXRlbS1pdGVtJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRleHQ+YmFja2dyb3VuZENvbG9y77yaPC90ZXh0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PmxpbmVhci1ncmFkaWVudCgxODBkZWcsIHJnYmEoMjUyLCAyNTUsIDEwNSwgMCkgMzYuNzIlLCAjRkZGRkZGIDEwMCUpPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3R1cm50YWJsZS1vcHRpb25zLWl0ZW0taXRlbSc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0PmZvbnRDb2xvcu+8mjwvdGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj4jRTk2RTE0PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd0dXJudGFibGUtb3B0aW9ucy1pdGVtJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd0dXJudGFibGUtb3B0aW9ucy1pdGVtLXRpdGxlJz5vcHRpb25zPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndHVybnRhYmxlLW9wdGlvbnMtaXRlbS1jb21wb25lbnQnPnN0cmluZ1tdPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndHVybnRhYmxlLW9wdGlvbnMtaXRlbSc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndHVybnRhYmxlLW9wdGlvbnMtaXRlbS10aXRsZSc+YmFja2dyb3VuZDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3R1cm50YWJsZS1vcHRpb25zLWl0ZW0tY29tcG9uZW50Jz5zdHJpbmc8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd0dXJudGFibGUtb3B0aW9ucy1pdGVtJz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd0dXJudGFibGUtb3B0aW9ucy1pdGVtLXRpdGxlJz5hZnRlclR1cm48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSd0dXJudGFibGUtb3B0aW9ucy1pdGVtLWNvbXBvbmVudCc+e2AocmVzSW5kZXg6IG51bWJlcikgPT4gdm9pZGB9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBUdXJudGFibGUiLCJpbXBvcnQgUmVhY3QsIHsgU3RyaWN0TW9kZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNyZWF0ZVJvb3QgfSBmcm9tICdyZWFjdC1kb20vY2xpZW50JztcbmltcG9ydCBUdXJudGFibGUgZnJvbSAnLi90dXJudGFibGUnO1xuXG5cbmNyZWF0ZVJvb3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSkucmVuZGVyKFxuICA8U3RyaWN0TW9kZT5cbiAgICA8VHVybnRhYmxlIC8+XG4gIDwvU3RyaWN0TW9kZT5cbik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///27\n')},184:function(module,__webpack_exports__,__webpack_require__){eval('/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(645);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, ".turntable-component-wrapper{\\n    display: flex;\\n    flex-direction: column;\\n    align-items: center;\\n    justify-content: center;\\n    padding: 24px 64px;\\n}\\n\\n.turntable-component-title{\\n    font-size: 30px;\\n    font-weight: 900;\\n    margin-bottom: 24px;\\n}\\n\\n.turntable-options-wrapper{\\n    display: flex;\\n    flex-direction: column;\\n}\\n\\n.turntable-options-title{\\n    font-size: 24px;\\n    font-weight: 900;\\n    margin-bottom: 12px;\\n}\\n\\n.turntable-options-item{\\n    display: flex;\\n    /* padding: 24px; */\\n    border: 1px solid #eee;\\n    align-items: center;\\n}\\n\\n.turntable-options-content{\\n    width: 1000px;\\n}\\n\\n.turntable-options-item-title{\\n    width: 200px;\\n    font-size: 18px;\\n    border-right: 1px solid #eee;\\n    padding: 24px 0px 24px 24px;\\n}\\n\\n.turntable-options-item-component{\\n    flex: 1;\\n    margin-left: 12px;\\n}\\n\\n\\n.turntable-options-item-item{\\n    display: flex;\\n    align-items: center;\\n    margin: 12px;\\n}", "",{"version":3,"sources":["webpack://./website/index.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,uBAAuB;IACvB,kBAAkB;AACtB;;AAEA;IACI,eAAe;IACf,gBAAgB;IAChB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,sBAAsB;AAC1B;;AAEA;IACI,eAAe;IACf,gBAAgB;IAChB,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,sBAAsB;IACtB,mBAAmB;AACvB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,YAAY;IACZ,eAAe;IACf,4BAA4B;IAC5B,2BAA2B;AAC/B;;AAEA;IACI,OAAO;IACP,iBAAiB;AACrB;;;AAGA;IACI,aAAa;IACb,mBAAmB;IACnB,YAAY;AAChB","sourcesContent":[".turntable-component-wrapper{\\n    display: flex;\\n    flex-direction: column;\\n    align-items: center;\\n    justify-content: center;\\n    padding: 24px 64px;\\n}\\n\\n.turntable-component-title{\\n    font-size: 30px;\\n    font-weight: 900;\\n    margin-bottom: 24px;\\n}\\n\\n.turntable-options-wrapper{\\n    display: flex;\\n    flex-direction: column;\\n}\\n\\n.turntable-options-title{\\n    font-size: 24px;\\n    font-weight: 900;\\n    margin-bottom: 12px;\\n}\\n\\n.turntable-options-item{\\n    display: flex;\\n    /* padding: 24px; */\\n    border: 1px solid #eee;\\n    align-items: center;\\n}\\n\\n.turntable-options-content{\\n    width: 1000px;\\n}\\n\\n.turntable-options-item-title{\\n    width: 200px;\\n    font-size: 18px;\\n    border-right: 1px solid #eee;\\n    padding: 24px 0px 24px 24px;\\n}\\n\\n.turntable-options-item-component{\\n    flex: 1;\\n    margin-left: 12px;\\n}\\n\\n\\n.turntable-options-item-item{\\n    display: flex;\\n    align-items: center;\\n    margin: 12px;\\n}"],"sourceRoot":""}]);\n// Exports\n/* harmony default export */ __webpack_exports__.Z = (___CSS_LOADER_EXPORT___);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTg0LmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHVybnRhYmxlLWNvbXBvbmVudC1wYWdlcy8uL3dlYnNpdGUvaW5kZXguY3NzP2JjN2UiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIudHVybnRhYmxlLWNvbXBvbmVudC13cmFwcGVye1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgcGFkZGluZzogMjRweCA2NHB4O1xcbn1cXG5cXG4udHVybnRhYmxlLWNvbXBvbmVudC10aXRsZXtcXG4gICAgZm9udC1zaXplOiAzMHB4O1xcbiAgICBmb250LXdlaWdodDogOTAwO1xcbiAgICBtYXJnaW4tYm90dG9tOiAyNHB4O1xcbn1cXG5cXG4udHVybnRhYmxlLW9wdGlvbnMtd3JhcHBlcntcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuLnR1cm50YWJsZS1vcHRpb25zLXRpdGxle1xcbiAgICBmb250LXNpemU6IDI0cHg7XFxuICAgIGZvbnQtd2VpZ2h0OiA5MDA7XFxuICAgIG1hcmdpbi1ib3R0b206IDEycHg7XFxufVxcblxcbi50dXJudGFibGUtb3B0aW9ucy1pdGVte1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAvKiBwYWRkaW5nOiAyNHB4OyAqL1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZWVlO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4udHVybnRhYmxlLW9wdGlvbnMtY29udGVudHtcXG4gICAgd2lkdGg6IDEwMDBweDtcXG59XFxuXFxuLnR1cm50YWJsZS1vcHRpb25zLWl0ZW0tdGl0bGV7XFxuICAgIHdpZHRoOiAyMDBweDtcXG4gICAgZm9udC1zaXplOiAxOHB4O1xcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZWVlO1xcbiAgICBwYWRkaW5nOiAyNHB4IDBweCAyNHB4IDI0cHg7XFxufVxcblxcbi50dXJudGFibGUtb3B0aW9ucy1pdGVtLWNvbXBvbmVudHtcXG4gICAgZmxleDogMTtcXG4gICAgbWFyZ2luLWxlZnQ6IDEycHg7XFxufVxcblxcblxcbi50dXJudGFibGUtb3B0aW9ucy1pdGVtLWl0ZW17XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIG1hcmdpbjogMTJweDtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vd2Vic2l0ZS9pbmRleC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQix1QkFBdUI7SUFDdkIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLHNCQUFzQjtJQUN0QixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLGVBQWU7SUFDZiw0QkFBNEI7SUFDNUIsMkJBQTJCO0FBQy9COztBQUVBO0lBQ0ksT0FBTztJQUNQLGlCQUFpQjtBQUNyQjs7O0FBR0E7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLFlBQVk7QUFDaEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnR1cm50YWJsZS1jb21wb25lbnQtd3JhcHBlcntcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IDI0cHggNjRweDtcXG59XFxuXFxuLnR1cm50YWJsZS1jb21wb25lbnQtdGl0bGV7XFxuICAgIGZvbnQtc2l6ZTogMzBweDtcXG4gICAgZm9udC13ZWlnaHQ6IDkwMDtcXG4gICAgbWFyZ2luLWJvdHRvbTogMjRweDtcXG59XFxuXFxuLnR1cm50YWJsZS1vcHRpb25zLXdyYXBwZXJ7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbi50dXJudGFibGUtb3B0aW9ucy10aXRsZXtcXG4gICAgZm9udC1zaXplOiAyNHB4O1xcbiAgICBmb250LXdlaWdodDogOTAwO1xcbiAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xcbn1cXG5cXG4udHVybnRhYmxlLW9wdGlvbnMtaXRlbXtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgLyogcGFkZGluZzogMjRweDsgKi9cXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2VlZTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnR1cm50YWJsZS1vcHRpb25zLWNvbnRlbnR7XFxuICAgIHdpZHRoOiAxMDAwcHg7XFxufVxcblxcbi50dXJudGFibGUtb3B0aW9ucy1pdGVtLXRpdGxle1xcbiAgICB3aWR0aDogMjAwcHg7XFxuICAgIGZvbnQtc2l6ZTogMThweDtcXG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2VlZTtcXG4gICAgcGFkZGluZzogMjRweCAwcHggMjRweCAyNHB4O1xcbn1cXG5cXG4udHVybnRhYmxlLW9wdGlvbnMtaXRlbS1jb21wb25lbnR7XFxuICAgIGZsZXg6IDE7XFxuICAgIG1hcmdpbi1sZWZ0OiAxMnB4O1xcbn1cXG5cXG5cXG4udHVybnRhYmxlLW9wdGlvbnMtaXRlbS1pdGVte1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBtYXJnaW46IDEycHg7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///184\n')}},__webpack_module_cache__={},deferred;function __webpack_require__(n){var t=__webpack_module_cache__[n];if(void 0!==t)return t.exports;var e=__webpack_module_cache__[n]={id:n,exports:{}};return __webpack_modules__[n](e,e.exports,__webpack_require__),e.exports}__webpack_require__.m=__webpack_modules__,deferred=[],__webpack_require__.O=function(n,t,e,g){if(!t){var I=1/0;for(b=0;b<deferred.length;b++){t=deferred[b][0],e=deferred[b][1],g=deferred[b][2];for(var A=!0,i=0;i<t.length;i++)(!1&g||I>=g)&&Object.keys(__webpack_require__.O).every((function(n){return __webpack_require__.O[n](t[i])}))?t.splice(i--,1):(A=!1,g<I&&(I=g));if(A){deferred.splice(b--,1);var l=e();void 0!==l&&(n=l)}}return n}g=g||0;for(var b=deferred.length;b>0&&deferred[b-1][2]>g;b--)deferred[b]=deferred[b-1];deferred[b]=[t,e,g]},__webpack_require__.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return __webpack_require__.d(t,{a:t}),t},__webpack_require__.d=function(n,t){for(var e in t)__webpack_require__.o(t,e)&&!__webpack_require__.o(n,e)&&Object.defineProperty(n,e,{enumerable:!0,get:t[e]})},__webpack_require__.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},function(){var n={179:0};__webpack_require__.O.j=function(t){return 0===n[t]};var t=function(t,e){var g,I,A=e[0],i=e[1],l=e[2],b=0;if(A.some((function(t){return 0!==n[t]}))){for(g in i)__webpack_require__.o(i,g)&&(__webpack_require__.m[g]=i[g]);if(l)var c=l(__webpack_require__)}for(t&&t(e);b<A.length;b++)I=A[b],__webpack_require__.o(n,I)&&n[I]&&n[I][0](),n[I]=0;return __webpack_require__.O(c)},e=self.webpackChunkturntable_component_pages=self.webpackChunkturntable_component_pages||[];e.forEach(t.bind(null,0)),e.push=t.bind(null,e.push.bind(e))}(),__webpack_require__.nc=void 0;var __webpack_exports__=__webpack_require__.O(void 0,[851],(function(){return __webpack_require__(27)}));__webpack_exports__=__webpack_require__.O(__webpack_exports__)})();