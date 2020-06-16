Segment TypeScript API
===

Overview
---

[Segment](https://segment.com) provides various REST APIs with which to interact. This package provides convenient TypeScript functions for calling these APIs. The APIs covered are:

 * The [HTTP Tracking API](https://segment.com/docs/connections/sources/catalog/libraries/server/http-api/). This is used for non web or mobile end-points wishing to send events to Segment.
 * The [Config API](https://segment.com/docs/config-api/). This is used for creating and configuring Workspaces in Segment. Note: This isn't 100% complete. PRs are welcome.
 * The [Profile API](https://segment.com/docs/personas/profile-api/). This is used for querying the identity graph that Segment's [Personas](https://segment.com/product/personas) feature provides

***Important***: If you plan on consuming the HTTP Tracking API via TypeScript, you must define the types ```SegmentTrackProtocol``` and ```SegmentEvents```. This is used for strongly typing *track* calls. If no defined schema exists, simply setting: 
```ts 
declare type SegmentEvents = string
declare type SegmentTrackProtocol = any
``` 
in some ```.d.ts``` file will suffice. There are also optional ```SegmentIdentifyProtocol``` and ```SegmentIdentifyProtocol``` interfaces (for strongly typing *identify* and *group* calls). For more information see [Segment TypeScript Definitions](https://github.com/christyharagan/segment-typescript-definitions).


Install
---

Install via NPM:

```
npm i --save segment-typescript-api
```

or Yarn:

```
yarn install segment-typescript-api
```

Usage
---

Each API is divided into two files:

 * a ```_api``` module (e.g. ```config_api```). This contains an easy-to-use API for calling each endpoint. This is probably the what you want to consume.
 * a ```_request``` module (e.g. ```config_request```). This contains typing definitions that define the endpoints, and a generic function for calling the endpoint.

An example:

```ts
import * as config from 'segment-typescript-api/cjs/config_api'

let WORKSPACE_TOKEN = '123'
let WORKSPACE_SLUG = 'my-workspace'

config.getWorkspace(WORKSPACE_TOKEN, WORKSPACE_SLUG).then(workspace=>{
  console.log(workspace)
})
```

If you're using ESNext modules, import from the ```esm``` namespace:

```ts
import * as config from 'segment-typescript-api/esm/config_api'
```

Preview Function Usage (For commonjs)
---

```ts
let api = require('./cjs/config_api')

const ACCESS_TOKEN = '###' // This is a workspace access token (https://segment.com/docs/config-api/#sts=Access%20Tokens)
const WORK_ID = '###' // Workspace ID (found under Workspace Settings/General Settings/ID)
const SRC_FN_CODE = 'async function onRequest(r){let rr = await r.text(); console.log(rr)}' // This is the actual function code
const SRC_PAYLOAD = { // This is the test-payload to test the source function with
  body: {}, // The HTTP body
  headers: {}, // HTTP headers
  queryParameters: {} // HTTP URL query parameters
}
const DEST_FN_CODE = 'async function onTrack(event, settings) {console.log(event)}' // This is the actual function code
const DEST_PAYLOAD = { // This is the test-payload to test the destination function with. Check out the examples in any of the APIs: https://segment.com/docs/connections/spec/
  // This is a complete example. You would only need to populate the fields that your function would actually use (although some are required; see comments)
  anonymousId: '23adfd82-aa0f-45a7-a756-24f2a7a4c895', // EITHER ONE OF userId OR anonymousId ARE REQUIRED (OR BOTH)
  context: {
    library: {
      name: 'analytics.js',
      version: '2.11.1'
    },
    page: {
      path: '/academy/',
      referrer: '',
      search: '',
      title: 'Analytics Academy',
      url: 'https://segment.com/academy/'
    },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',
    ip: '108.0.78.21'
  },
  event: 'Course Clicked', // FOR TRACK-EVENTS, THIS IS A REQUIRED FIELD
  integrations: {},
  messageId: 'ajs-f8ca1e4de5024d9430b3928bd8ac6b96',
  properties: { // FOR TRACK-EVENTS, THIS IS A REQUIRED FIELD
    title: 'Intro to Analytics'
  },
  receivedAt: '2015-12-12T19:11:01.266Z',
  sentAt: '2015-12-12T19:11:01.169Z',
  timestamp: '2015-12-12T19:11:01.249Z',
  type: 'track', // REQUIRED FIELD; THIS SPECIFIES THE KIND OF EVENT. SEE API DOCS FOR MORE DETAILS: https://segment.com/docs/connections/spec/
  userId: 'AiUGstSDIg', // EITHER ONE OF userId OR anonymousId ARE REQUIRED (OR BOTH)
  originalTimestamp: '2015-12-12T19:11:01.152Z'
}

api.previewSrcFunction(ACCESS_TOKEN, WORK_ID, {
  function: {
    buildpack: 'boreal',
    code: SRC_FN_CODE
  }
}, { payload: SRC_PAYLOAD }).then(r => {
  console.log(r)
})

api.previewDestFunction(ACCESS_TOKEN, WORK_ID, {
  function: {
    buildpack: 'boreal',
    code: DEST_FN_CODE
  }
}, DEST_PAYLOAD).then(r => {
  console.log(r)
})
```

TODO
---

PRs are welcome :)

 * Finish the Config API
 * Document the API calls. Currently, the user has to reference the docs to understand what each call does. This info should be included as JSDocs.
 * Implement the Protocols [Debug API](https://segment.com/docs/protocols/apis-and-extensions/#debug-endpoint)