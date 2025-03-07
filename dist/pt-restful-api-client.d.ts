/** @module PTRESTfulAPIClient */
import { RequestMethods, PCMSXRequestCols, PCMSXRequestParams, PCMSXRequestBody } from './types';
export * from './types';
/**
 * PTRESTfulAPIClientクラス
 *
 * @class PTRESTfulAPIClient
 * @exports module:PTRESTfulAPIClient
 */
export default class PTRESTfulAPIClient {
    basePath: string;
    /**
     * コンストラクタ
     * @param {string} apiPath APIのパス（例：/powercmsx/api）
     * @param {string} apiVersion APIバージョン（2020年9月15日現在は 1 ）
     */
    constructor(apiPath: string, apiVersion: number);
    postData(url: string, data?: PCMSXRequestBody, token?: string | null, method?: RequestMethods): Promise<Response>;
    getData(url: string, params?: PCMSXRequestCols | PCMSXRequestParams, token?: string | null): Promise<Response>;
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
    runFetch(endpoint: string, method: RequestMethods, workspaceId?: number | null, params?: PCMSXRequestCols | PCMSXRequestParams, data?: PCMSXRequestBody, token?: string | null): Promise<Response>;
    /**
     * ユーザー認証の実行
     * @param {string} name ユーザー名
     * @param {string} password パスワード
     * @param {boolean} remember アクセストークンの有効期限延長
     * @returns {Promise<Response>} レスポンス
     */
    authentication(name: string, password: string, remember?: boolean): Promise<Response>;
    /**
     * オブジェクト一覧の取得
     * @param {string} model モデル
     * @param {number} workspaceId ワークスペースID
     * @param {RequestParams} params パラメーター
     * @param {string} token アクセストークン
     * @returns {Promise<Response>} レスポンス
     */
    listObjects(model: string, workspaceId?: number, params?: PCMSXRequestParams, token?: string | null): Promise<Response>;
    doCRUDObject(action: string, model: string, id: number | string | null, workspaceId?: number, token?: string | null, params?: PCMSXRequestCols | PCMSXRequestParams, data?: PCMSXRequestBody, method?: RequestMethods | null): Promise<Response>;
    /**
     * オブジェクトの作成
     * @param {string} model モデル
     * @param {number} workspaceId ワークスペースID
     * @param {string} token アクセストークン
     * @param {RequestBody} data リクエストボディ
     * @returns {Promise<Response>} レスポンス
     */
    createObject(model: string, workspaceId: number | undefined, token: string, data?: PCMSXRequestBody): Promise<Response>;
    /**
     * オブジェクトの取得
     * @param {string} model モデル
     * @param {number | string | null} id オブジェクトID（またはプライマリカラムの値）
     * @param {number} workspaceId ワークスペースID
     * @param {RequestParams} params パラメーター
     * @param {string} token アクセストークン
     * @returns {Promise<Response>} レスポンス
     */
    getObject(model: string, id: number | string | null, workspaceId?: number, params?: PCMSXRequestCols, token?: string | null): Promise<Response>;
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
    updateObject(model: string, id: number, workspaceId: number | undefined, token: string, data?: PCMSXRequestBody, method?: RequestMethods): Promise<Response>;
    /**
     * オブジェクトの削除
     * @param {string} model モデル
     * @param {number} id オブジェクトID
     * @param {number} workspaceId ワークスペースID
     * @param {string} token アクセストークン
     * @param {RequestMethods} method リクエストメソッド
     * @returns {Promise<Response>} レスポンス
     */
    deleteObject(model: string, id: number, workspaceId: number | undefined, token: string, method?: RequestMethods): Promise<Response>;
    /**
     * スキーマの取得
     * @param {string} model モデル
     * @param {string} token アクセストークン
     * @param {number} workspaceId ワークスペースID
     * @param {string | null} keys 取得するキー
     * @returns {Promise<Response>} レスポンス
     */
    getScheme(model: string, token: string, workspaceId?: number, keys?: string | null): Promise<Response>;
    postContact(action: string, formId: number, workspaceId?: number, data?: PCMSXRequestBody): Promise<Response>;
    /**
     * コンタクトのトークン取得
     * @param {number} formId フォームID
     * @param {number} workspaceId ワークスペースID
     * @param {string} token アクセストークン
     */
    getContactToken(formId: number, workspaceId?: number): Promise<Response>;
    /**
     * コンタクトデータのバリデーション
     * @param {number} formId フォームID
     * @param {number} workspaceId ワークスペースID
     * @param {RequestBody} data リクエストボディ
     * @returns {Promise<Response>} レスポンス
     */
    confirmContact(formId: number, workspaceId?: number, data?: PCMSXRequestBody): Promise<Response>;
    /**
     * コンタクトデータの送信
     * @param {number} formId フォームID
     * @param {number} workspaceId ワークスペースID
     * @param {RequestBody} data リクエストボディ
     * @returns {Promise<Response>} レスポンス
     */
    submitContact(formId: number, workspaceId?: number, data?: PCMSXRequestBody): Promise<Response>;
    /**
     * 全文検索（SearchEstraierプラグイン）
     * @param {string} model モデル
     * @param {number} workspaceId ワークスペースID
     * @param {RequestParams} params パラメーター
     * @returns {Promise<Response>} レスポンス
     */
    searchObjects(model: string, workspaceId?: number, params?: PCMSXRequestParams): Promise<Response>;
}
