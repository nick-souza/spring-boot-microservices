/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/contexts/AuthContext.tsx":
/*!**************************************!*\
  !*** ./src/contexts/AuthContext.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AuthContext\": () => (/* binding */ AuthContext),\n/* harmony export */   \"AuthProvider\": () => (/* binding */ AuthProvider)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nookies */ \"nookies\");\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_3__.createContext)({});\nfunction AuthProvider({ children  }) {\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);\n    const isAuthenticated = !!user;\n    // Use effect para toda vez que uma pagina for recarregada, ele verifica se existe o token,\n    // Caso exista, faz uma call para api para pegar os dados do user:\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        // Usando parseCookies para pegar todos os cookies:\n        const { \"auth.token\": token  } = (0,nookies__WEBPACK_IMPORTED_MODULE_2__.parseCookies)();\n        // Caso exista, call API para pegar os dados:\n        if (token) {\n        // TODO: Recover information from API call:\n        // recoverUserInformation().then((response) => {\n        // \tsetUser(response.user);\n        // });\n        }\n    }, []);\n    async function signIn({ email , password  }) {\n        // TODO: Add the login logic here:\n        // const { token, user } = await signInRequest({\n        // \temail,\n        // \tpassword,\n        // });\n        // TODO: Set the cookie with the token:\n        console.log(\"SignIn \\uD83D\\uDCA5\");\n        // setCookie(undefined, \"auth.token\", \"token\", {\n        // \t// FIXME: Add the actual token:\n        // \tmaxAge: 60 * 60 * 1, // 1 hour\n        // });\n        // // Colocando o token no header: FIXME:\n        // api.defaults.headers[\"Authorization\"] = `Bearer ${\"token\"}`;\n        // setUser(user);\n        // TODO: Redirect to the ALL APPOINTMENTS page:\n        next_router__WEBPACK_IMPORTED_MODULE_1___default().push(\"/schedule\");\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            user,\n            isAuthenticated,\n            signIn\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\nicolas\\\\OneDrive\\\\A3-Sistemas_Distribuidos\\\\spring-boot-microservices\\\\frontend\\\\src\\\\contexts\\\\AuthContext.tsx\",\n        lineNumber: 64,\n        columnNumber: 9\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udGV4dHMvQXV0aENvbnRleHQudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFpQztBQUNNO0FBQytCO0FBYS9ELE1BQU1LLDRCQUFjSCxvREFBYUEsQ0FBQyxDQUFDLEdBQXNCO0FBRXpELFNBQVNJLGFBQWEsRUFBRUMsU0FBUSxFQUFxQixFQUFFO0lBQzdELE1BQU0sQ0FBQ0MsTUFBTUMsUUFBUSxHQUFHTCwrQ0FBUUEsQ0FBMkIsSUFBSTtJQUUvRCxNQUFNTSxrQkFBa0IsQ0FBQyxDQUFDRjtJQUUxQiwyRkFBMkY7SUFDM0Ysa0VBQWtFO0lBQ2xFTCxnREFBU0EsQ0FBQyxJQUFNO1FBQ2YsbURBQW1EO1FBQ25ELE1BQU0sRUFBRSxjQUFjUSxNQUFLLEVBQUUsR0FBR1YscURBQVlBO1FBRTVDLDZDQUE2QztRQUM3QyxJQUFJVSxPQUFPO1FBQ1YsMkNBQTJDO1FBQzNDLGdEQUFnRDtRQUNoRCwyQkFBMkI7UUFDM0IsTUFBTTtRQUNQLENBQUM7SUFDRixHQUFHLEVBQUU7SUFFTCxlQUFlQyxPQUFPLEVBQUVDLE1BQUssRUFBRUMsU0FBUSxFQUFvQixFQUFFO1FBQzVELGtDQUFrQztRQUVsQyxnREFBZ0Q7UUFDaEQsVUFBVTtRQUNWLGFBQWE7UUFDYixNQUFNO1FBRU4sdUNBQXVDO1FBRXZDQyxRQUFRQyxHQUFHLENBQUM7UUFFWixnREFBZ0Q7UUFDaEQsbUNBQW1DO1FBQ25DLGtDQUFrQztRQUNsQyxNQUFNO1FBRU4seUNBQXlDO1FBQ3pDLCtEQUErRDtRQUUvRCxpQkFBaUI7UUFFakIsK0NBQStDO1FBQy9DaEIsdURBQVcsQ0FBQztJQUNiO0lBRUEscUJBQU8sOERBQUNLLFlBQVlhLFFBQVE7UUFBQ0MsT0FBTztZQUFFWDtZQUFNRTtZQUFpQkU7UUFBTztrQkFBSUw7Ozs7OztBQUN6RSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9zcmMvY29udGV4dHMvQXV0aENvbnRleHQudHN4PzFmYTIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJvdXRlciBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgcGFyc2VDb29raWVzIH0gZnJvbSBcIm5vb2tpZXNcIjtcclxuaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgUmVhY3ROb2RlLCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IExvZ2luQ3JlZGVudGlhbHMsIFVzZXJMb2dpblJlc3BvbnNlIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvbG9naW4vbG9naW5JbnRlcmZhY2VzXCI7XHJcblxyXG5pbnRlcmZhY2UgQXV0aENvbnRleHRUeXBlIHtcclxuXHRpc0F1dGhlbnRpY2F0ZWQ6IGJvb2xlYW47XHJcblx0dXNlcjogVXNlckxvZ2luUmVzcG9uc2UgfCBudWxsOyAvLyBGSVhNRTogRG8gbm90IGFsbG93IG51bGwgaGVyZS4gT25seSB1bnRpbCB3ZSBjYW50IGdldCB0aGUgZGFkYSBmcm9tIHRoZSBBUElcclxuXHRzaWduSW46IChkYXRhOiBMb2dpbkNyZWRlbnRpYWxzKSA9PiBQcm9taXNlPHZvaWQ+O1xyXG59XHJcblxyXG5pbnRlcmZhY2UgQXV0aFByb3ZpZGVyUHJvcHMge1xyXG5cdGNoaWxkcmVuOiBSZWFjdE5vZGU7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBBdXRoQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoe30gYXMgQXV0aENvbnRleHRUeXBlKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBBdXRoUHJvdmlkZXIoeyBjaGlsZHJlbiB9OiBBdXRoUHJvdmlkZXJQcm9wcykge1xyXG5cdGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9IHVzZVN0YXRlPFVzZXJMb2dpblJlc3BvbnNlIHwgbnVsbD4obnVsbCk7XHJcblxyXG5cdGNvbnN0IGlzQXV0aGVudGljYXRlZCA9ICEhdXNlcjtcclxuXHJcblx0Ly8gVXNlIGVmZmVjdCBwYXJhIHRvZGEgdmV6IHF1ZSB1bWEgcGFnaW5hIGZvciByZWNhcnJlZ2FkYSwgZWxlIHZlcmlmaWNhIHNlIGV4aXN0ZSBvIHRva2VuLFxyXG5cdC8vIENhc28gZXhpc3RhLCBmYXogdW1hIGNhbGwgcGFyYSBhcGkgcGFyYSBwZWdhciBvcyBkYWRvcyBkbyB1c2VyOlxyXG5cdHVzZUVmZmVjdCgoKSA9PiB7XHJcblx0XHQvLyBVc2FuZG8gcGFyc2VDb29raWVzIHBhcmEgcGVnYXIgdG9kb3Mgb3MgY29va2llczpcclxuXHRcdGNvbnN0IHsgXCJhdXRoLnRva2VuXCI6IHRva2VuIH0gPSBwYXJzZUNvb2tpZXMoKTtcclxuXHJcblx0XHQvLyBDYXNvIGV4aXN0YSwgY2FsbCBBUEkgcGFyYSBwZWdhciBvcyBkYWRvczpcclxuXHRcdGlmICh0b2tlbikge1xyXG5cdFx0XHQvLyBUT0RPOiBSZWNvdmVyIGluZm9ybWF0aW9uIGZyb20gQVBJIGNhbGw6XHJcblx0XHRcdC8vIHJlY292ZXJVc2VySW5mb3JtYXRpb24oKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG5cdFx0XHQvLyBcdHNldFVzZXIocmVzcG9uc2UudXNlcik7XHJcblx0XHRcdC8vIH0pO1xyXG5cdFx0fVxyXG5cdH0sIFtdKTtcclxuXHJcblx0YXN5bmMgZnVuY3Rpb24gc2lnbkluKHsgZW1haWwsIHBhc3N3b3JkIH06IExvZ2luQ3JlZGVudGlhbHMpIHtcclxuXHRcdC8vIFRPRE86IEFkZCB0aGUgbG9naW4gbG9naWMgaGVyZTpcclxuXHJcblx0XHQvLyBjb25zdCB7IHRva2VuLCB1c2VyIH0gPSBhd2FpdCBzaWduSW5SZXF1ZXN0KHtcclxuXHRcdC8vIFx0ZW1haWwsXHJcblx0XHQvLyBcdHBhc3N3b3JkLFxyXG5cdFx0Ly8gfSk7XHJcblxyXG5cdFx0Ly8gVE9ETzogU2V0IHRoZSBjb29raWUgd2l0aCB0aGUgdG9rZW46XHJcblxyXG5cdFx0Y29uc29sZS5sb2coXCJTaWduSW4g8J+SpVwiKTtcclxuXHJcblx0XHQvLyBzZXRDb29raWUodW5kZWZpbmVkLCBcImF1dGgudG9rZW5cIiwgXCJ0b2tlblwiLCB7XHJcblx0XHQvLyBcdC8vIEZJWE1FOiBBZGQgdGhlIGFjdHVhbCB0b2tlbjpcclxuXHRcdC8vIFx0bWF4QWdlOiA2MCAqIDYwICogMSwgLy8gMSBob3VyXHJcblx0XHQvLyB9KTtcclxuXHJcblx0XHQvLyAvLyBDb2xvY2FuZG8gbyB0b2tlbiBubyBoZWFkZXI6IEZJWE1FOlxyXG5cdFx0Ly8gYXBpLmRlZmF1bHRzLmhlYWRlcnNbXCJBdXRob3JpemF0aW9uXCJdID0gYEJlYXJlciAke1widG9rZW5cIn1gO1xyXG5cclxuXHRcdC8vIHNldFVzZXIodXNlcik7XHJcblxyXG5cdFx0Ly8gVE9ETzogUmVkaXJlY3QgdG8gdGhlIEFMTCBBUFBPSU5UTUVOVFMgcGFnZTpcclxuXHRcdFJvdXRlci5wdXNoKFwiL3NjaGVkdWxlXCIpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIDxBdXRoQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17eyB1c2VyLCBpc0F1dGhlbnRpY2F0ZWQsIHNpZ25JbiB9fT57Y2hpbGRyZW59PC9BdXRoQ29udGV4dC5Qcm92aWRlcj47XHJcbn1cclxuIl0sIm5hbWVzIjpbIlJvdXRlciIsInBhcnNlQ29va2llcyIsImNyZWF0ZUNvbnRleHQiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkF1dGhDb250ZXh0IiwiQXV0aFByb3ZpZGVyIiwiY2hpbGRyZW4iLCJ1c2VyIiwic2V0VXNlciIsImlzQXV0aGVudGljYXRlZCIsInRva2VuIiwic2lnbkluIiwiZW1haWwiLCJwYXNzd29yZCIsImNvbnNvbGUiLCJsb2ciLCJwdXNoIiwiUHJvdmlkZXIiLCJ2YWx1ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/contexts/AuthContext.tsx\n");

