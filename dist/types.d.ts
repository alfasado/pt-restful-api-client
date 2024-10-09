export declare type RequestMethods = 'get' | 'post' | 'put' | 'delete' | 'head' | 'options';
export interface PCMSXRequestCols {
    /**
     * 取得するカラム名（カンマ区切り）
     */
    cols?: string;
}
export interface PCMSXRequestParams extends PCMSXRequestCols {
    /**
     * 取得する最大件数
     */
    limit?: number;
    /**
     * スキップする件数
     */
    offset?: number;
    /**
     * ソートするカラム名
     */
    sort_by?: string;
    /**
     * ソート順
     */
    sort_order?: 'ascend' | 'descend';
    [key: string]: string | number | undefined;
}
export interface PCMSXRequestBody {
    [key: string]: any;
}
