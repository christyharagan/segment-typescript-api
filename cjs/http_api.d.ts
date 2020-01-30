import * as r from './http_request';
export declare function identify(token: string, input: r.IdentifyInput, externalIds?: SegmentExternalIds): Promise<void>;
export declare function group(token: string, input: r.GroupInput, externalIds?: SegmentExternalIds): Promise<void>;
export declare function track(token: string, input: r.TrackInput, externalIds?: SegmentExternalIds): Promise<void>;
export declare function page(token: string, input: r.PageInput, externalIds?: SegmentExternalIds): Promise<void>;
export declare function screen(token: string, input: r.ScreenInput, externalIds?: SegmentExternalIds): Promise<void>;
export declare function alias(token: string, input: r.AliasInput, externalIds?: SegmentExternalIds): Promise<void>;
export declare function batch(token: string, input: r.BatchInput, externalIds?: SegmentExternalIds): Promise<void>;
