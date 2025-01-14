(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["PTRESTfulAPIClient"] = factory();
	else
		root["PTRESTfulAPIClient"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 314:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(699), exports);
/**
 * PTRESTfulAPIClientクラス
 *
 * @class PTRESTfulAPIClient
 * @exports module:PTRESTfulAPIClient
 */
class PTRESTfulAPIClient {
    /**
     * コンストラクタ
     * @param {string} apiPath APIのパス（例：/powercmsx/api）
     * @param {string} apiVersion APIバージョン（2020年9月15日現在は 1 ）
     */
    constructor(apiPath, apiVersion) {
        if (!apiPath) {
            throw 'Parameter `apiPath` is required.';
        }
        else if (isNaN(apiVersion) || apiVersion === 0) {
            throw 'Parameter `apiVersion` is required.';
        }
        this.basePath = `${apiPath}/v${apiVersion}`;
    }
    // GETメソッド以外で送信
    async postData(url, data = {}, token = null, method = 'post') {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['X-PCMSX-Authorization'] = token;
        }
        const response = await fetch(url, {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: headers,
            body: JSON.stringify(data)
        });
        return response;
    }
    // GETメソッドで取得
    async getData(url, params = {}, token = null) {
        let setting = {};
        if (token) {
            setting = {
                headers: {
                    'X-PCMSX-Authorization': token,
                }
            };
        }
        let queryString = '';
        if (Object.keys(params).length) {
            const paramsString = new URLSearchParams(params).toString();
            if (paramsString) {
                queryString = '?' + paramsString;
            }
        }
        const response = await fetch(`${url}${queryString}`, setting);
        return response;
    }
    /**
     * Fetch APIの呼び出し
     *
     * 任意のエンドポイントに対してリソース取得が可能なメソッドです。
     * 引数に応じて適切なリクエストを発行します。
     *
     * @param {string} endpoint エンドポイントのパス
     * @param {string} method リクエストメソッド
     * @param {number} workspaceId ワークスペースID
     * @param {RequestParams} params パラメーター
     * @param {RequestBody} data リクエストボディ
     * @param {string} token アクセストークン
     * @returns {Promise<Response>} レスポンス
     */
    async runFetch(endpoint, method, workspaceId = 0, params = {}, data = {}, token = null) {
        let url;
        let response;
        if (workspaceId === -1) {
            url = endpoint;
        }
        else if (workspaceId === null) {
            url = `${this.basePath}${endpoint}`;
        }
        else {
            url = `${this.basePath}/${workspaceId}${endpoint}`;
        }
        if (method === 'get') {
            response = await this.getData(url, params, token);
        }
        else {
            response = await this.postData(url, data, token, method);
        }
        return response;
    }
    /**
     * ユーザー認証の実行
     * @param {string} name ユーザー名
     * @param {string} password パスワード
     * @param {boolean} remember アクセストークンの有効期限延長
     * @returns {Promise<Response>} レスポンス
     */
    async authentication(name, password, remember = false) {
        if (!name) {
            throw 'Parameter `name` is required.';
        }
        else if (!password) {
            throw 'Parameter `password` is required.';
        }
        const data = {
            name: name,
            password: password,
            remember: remember ? 1 : 0,
        };
        const response = await this.runFetch('/authentication', 'post', null, {}, data);
        return response;
    }
    /**
     * オブジェクト一覧の取得
     * @param {string} model モデル
     * @param {number} workspaceId ワークスペースID
     * @param {RequestParams} params パラメーター
     * @param {string} token アクセストークン
     * @returns {Promise<Response>} レスポンス
     */
    async listObjects(model, workspaceId = 0, params = {}, token = null) {
        if (!model) {
            throw 'Parameter `model` is required.';
        }
        const response = await this.runFetch(`/${model}/list`, 'get', workspaceId, params, {}, token);
        return response;
    }
    // オブジェクトのCRUDの実現
    async doCRUDObject(action, model, id, workspaceId = 0, token = null, params = {}, data = {}, method = null) {
        if (!model) {
            throw 'Parameter `model` is required.';
        }
        let endpoint;
        if (action === 'insert' || (action === 'get' && !id)) {
            endpoint = `/${model}/${action}`;
        }
        else if (id) {
            if (typeof id === 'string') {
                id = encodeURI(id);
            }
            endpoint = `/${model}/${action}/${id}`;
        }
        else {
            throw 'Parameter `id` is required.';
        }
        if (!method) {
            if (action === 'get') {
                method = 'get';
            }
            else {
                method = 'post';
            }
        }
        const response = await this.runFetch(endpoint, method, workspaceId, params, data, token);
        return response;
    }
    /**
     * オブジェクトの作成
     * @param {string} model モデル
     * @param {number} workspaceId ワークスペースID
     * @param {string} token アクセストークン
     * @param {RequestBody} data リクエストボディ
     * @returns {Promise<Response>} レスポンス
     */
    async createObject(model, workspaceId = 0, token, data = {}) {
        const response = await this.doCRUDObject('insert', model, null, workspaceId, token, {}, data);
        return response;
    }
    /**
     * オブジェクトの取得
     * @param {string} model モデル
     * @param {number | string | null} id オブジェクトID（またはプライマリカラムの値）
     * @param {number} workspaceId ワークスペースID
     * @param {RequestParams} params パラメーター
     * @param {string} token アクセストークン
     * @returns {Promise<Response>} レスポンス
     */
    async getObject(model, id, workspaceId = 0, params = {}, token = null) {
        const response = await this.doCRUDObject('get', model, id, workspaceId, token, params);
        return response;
    }
    /**
     * オブジェクトの更新
     * @param {string} model モデル
     * @param {number} id オブジェクトID
     * @param {number} workspaceId ワークスペースID
     * @param {string} token アクセストークン
     * @param {RequestBody} data リクエストボディ
     * @param {RequestMethods} method リクエストメソッド
     * @returns {Promise<Response>} レスポンス
     */
    async updateObject(model, id, workspaceId = 0, token, data = {}, method = 'put') {
        const response = await this.doCRUDObject('update', model, id, workspaceId, token, {}, data, method);
        return response;
    }
    /**
     * オブジェクトの削除
     * @param {string} model モデル
     * @param {number} id オブジェクトID
     * @param {number} workspaceId ワークスペースID
     * @param {string} token アクセストークン
     * @param {RequestMethods} method リクエストメソッド
     * @returns {Promise<Response>} レスポンス
     */
    async deleteObject(model, id, workspaceId = 0, token, method = 'delete') {
        const response = await this.doCRUDObject('delete', model, id, workspaceId, token, {}, {}, method);
        return response;
    }
    /**
     * スキーマの取得
     * @param {string} model モデル
     * @param {string} token アクセストークン
     * @param {number} workspaceId ワークスペースID
     * @param {string | null} keys 取得するキー
     * @returns {Promise<Response>} レスポンス
     */
    async getScheme(model, token, workspaceId = 0, keys = null) {
        if (!model) {
            throw 'Parameter `model` is required.';
        }
        else if (!token) {
            throw 'Parameter `token` is required.';
        }
        let params = {};
        if (keys) {
            params = {
                keys: keys,
            };
        }
        const response = await this.runFetch(`/${model}/scheme`, 'get', workspaceId, params, {}, token);
        return response;
    }
    async postContact(action, formId, workspaceId = 0, data = {}) {
        if (!formId) {
            throw 'Parameter `formId` is required.';
        }
        const response = await this.runFetch(`/contact/${action}/${formId}`, 'post', workspaceId, {}, data);
        return response;
    }
    /**
     * コンタクトのトークン取得
     * @param {number} formId フォームID
     * @param {number} workspaceId ワークスペースID
     * @param {string} token アクセストークン
     */
    async getContactToken(formId, workspaceId = 0) {
        const response = await this.postContact('token', formId, workspaceId);
        return response;
    }
    /**
     * コンタクトデータのバリデーション
     * @param {number} formId フォームID
     * @param {number} workspaceId ワークスペースID
     * @param {RequestBody} data リクエストボディ
     * @returns {Promise<Response>} レスポンス
     */
    async confirmContact(formId, workspaceId = 0, data = {}) {
        const response = await this.postContact('confirm', formId, workspaceId, data);
        return response;
    }
    /**
     * コンタクトデータの送信
     * @param {number} formId フォームID
     * @param {number} workspaceId ワークスペースID
     * @param {RequestBody} data リクエストボディ
     * @returns {Promise<Response>} レスポンス
     */
    async submitContact(formId, workspaceId = 0, data = {}) {
        const response = await this.postContact('submit', formId, workspaceId, data);
        return response;
    }
    /**
     * 全文検索（SearchEstraierプラグイン）
     * @param {string} model モデル
     * @param {number} workspaceId ワークスペースID
     * @param {RequestParams} params パラメーター
     * @returns {Promise<Response>} レスポンス
     */
    async searchObjects(model, workspaceId = 0, params = {}) {
        const response = await this.runFetch(`/${model}/search`, 'get', workspaceId, params);
        return response;
    }
}
exports["default"] = PTRESTfulAPIClient;


/***/ }),

/***/ 699:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(314);
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});