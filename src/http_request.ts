import fetch from 'cross-fetch'
import base64 from 'base-64'
import 'segment-typescript-definitions/common'

export type Input = IdentifyCall | GroupCall | TrackCall | PageCall | ScreenCall | AliasCall | BatchCall
export type IdentifyInput = SegmentOptions & SegmentIdentify
export type GroupInput = SegmentOptions & SegmentGroup
export type TrackInput = SegmentOptions & SegmentTrackObject<SegmentEvents>
export type PageInput = SegmentOptions & SegmentPage
export type ScreenInput = SegmentOptions & SegmentScreen
export type AliasInput = SegmentOptions & SegmentAlias
export type BatchInput = (SegmentOptions & (SegmentIdentify | SegmentGroup | SegmentTrackObject<SegmentEvents> | SegmentPage | SegmentScreen | SegmentAlias))[]

export type IdentifyCall = ['identify', IdentifyInput]
export type GroupCall = ['group', GroupInput]
export type TrackCall = ['track', TrackInput]
export type PageCall = ['page', PageInput]
export type ScreenCall = ['screen', ScreenInput]
export type AliasCall = ['alias', AliasInput]
export type BatchCall = ['batch', BatchInput]

export async function request<I extends Input>(token: string, input: I, externalIds?: SegmentExternalIds): Promise<void> {
  let [prefix, body] = input;

  if (externalIds) {
    (body as any).options = {
      externalIds
    }
  }

  const response = await fetch(`https://api.segment.io/v1/${prefix}`, {
    headers: {
      'Authorization': 'Basic ' + base64.encode(token + ':'),
      'Method': 'post',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  await response.text()
}
