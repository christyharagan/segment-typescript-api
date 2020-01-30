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
import * as config from 'segment-typescript-api/config_api'

let WORKSPACE_TOKEN = '123'
let WORKSPACE_SLUG = 'my-workspace'

config.getWorkspace(WORKSPACE_TOKEN, WORKSPACE_SLUG).then(workspace=>{
  console.log(workspace)
})
```

TODO
---

PRs are welcome :)

 * Finish the Config API
 * Document the API calls. Currently, the user has to reference the docs to understand what each call does. This info should be included as JSDocs.
 * Implement the Protocols [Debug API](https://segment.com/docs/protocols/apis-and-extensions/#debug-endpoint)