// // ONLY NEEDED WHEN TARGETING ESNEXT MODULE OUTPUT (for some reason)
// /// <reference lib="dom" />

// declare const _fetch: typeof fetch;
// declare const _Request: typeof Request;
// declare const _Response: typeof Response;
// declare const _Headers: typeof Headers;

// declare module "cross-fetch" {
//   export const fetch: typeof _fetch;
//   export const Request: typeof _Request;
//   export const Response: typeof _Response;
//   export const Headers: typeof _Headers;
//   export default fetch;
// }


// // ONLY NEEDED FOR DEV PURPOSES
declare type SegmentEvents = string
declare type SegmentTrackProtocol<E extends SegmentEvents> = never