/***/ }),

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../contexts/AuthContext */ \"./src/contexts/AuthContext.tsx\");\n/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_app.css */ \"./src/pages/_app.css\");\n/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_app_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nfunction MyApp({ Component , pageProps  }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_1__.AuthProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\nicolas\\\\OneDrive\\\\A3-Sistemas_Distribuidos\\\\spring-boot-microservices\\\\frontend\\\\src\\\\pages\\\\_app.tsx\",\n            lineNumber: 7,\n            columnNumber: 4\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\nicolas\\\\OneDrive\\\\A3-Sistemas_Distribuidos\\\\spring-boot-microservices\\\\frontend\\\\src\\\\pages\\\\_app.tsx\",\n        lineNumber: 6,\n        columnNumber: 3\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFBdUQ7QUFDbkM7QUFFcEIsU0FBU0MsTUFBTSxFQUFFQyxVQUFTLEVBQUVDLFVBQVMsRUFBTyxFQUFFO0lBQzdDLHFCQUNDLDhEQUFDSCwrREFBWUE7a0JBQ1osNEVBQUNFO1lBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7QUFHM0I7QUFFQSxpRUFBZUYsS0FBS0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250ZW5kLy4vc3JjL3BhZ2VzL19hcHAudHN4P2Y5ZDYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXV0aFByb3ZpZGVyIH0gZnJvbSBcIi4uL2NvbnRleHRzL0F1dGhDb250ZXh0XCI7XHJcbmltcG9ydCBcIi4vX2FwcC5jc3NcIjtcclxuXHJcbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogYW55KSB7XHJcblx0cmV0dXJuIChcclxuXHRcdDxBdXRoUHJvdmlkZXI+XHJcblx0XHRcdDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuXHRcdDwvQXV0aFByb3ZpZGVyPlxyXG5cdCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE15QXBwO1xyXG4iXSwibmFtZXMiOlsiQXV0aFByb3ZpZGVyIiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./src/pages/_app.css":
/*!****************************!*\
  !*** ./src/pages/_app.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ "nookies":
/*!**************************!*\
  !*** external "nookies" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("nookies");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.tsx"));
module.exports = __webpack_exports__;

})();