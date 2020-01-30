import * as r from './http_request'

export function identify(token: string, input: r.IdentifyInput, externalIds?: SegmentExternalIds) {
  return r.request(token, ['identify', input], externalIds)
}
export function group(token: string, input: r.GroupInput, externalIds?: SegmentExternalIds) {
  return r.request(token, ['group', input], externalIds)
}
export function track(token: string, input: r.TrackInput, externalIds?: SegmentExternalIds) {
  return r.request(token, ['track', input], externalIds)
}
export function page(token: string, input: r.PageInput, externalIds?: SegmentExternalIds) {
  return r.request(token, ['page', input], externalIds)
}
export function screen(token: string, input: r.ScreenInput, externalIds?: SegmentExternalIds) {
  return r.request(token, ['screen', input], externalIds)
}
export function alias(token: string, input: r.AliasInput, externalIds?: SegmentExternalIds) {
  return r.request(token, ['alias', input], externalIds)
}
export function batch(token: string, input: r.BatchInput, externalIds?: SegmentExternalIds) {
  return r.request(token, ['batch', input], externalIds)
}
