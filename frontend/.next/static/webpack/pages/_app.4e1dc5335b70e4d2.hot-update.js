"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./src/contexts/AuthContext.tsx":
/*!**************************************!*\
  !*** ./src/contexts/AuthContext.tsx ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AuthContext\": function() { return /* binding */ AuthContext; },\n/* harmony export */   \"AuthProvider\": function() { return /* binding */ AuthProvider; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_src_async_to_generator_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swc/helpers/src/_async_to_generator.mjs */ \"./node_modules/@swc/helpers/src/_async_to_generator.mjs\");\n/* harmony import */ var _swc_helpers_src_sliced_to_array_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swc/helpers/src/_sliced_to_array.mjs */ \"./node_modules/@swc/helpers/src/_sliced_to_array.mjs\");\n/* harmony import */ var _swc_helpers_src_ts_generator_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swc/helpers/src/_ts_generator.mjs */ \"./node_modules/@swc/helpers/src/_ts_generator.mjs\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nookies */ \"./node_modules/nookies/dist/index.js\");\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nvar _s = $RefreshSig$();\n\n\n\nvar AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});\nfunction AuthProvider(param) {\n    var children = param.children;\n    _s();\n    var ref = (0,_swc_helpers_src_sliced_to_array_mjs__WEBPACK_IMPORTED_MODULE_4__[\"default\"])((0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null), 2), user = ref[0], setUser = ref[1];\n    var isAuthenticated = !!user;\n    // Use effect para toda vez que uma pagina for recarregada, ele verifica se existe o token,\n    // Caso exista, faz uma call para api para pegar os dados do user:\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function() {\n        // Usando parseCookies para pegar todos os cookies:\n        var ref = (0,nookies__WEBPACK_IMPORTED_MODULE_2__.parseCookies)(), token = ref[\"auth.token\"];\n        // Caso exista, call API para pegar os dados:\n        if (token) {\n        // TODO: Recover information from API call:\n        // recoverUserInformation().then((response) => {\n        // \tsetUser(response.user);\n        // });\n        }\n    }, []);\n    function signIn(_) {\n        return _signIn.apply(this, arguments);\n    }\n    function _signIn() {\n        _signIn = (0,_swc_helpers_src_async_to_generator_mjs__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(function(param) {\n            var email, password;\n            return (0,_swc_helpers_src_ts_generator_mjs__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(this, function(_state) {\n                email = param.email, password = param.password;\n                // TODO: Add the login logic here:\n                // const { token, user } = await signInRequest({\n                // \temail,\n                // \tpassword,\n                // });\n                // TODO: Set the cookie with the token:\n                console.log(\"SignIn \\uD83D\\uDCA5\");\n                // setCookie(undefined, \"auth.token\", \"token\", {\n                // \t// FIXME: Add the actual token:\n                // \tmaxAge: 60 * 60 * 1, // 1 hour\n                // });\n                // // Colocando o token no header: FIXME:\n                // api.defaults.headers[\"Authorization\"] = `Bearer ${\"token\"}`;\n                // setUser(user);\n                // TODO: Redirect to the ALL APPOINTMENTS page:\n                next_router__WEBPACK_IMPORTED_MODULE_3___default().push(\"/schedule\");\n                return [\n                    2\n                ];\n            });\n        });\n        return _signIn.apply(this, arguments);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            user: user,\n            isAuthenticated: isAuthenticated,\n            signIn: signIn\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\nicolas\\\\OneDrive\\\\A3-Sistemas_Distribuidos\\\\spring-boot-microservices\\\\frontend\\\\src\\\\contexts\\\\AuthContext.tsx\",\n        lineNumber: 68,\n        columnNumber: 9\n    }, this);\n}\n_s(AuthProvider, \"5s2qRsV95gTJBmaaTh11GoxYeGE=\");\n_c = AuthProvider;\nvar _c;\n$RefreshReg$(_c, \"AuthProvider\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udGV4dHMvQXV0aENvbnRleHQudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7QUFBc0U7QUFDcEI7QUFDakI7QUFpQjFCLElBQU1LLDRCQUFjTCxvREFBYUEsQ0FBQyxDQUFDLEdBQXNCO0FBRXpELFNBQVNNLGFBQWEsS0FBK0IsRUFBRTtRQUFqQyxpQkFBRUM7O0lBQzlCLElBQXdCTCxNQUFBQSxnRkFBQUEsQ0FBQUEsK0NBQVFBLENBQWMsSUFBSSxPQUEzQ00sT0FBaUJOLFFBQVhPLFVBQVdQO0lBRXhCLElBQU1RLGtCQUFrQixDQUFDLENBQUNGO0lBRTFCLDJGQUEyRjtJQUMzRixrRUFBa0U7SUFDbEVQLGdEQUFTQSxDQUFDLFdBQU07UUFDZixtREFBbUQ7UUFDbkQsSUFBZ0NFLE1BQUFBLHFEQUFZQSxJQUFwQyxRQUF3QkEsSUFBeEI7UUFFUiw2Q0FBNkM7UUFDN0MsSUFBSVEsT0FBTztRQUNWLDJDQUEyQztRQUMzQyxnREFBZ0Q7UUFDaEQsMkJBQTJCO1FBQzNCLE1BQU07UUFDUCxDQUFDO0lBQ0YsR0FBRyxFQUFFO2FBRVVDLE9BQU8sQ0FBcUM7ZUFBNUNBOzthQUFBQTtRQUFBQSxVQUFmLDZGQUFzQixLQUFxQyxFQUFFO2dCQUFyQ0MsT0FBT0M7O2dCQUFQRCxRQUFGLE1BQUVBLE9BQU9DLFdBQVQsTUFBU0E7Z0JBQzlCLGtDQUFrQztnQkFFbEMsZ0RBQWdEO2dCQUNoRCxVQUFVO2dCQUNWLGFBQWE7Z0JBQ2IsTUFBTTtnQkFFTix1Q0FBdUM7Z0JBRXZDQyxRQUFRQyxHQUFHLENBQUM7Z0JBRVosZ0RBQWdEO2dCQUNoRCxtQ0FBbUM7Z0JBQ25DLGtDQUFrQztnQkFDbEMsTUFBTTtnQkFFTix5Q0FBeUM7Z0JBQ3pDLCtEQUErRDtnQkFFL0QsaUJBQWlCO2dCQUVqQiwrQ0FBK0M7Z0JBQy9DWix1REFBVyxDQUFDOzs7OztRQUNiO2VBeEJlUTs7SUEwQmYscUJBQU8sOERBQUNQLFlBQVlhLFFBQVE7UUFBQ0MsT0FBTztZQUFFWCxNQUFBQTtZQUFNRSxpQkFBQUE7WUFBaUJFLFFBQUFBO1FBQU87a0JBQUlMOzs7Ozs7QUFDekUsQ0FBQztHQS9DZUQ7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbnRleHRzL0F1dGhDb250ZXh0LnRzeD8xZmEyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIFJlYWN0Tm9kZSwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBzZXRDb29raWUsIHBhcnNlQ29va2llcyB9IGZyb20gXCJub29raWVzXCI7XHJcbmltcG9ydCBSb3V0ZXIgZnJvbSBcIm5leHQvcm91dGVyXCI7XHJcbmltcG9ydCB7IGFwaSB9IGZyb20gXCIuLi9zZXJ2aWNlL2FwaVwiO1xyXG5pbXBvcnQgeyBMb2dpbkNyZWRlbnRpYWxzLCBVc2VyTG9naW5SZXNwb25zZSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2xvZ2luL2xvZ2luSW50ZXJmYWNlc1wiO1xyXG5cclxuLy8gaW1wb3J0IHsgcmVjb3ZlclVzZXJJbmZvcm1hdGlvbiwgc2lnbkluUmVxdWVzdCB9IGZyb20gXCIuLi9zZXJ2aWNlcy9hdXRoXCI7XHJcbi8vIGltcG9ydCB7IGFwaSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9hcGlcIjtcclxuXHJcbmludGVyZmFjZSBBdXRoQ29udGV4dFR5cGUge1xyXG5cdGlzQXV0aGVudGljYXRlZDogYm9vbGVhbjtcclxuXHR1c2VyOiBVc2VyTG9naW5SZXNwb25zZSB8IG51bGw7IC8vIEZJWE1FOiBEbyBub3QgYWxsb3cgbnVsbCBoZXJlLiBPbmx5IHVudGlsIHdlIGNhbnQgZ2V0IHRoZSBkYWRhIGZyb20gdGhlIEFQSVxyXG5cdHNpZ25JbjogKGRhdGE6IExvZ2luQ3JlZGVudGlhbHMpID0+IFByb21pc2U8dm9pZD47XHJcbn1cclxuXHJcbmludGVyZmFjZSBBdXRoUHJvdmlkZXJQcm9wcyB7XHJcblx0Y2hpbGRyZW46IFJlYWN0Tm9kZTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dCh7fSBhcyBBdXRoQ29udGV4dFR5cGUpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEF1dGhQcm92aWRlcih7IGNoaWxkcmVuIH06IEF1dGhQcm92aWRlclByb3BzKSB7XHJcblx0Y29uc3QgW3VzZXIsIHNldFVzZXJdID0gdXNlU3RhdGU8VXNlciB8IG51bGw+KG51bGwpO1xyXG5cclxuXHRjb25zdCBpc0F1dGhlbnRpY2F0ZWQgPSAhIXVzZXI7XHJcblxyXG5cdC8vIFVzZSBlZmZlY3QgcGFyYSB0b2RhIHZleiBxdWUgdW1hIHBhZ2luYSBmb3IgcmVjYXJyZWdhZGEsIGVsZSB2ZXJpZmljYSBzZSBleGlzdGUgbyB0b2tlbixcclxuXHQvLyBDYXNvIGV4aXN0YSwgZmF6IHVtYSBjYWxsIHBhcmEgYXBpIHBhcmEgcGVnYXIgb3MgZGFkb3MgZG8gdXNlcjpcclxuXHR1c2VFZmZlY3QoKCkgPT4ge1xyXG5cdFx0Ly8gVXNhbmRvIHBhcnNlQ29va2llcyBwYXJhIHBlZ2FyIHRvZG9zIG9zIGNvb2tpZXM6XHJcblx0XHRjb25zdCB7IFwiYXV0aC50b2tlblwiOiB0b2tlbiB9ID0gcGFyc2VDb29raWVzKCk7XHJcblxyXG5cdFx0Ly8gQ2FzbyBleGlzdGEsIGNhbGwgQVBJIHBhcmEgcGVnYXIgb3MgZGFkb3M6XHJcblx0XHRpZiAodG9rZW4pIHtcclxuXHRcdFx0Ly8gVE9ETzogUmVjb3ZlciBpbmZvcm1hdGlvbiBmcm9tIEFQSSBjYWxsOlxyXG5cdFx0XHQvLyByZWNvdmVyVXNlckluZm9ybWF0aW9uKCkudGhlbigocmVzcG9uc2UpID0+IHtcclxuXHRcdFx0Ly8gXHRzZXRVc2VyKHJlc3BvbnNlLnVzZXIpO1xyXG5cdFx0XHQvLyB9KTtcclxuXHRcdH1cclxuXHR9LCBbXSk7XHJcblxyXG5cdGFzeW5jIGZ1bmN0aW9uIHNpZ25Jbih7IGVtYWlsLCBwYXNzd29yZCB9OiBMb2dpbkNyZWRlbnRpYWxzKSB7XHJcblx0XHQvLyBUT0RPOiBBZGQgdGhlIGxvZ2luIGxvZ2ljIGhlcmU6XHJcblxyXG5cdFx0Ly8gY29uc3QgeyB0b2tlbiwgdXNlciB9ID0gYXdhaXQgc2lnbkluUmVxdWVzdCh7XHJcblx0XHQvLyBcdGVtYWlsLFxyXG5cdFx0Ly8gXHRwYXNzd29yZCxcclxuXHRcdC8vIH0pO1xyXG5cclxuXHRcdC8vIFRPRE86IFNldCB0aGUgY29va2llIHdpdGggdGhlIHRva2VuOlxyXG5cclxuXHRcdGNvbnNvbGUubG9nKFwiU2lnbkluIPCfkqVcIik7XHJcblxyXG5cdFx0Ly8gc2V0Q29va2llKHVuZGVmaW5lZCwgXCJhdXRoLnRva2VuXCIsIFwidG9rZW5cIiwge1xyXG5cdFx0Ly8gXHQvLyBGSVhNRTogQWRkIHRoZSBhY3R1YWwgdG9rZW46XHJcblx0XHQvLyBcdG1heEFnZTogNjAgKiA2MCAqIDEsIC8vIDEgaG91clxyXG5cdFx0Ly8gfSk7XHJcblxyXG5cdFx0Ly8gLy8gQ29sb2NhbmRvIG8gdG9rZW4gbm8gaGVhZGVyOiBGSVhNRTpcclxuXHRcdC8vIGFwaS5kZWZhdWx0cy5oZWFkZXJzW1wiQXV0aG9yaXphdGlvblwiXSA9IGBCZWFyZXIgJHtcInRva2VuXCJ9YDtcclxuXHJcblx0XHQvLyBzZXRVc2VyKHVzZXIpO1xyXG5cclxuXHRcdC8vIFRPRE86IFJlZGlyZWN0IHRvIHRoZSBBTEwgQVBQT0lOVE1FTlRTIHBhZ2U6XHJcblx0XHRSb3V0ZXIucHVzaChcIi9zY2hlZHVsZVwiKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiA8QXV0aENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgdXNlciwgaXNBdXRoZW50aWNhdGVkLCBzaWduSW4gfX0+e2NoaWxkcmVufTwvQXV0aENvbnRleHQuUHJvdmlkZXI+O1xyXG59XHJcbiJdLCJuYW1lcyI6WyJjcmVhdGVDb250ZXh0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJwYXJzZUNvb2tpZXMiLCJSb3V0ZXIiLCJBdXRoQ29udGV4dCIsIkF1dGhQcm92aWRlciIsImNoaWxkcmVuIiwidXNlciIsInNldFVzZXIiLCJpc0F1dGhlbnRpY2F0ZWQiLCJ0b2tlbiIsInNpZ25JbiIsImVtYWlsIiwicGFzc3dvcmQiLCJjb25zb2xlIiwibG9nIiwicHVzaCIsIlByb3ZpZGVyIiwidmFsdWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/contexts/AuthContext.tsx\n"));

/***/ })

});