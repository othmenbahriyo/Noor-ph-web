# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetUser*](#getuser)
  - [*ListUsers*](#listusers)
  - [*GetNeighborhood*](#getneighborhood)
  - [*ListNeighborhoods*](#listneighborhoods)
  - [*GetPost*](#getpost)
  - [*ListPosts*](#listposts)
  - [*ListComments*](#listcomments)
  - [*ListEvents*](#listevents)
  - [*ListGroups*](#listgroups)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdateUser*](#updateuser)
  - [*DeleteUser*](#deleteuser)
  - [*CreateNeighborhood*](#createneighborhood)
  - [*UpdateNeighborhood*](#updateneighborhood)
  - [*DeleteNeighborhood*](#deleteneighborhood)
  - [*CreatePost*](#createpost)
  - [*UpdatePost*](#updatepost)
  - [*DeletePost*](#deletepost)
  - [*CreateComment*](#createcomment)
  - [*UpdateComment*](#updatecomment)
  - [*DeleteComment*](#deletecomment)
  - [*CreateEvent*](#createevent)
  - [*UpdateEvent*](#updateevent)
  - [*DeleteEvent*](#deleteevent)
  - [*CreateGroup*](#creategroup)
  - [*UpdateGroup*](#updategroup)
  - [*DeleteGroup*](#deletegroup)
  - [*RSVPEvent*](#rsvpevent)
  - [*CancelRSVP*](#cancelrsvp)
  - [*JoinGroup*](#joingroup)
  - [*LeaveGroup*](#leavegroup)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetUser
You can execute the `GetUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUser(options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface GetUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserData, undefined>;
}
export const getUserRef: GetUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface GetUserRef {
  ...
  (dc: DataConnect): QueryRef<GetUserData, undefined>;
}
export const getUserRef: GetUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserRef:
```typescript
const name = getUserRef.operationName;
console.log(name);
```

### Variables
The `GetUser` query has no variables.
### Return Type
Recall that executing the `GetUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserData {
  user?: {
    email: string;
    displayName: string;
    address: string;
  };
}
```
### Using `GetUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUser } from '@dataconnect/generated';


// Call the `getUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserRef } from '@dataconnect/generated';


// Call the `getUserRef()` function to get a reference to the query.
const ref = getUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListUsers
You can execute the `ListUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersRef:
```typescript
const name = listUsersRef.operationName;
console.log(name);
```

### Variables
The `ListUsers` query has no variables.
### Return Type
Recall that executing the `ListUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUsersData {
  users: ({
    id: UUIDString;
    displayName: string;
    profilePictureUrl?: string | null;
  } & User_Key)[];
}
```
### Using `ListUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsers } from '@dataconnect/generated';


// Call the `listUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersRef } from '@dataconnect/generated';


// Call the `listUsersRef()` function to get a reference to the query.
const ref = listUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetNeighborhood
You can execute the `GetNeighborhood` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getNeighborhood(vars: GetNeighborhoodVariables, options?: ExecuteQueryOptions): QueryPromise<GetNeighborhoodData, GetNeighborhoodVariables>;

interface GetNeighborhoodRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetNeighborhoodVariables): QueryRef<GetNeighborhoodData, GetNeighborhoodVariables>;
}
export const getNeighborhoodRef: GetNeighborhoodRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getNeighborhood(dc: DataConnect, vars: GetNeighborhoodVariables, options?: ExecuteQueryOptions): QueryPromise<GetNeighborhoodData, GetNeighborhoodVariables>;

interface GetNeighborhoodRef {
  ...
  (dc: DataConnect, vars: GetNeighborhoodVariables): QueryRef<GetNeighborhoodData, GetNeighborhoodVariables>;
}
export const getNeighborhoodRef: GetNeighborhoodRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getNeighborhoodRef:
```typescript
const name = getNeighborhoodRef.operationName;
console.log(name);
```

### Variables
The `GetNeighborhood` query requires an argument of type `GetNeighborhoodVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetNeighborhoodVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetNeighborhood` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetNeighborhoodData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetNeighborhoodData {
  neighborhood?: {
    name: string;
    zipCode: string;
    description?: string | null;
  };
}
```
### Using `GetNeighborhood`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getNeighborhood, GetNeighborhoodVariables } from '@dataconnect/generated';

// The `GetNeighborhood` query requires an argument of type `GetNeighborhoodVariables`:
const getNeighborhoodVars: GetNeighborhoodVariables = {
  id: ..., 
};

// Call the `getNeighborhood()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getNeighborhood(getNeighborhoodVars);
// Variables can be defined inline as well.
const { data } = await getNeighborhood({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getNeighborhood(dataConnect, getNeighborhoodVars);

console.log(data.neighborhood);

// Or, you can use the `Promise` API.
getNeighborhood(getNeighborhoodVars).then((response) => {
  const data = response.data;
  console.log(data.neighborhood);
});
```

### Using `GetNeighborhood`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getNeighborhoodRef, GetNeighborhoodVariables } from '@dataconnect/generated';

// The `GetNeighborhood` query requires an argument of type `GetNeighborhoodVariables`:
const getNeighborhoodVars: GetNeighborhoodVariables = {
  id: ..., 
};

// Call the `getNeighborhoodRef()` function to get a reference to the query.
const ref = getNeighborhoodRef(getNeighborhoodVars);
// Variables can be defined inline as well.
const ref = getNeighborhoodRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getNeighborhoodRef(dataConnect, getNeighborhoodVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.neighborhood);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.neighborhood);
});
```

## ListNeighborhoods
You can execute the `ListNeighborhoods` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listNeighborhoods(options?: ExecuteQueryOptions): QueryPromise<ListNeighborhoodsData, undefined>;

interface ListNeighborhoodsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListNeighborhoodsData, undefined>;
}
export const listNeighborhoodsRef: ListNeighborhoodsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listNeighborhoods(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListNeighborhoodsData, undefined>;

interface ListNeighborhoodsRef {
  ...
  (dc: DataConnect): QueryRef<ListNeighborhoodsData, undefined>;
}
export const listNeighborhoodsRef: ListNeighborhoodsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listNeighborhoodsRef:
```typescript
const name = listNeighborhoodsRef.operationName;
console.log(name);
```

### Variables
The `ListNeighborhoods` query has no variables.
### Return Type
Recall that executing the `ListNeighborhoods` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListNeighborhoodsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListNeighborhoodsData {
  neighborhoods: ({
    name: string;
    zipCode: string;
  })[];
}
```
### Using `ListNeighborhoods`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listNeighborhoods } from '@dataconnect/generated';


// Call the `listNeighborhoods()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listNeighborhoods();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listNeighborhoods(dataConnect);

console.log(data.neighborhoods);

// Or, you can use the `Promise` API.
listNeighborhoods().then((response) => {
  const data = response.data;
  console.log(data.neighborhoods);
});
```

### Using `ListNeighborhoods`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listNeighborhoodsRef } from '@dataconnect/generated';


// Call the `listNeighborhoodsRef()` function to get a reference to the query.
const ref = listNeighborhoodsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listNeighborhoodsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.neighborhoods);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.neighborhoods);
});
```

## GetPost
You can execute the `GetPost` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPost(vars: GetPostVariables, options?: ExecuteQueryOptions): QueryPromise<GetPostData, GetPostVariables>;

interface GetPostRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPostVariables): QueryRef<GetPostData, GetPostVariables>;
}
export const getPostRef: GetPostRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPost(dc: DataConnect, vars: GetPostVariables, options?: ExecuteQueryOptions): QueryPromise<GetPostData, GetPostVariables>;

interface GetPostRef {
  ...
  (dc: DataConnect, vars: GetPostVariables): QueryRef<GetPostData, GetPostVariables>;
}
export const getPostRef: GetPostRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPostRef:
```typescript
const name = getPostRef.operationName;
console.log(name);
```

### Variables
The `GetPost` query requires an argument of type `GetPostVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPostVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetPost` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPostData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPostData {
  post?: {
    content: string;
    type: string;
    author: {
      displayName: string;
    };
  };
}
```
### Using `GetPost`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPost, GetPostVariables } from '@dataconnect/generated';

// The `GetPost` query requires an argument of type `GetPostVariables`:
const getPostVars: GetPostVariables = {
  id: ..., 
};

// Call the `getPost()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPost(getPostVars);
// Variables can be defined inline as well.
const { data } = await getPost({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPost(dataConnect, getPostVars);

console.log(data.post);

// Or, you can use the `Promise` API.
getPost(getPostVars).then((response) => {
  const data = response.data;
  console.log(data.post);
});
```

### Using `GetPost`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPostRef, GetPostVariables } from '@dataconnect/generated';

// The `GetPost` query requires an argument of type `GetPostVariables`:
const getPostVars: GetPostVariables = {
  id: ..., 
};

// Call the `getPostRef()` function to get a reference to the query.
const ref = getPostRef(getPostVars);
// Variables can be defined inline as well.
const ref = getPostRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPostRef(dataConnect, getPostVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.post);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.post);
});
```

## ListPosts
You can execute the `ListPosts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listPosts(vars: ListPostsVariables, options?: ExecuteQueryOptions): QueryPromise<ListPostsData, ListPostsVariables>;

interface ListPostsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListPostsVariables): QueryRef<ListPostsData, ListPostsVariables>;
}
export const listPostsRef: ListPostsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPosts(dc: DataConnect, vars: ListPostsVariables, options?: ExecuteQueryOptions): QueryPromise<ListPostsData, ListPostsVariables>;

interface ListPostsRef {
  ...
  (dc: DataConnect, vars: ListPostsVariables): QueryRef<ListPostsData, ListPostsVariables>;
}
export const listPostsRef: ListPostsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPostsRef:
```typescript
const name = listPostsRef.operationName;
console.log(name);
```

### Variables
The `ListPosts` query requires an argument of type `ListPostsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListPostsVariables {
  neighborhoodId: UUIDString;
}
```
### Return Type
Recall that executing the `ListPosts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPostsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListPostsData {
  posts: ({
    content: string;
    createdAt?: TimestampString | null;
  })[];
}
```
### Using `ListPosts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPosts, ListPostsVariables } from '@dataconnect/generated';

// The `ListPosts` query requires an argument of type `ListPostsVariables`:
const listPostsVars: ListPostsVariables = {
  neighborhoodId: ..., 
};

// Call the `listPosts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPosts(listPostsVars);
// Variables can be defined inline as well.
const { data } = await listPosts({ neighborhoodId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPosts(dataConnect, listPostsVars);

console.log(data.posts);

// Or, you can use the `Promise` API.
listPosts(listPostsVars).then((response) => {
  const data = response.data;
  console.log(data.posts);
});
```

### Using `ListPosts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPostsRef, ListPostsVariables } from '@dataconnect/generated';

// The `ListPosts` query requires an argument of type `ListPostsVariables`:
const listPostsVars: ListPostsVariables = {
  neighborhoodId: ..., 
};

// Call the `listPostsRef()` function to get a reference to the query.
const ref = listPostsRef(listPostsVars);
// Variables can be defined inline as well.
const ref = listPostsRef({ neighborhoodId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPostsRef(dataConnect, listPostsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.posts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.posts);
});
```

## ListComments
You can execute the `ListComments` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listComments(vars: ListCommentsVariables, options?: ExecuteQueryOptions): QueryPromise<ListCommentsData, ListCommentsVariables>;

interface ListCommentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCommentsVariables): QueryRef<ListCommentsData, ListCommentsVariables>;
}
export const listCommentsRef: ListCommentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listComments(dc: DataConnect, vars: ListCommentsVariables, options?: ExecuteQueryOptions): QueryPromise<ListCommentsData, ListCommentsVariables>;

interface ListCommentsRef {
  ...
  (dc: DataConnect, vars: ListCommentsVariables): QueryRef<ListCommentsData, ListCommentsVariables>;
}
export const listCommentsRef: ListCommentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCommentsRef:
```typescript
const name = listCommentsRef.operationName;
console.log(name);
```

### Variables
The `ListComments` query requires an argument of type `ListCommentsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListCommentsVariables {
  postId: UUIDString;
}
```
### Return Type
Recall that executing the `ListComments` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCommentsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListCommentsData {
  comments: ({
    text: string;
    author: {
      displayName: string;
    };
  })[];
}
```
### Using `ListComments`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listComments, ListCommentsVariables } from '@dataconnect/generated';

// The `ListComments` query requires an argument of type `ListCommentsVariables`:
const listCommentsVars: ListCommentsVariables = {
  postId: ..., 
};

// Call the `listComments()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listComments(listCommentsVars);
// Variables can be defined inline as well.
const { data } = await listComments({ postId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listComments(dataConnect, listCommentsVars);

console.log(data.comments);

// Or, you can use the `Promise` API.
listComments(listCommentsVars).then((response) => {
  const data = response.data;
  console.log(data.comments);
});
```

### Using `ListComments`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCommentsRef, ListCommentsVariables } from '@dataconnect/generated';

// The `ListComments` query requires an argument of type `ListCommentsVariables`:
const listCommentsVars: ListCommentsVariables = {
  postId: ..., 
};

// Call the `listCommentsRef()` function to get a reference to the query.
const ref = listCommentsRef(listCommentsVars);
// Variables can be defined inline as well.
const ref = listCommentsRef({ postId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCommentsRef(dataConnect, listCommentsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.comments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.comments);
});
```

## ListEvents
You can execute the `ListEvents` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listEvents(vars: ListEventsVariables, options?: ExecuteQueryOptions): QueryPromise<ListEventsData, ListEventsVariables>;

interface ListEventsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListEventsVariables): QueryRef<ListEventsData, ListEventsVariables>;
}
export const listEventsRef: ListEventsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listEvents(dc: DataConnect, vars: ListEventsVariables, options?: ExecuteQueryOptions): QueryPromise<ListEventsData, ListEventsVariables>;

interface ListEventsRef {
  ...
  (dc: DataConnect, vars: ListEventsVariables): QueryRef<ListEventsData, ListEventsVariables>;
}
export const listEventsRef: ListEventsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listEventsRef:
```typescript
const name = listEventsRef.operationName;
console.log(name);
```

### Variables
The `ListEvents` query requires an argument of type `ListEventsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListEventsVariables {
  neighborhoodId: UUIDString;
}
```
### Return Type
Recall that executing the `ListEvents` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListEventsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListEventsData {
  events: ({
    title: string;
    dateTime: TimestampString;
    location: string;
  })[];
}
```
### Using `ListEvents`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listEvents, ListEventsVariables } from '@dataconnect/generated';

// The `ListEvents` query requires an argument of type `ListEventsVariables`:
const listEventsVars: ListEventsVariables = {
  neighborhoodId: ..., 
};

// Call the `listEvents()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listEvents(listEventsVars);
// Variables can be defined inline as well.
const { data } = await listEvents({ neighborhoodId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listEvents(dataConnect, listEventsVars);

console.log(data.events);

// Or, you can use the `Promise` API.
listEvents(listEventsVars).then((response) => {
  const data = response.data;
  console.log(data.events);
});
```

### Using `ListEvents`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listEventsRef, ListEventsVariables } from '@dataconnect/generated';

// The `ListEvents` query requires an argument of type `ListEventsVariables`:
const listEventsVars: ListEventsVariables = {
  neighborhoodId: ..., 
};

// Call the `listEventsRef()` function to get a reference to the query.
const ref = listEventsRef(listEventsVars);
// Variables can be defined inline as well.
const ref = listEventsRef({ neighborhoodId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listEventsRef(dataConnect, listEventsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.events);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.events);
});
```

## ListGroups
You can execute the `ListGroups` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listGroups(vars: ListGroupsVariables, options?: ExecuteQueryOptions): QueryPromise<ListGroupsData, ListGroupsVariables>;

interface ListGroupsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListGroupsVariables): QueryRef<ListGroupsData, ListGroupsVariables>;
}
export const listGroupsRef: ListGroupsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listGroups(dc: DataConnect, vars: ListGroupsVariables, options?: ExecuteQueryOptions): QueryPromise<ListGroupsData, ListGroupsVariables>;

interface ListGroupsRef {
  ...
  (dc: DataConnect, vars: ListGroupsVariables): QueryRef<ListGroupsData, ListGroupsVariables>;
}
export const listGroupsRef: ListGroupsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listGroupsRef:
```typescript
const name = listGroupsRef.operationName;
console.log(name);
```

### Variables
The `ListGroups` query requires an argument of type `ListGroupsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListGroupsVariables {
  neighborhoodId: UUIDString;
}
```
### Return Type
Recall that executing the `ListGroups` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListGroupsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListGroupsData {
  groups: ({
    name: string;
    description?: string | null;
  })[];
}
```
### Using `ListGroups`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listGroups, ListGroupsVariables } from '@dataconnect/generated';

// The `ListGroups` query requires an argument of type `ListGroupsVariables`:
const listGroupsVars: ListGroupsVariables = {
  neighborhoodId: ..., 
};

// Call the `listGroups()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listGroups(listGroupsVars);
// Variables can be defined inline as well.
const { data } = await listGroups({ neighborhoodId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listGroups(dataConnect, listGroupsVars);

console.log(data.groups);

// Or, you can use the `Promise` API.
listGroups(listGroupsVars).then((response) => {
  const data = response.data;
  console.log(data.groups);
});
```

### Using `ListGroups`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listGroupsRef, ListGroupsVariables } from '@dataconnect/generated';

// The `ListGroups` query requires an argument of type `ListGroupsVariables`:
const listGroupsVars: ListGroupsVariables = {
  neighborhoodId: ..., 
};

// Call the `listGroupsRef()` function to get a reference to the query.
const ref = listGroupsRef(listGroupsVars);
// Variables can be defined inline as well.
const ref = listGroupsRef({ neighborhoodId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listGroupsRef(dataConnect, listGroupsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.groups);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.groups);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  email: string;
  displayName: string;
  address: string;
  neighborhoodId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  email: ..., 
  displayName: ..., 
  address: ..., 
  neighborhoodId: ..., 
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ email: ..., displayName: ..., address: ..., neighborhoodId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  email: ..., 
  displayName: ..., 
  address: ..., 
  neighborhoodId: ..., 
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ email: ..., displayName: ..., address: ..., neighborhoodId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateUser
You can execute the `UpdateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUser(vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUser(dc: DataConnect, vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  (dc: DataConnect, vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRef:
```typescript
const name = updateUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserVariables {
  displayName?: string | null;
  phoneNumber?: string | null;
}
```
### Return Type
Recall that executing the `UpdateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUser, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  displayName: ..., // optional
  phoneNumber: ..., // optional
};

// Call the `updateUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUser(updateUserVars);
// Variables can be defined inline as well.
const { data } = await updateUser({ displayName: ..., phoneNumber: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateUserVariables` argument.
const { data } = await updateUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUser(dataConnect, updateUserVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUser(updateUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRef, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  displayName: ..., // optional
  phoneNumber: ..., // optional
};

// Call the `updateUserRef()` function to get a reference to the mutation.
const ref = updateUserRef(updateUserVars);
// Variables can be defined inline as well.
const ref = updateUserRef({ displayName: ..., phoneNumber: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateUserVariables` argument.
const ref = updateUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRef(dataConnect, updateUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## DeleteUser
You can execute the `DeleteUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteUser(): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteUserRef:
```typescript
const name = deleteUserRef.operationName;
console.log(name);
```

### Variables
The `DeleteUser` mutation has no variables.
### Return Type
Recall that executing the `DeleteUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteUserData {
  user_delete?: User_Key | null;
}
```
### Using `DeleteUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteUser } from '@dataconnect/generated';


// Call the `deleteUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteUser(dataConnect);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
deleteUser().then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

### Using `DeleteUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteUserRef } from '@dataconnect/generated';


// Call the `deleteUserRef()` function to get a reference to the mutation.
const ref = deleteUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

## CreateNeighborhood
You can execute the `CreateNeighborhood` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createNeighborhood(vars: CreateNeighborhoodVariables): MutationPromise<CreateNeighborhoodData, CreateNeighborhoodVariables>;

interface CreateNeighborhoodRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNeighborhoodVariables): MutationRef<CreateNeighborhoodData, CreateNeighborhoodVariables>;
}
export const createNeighborhoodRef: CreateNeighborhoodRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createNeighborhood(dc: DataConnect, vars: CreateNeighborhoodVariables): MutationPromise<CreateNeighborhoodData, CreateNeighborhoodVariables>;

interface CreateNeighborhoodRef {
  ...
  (dc: DataConnect, vars: CreateNeighborhoodVariables): MutationRef<CreateNeighborhoodData, CreateNeighborhoodVariables>;
}
export const createNeighborhoodRef: CreateNeighborhoodRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createNeighborhoodRef:
```typescript
const name = createNeighborhoodRef.operationName;
console.log(name);
```

### Variables
The `CreateNeighborhood` mutation requires an argument of type `CreateNeighborhoodVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateNeighborhoodVariables {
  name: string;
  zipCode: string;
}
```
### Return Type
Recall that executing the `CreateNeighborhood` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateNeighborhoodData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateNeighborhoodData {
  neighborhood_insert: Neighborhood_Key;
}
```
### Using `CreateNeighborhood`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createNeighborhood, CreateNeighborhoodVariables } from '@dataconnect/generated';

// The `CreateNeighborhood` mutation requires an argument of type `CreateNeighborhoodVariables`:
const createNeighborhoodVars: CreateNeighborhoodVariables = {
  name: ..., 
  zipCode: ..., 
};

// Call the `createNeighborhood()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createNeighborhood(createNeighborhoodVars);
// Variables can be defined inline as well.
const { data } = await createNeighborhood({ name: ..., zipCode: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createNeighborhood(dataConnect, createNeighborhoodVars);

console.log(data.neighborhood_insert);

// Or, you can use the `Promise` API.
createNeighborhood(createNeighborhoodVars).then((response) => {
  const data = response.data;
  console.log(data.neighborhood_insert);
});
```

### Using `CreateNeighborhood`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createNeighborhoodRef, CreateNeighborhoodVariables } from '@dataconnect/generated';

// The `CreateNeighborhood` mutation requires an argument of type `CreateNeighborhoodVariables`:
const createNeighborhoodVars: CreateNeighborhoodVariables = {
  name: ..., 
  zipCode: ..., 
};

// Call the `createNeighborhoodRef()` function to get a reference to the mutation.
const ref = createNeighborhoodRef(createNeighborhoodVars);
// Variables can be defined inline as well.
const ref = createNeighborhoodRef({ name: ..., zipCode: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createNeighborhoodRef(dataConnect, createNeighborhoodVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.neighborhood_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.neighborhood_insert);
});
```

## UpdateNeighborhood
You can execute the `UpdateNeighborhood` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateNeighborhood(vars: UpdateNeighborhoodVariables): MutationPromise<UpdateNeighborhoodData, UpdateNeighborhoodVariables>;

interface UpdateNeighborhoodRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateNeighborhoodVariables): MutationRef<UpdateNeighborhoodData, UpdateNeighborhoodVariables>;
}
export const updateNeighborhoodRef: UpdateNeighborhoodRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateNeighborhood(dc: DataConnect, vars: UpdateNeighborhoodVariables): MutationPromise<UpdateNeighborhoodData, UpdateNeighborhoodVariables>;

interface UpdateNeighborhoodRef {
  ...
  (dc: DataConnect, vars: UpdateNeighborhoodVariables): MutationRef<UpdateNeighborhoodData, UpdateNeighborhoodVariables>;
}
export const updateNeighborhoodRef: UpdateNeighborhoodRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateNeighborhoodRef:
```typescript
const name = updateNeighborhoodRef.operationName;
console.log(name);
```

### Variables
The `UpdateNeighborhood` mutation requires an argument of type `UpdateNeighborhoodVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateNeighborhoodVariables {
  id: UUIDString;
  description?: string | null;
}
```
### Return Type
Recall that executing the `UpdateNeighborhood` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateNeighborhoodData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateNeighborhoodData {
  neighborhood_update?: Neighborhood_Key | null;
}
```
### Using `UpdateNeighborhood`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateNeighborhood, UpdateNeighborhoodVariables } from '@dataconnect/generated';

// The `UpdateNeighborhood` mutation requires an argument of type `UpdateNeighborhoodVariables`:
const updateNeighborhoodVars: UpdateNeighborhoodVariables = {
  id: ..., 
  description: ..., // optional
};

// Call the `updateNeighborhood()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateNeighborhood(updateNeighborhoodVars);
// Variables can be defined inline as well.
const { data } = await updateNeighborhood({ id: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateNeighborhood(dataConnect, updateNeighborhoodVars);

console.log(data.neighborhood_update);

// Or, you can use the `Promise` API.
updateNeighborhood(updateNeighborhoodVars).then((response) => {
  const data = response.data;
  console.log(data.neighborhood_update);
});
```

### Using `UpdateNeighborhood`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateNeighborhoodRef, UpdateNeighborhoodVariables } from '@dataconnect/generated';

// The `UpdateNeighborhood` mutation requires an argument of type `UpdateNeighborhoodVariables`:
const updateNeighborhoodVars: UpdateNeighborhoodVariables = {
  id: ..., 
  description: ..., // optional
};

// Call the `updateNeighborhoodRef()` function to get a reference to the mutation.
const ref = updateNeighborhoodRef(updateNeighborhoodVars);
// Variables can be defined inline as well.
const ref = updateNeighborhoodRef({ id: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateNeighborhoodRef(dataConnect, updateNeighborhoodVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.neighborhood_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.neighborhood_update);
});
```

## DeleteNeighborhood
You can execute the `DeleteNeighborhood` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteNeighborhood(vars: DeleteNeighborhoodVariables): MutationPromise<DeleteNeighborhoodData, DeleteNeighborhoodVariables>;

interface DeleteNeighborhoodRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteNeighborhoodVariables): MutationRef<DeleteNeighborhoodData, DeleteNeighborhoodVariables>;
}
export const deleteNeighborhoodRef: DeleteNeighborhoodRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteNeighborhood(dc: DataConnect, vars: DeleteNeighborhoodVariables): MutationPromise<DeleteNeighborhoodData, DeleteNeighborhoodVariables>;

interface DeleteNeighborhoodRef {
  ...
  (dc: DataConnect, vars: DeleteNeighborhoodVariables): MutationRef<DeleteNeighborhoodData, DeleteNeighborhoodVariables>;
}
export const deleteNeighborhoodRef: DeleteNeighborhoodRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteNeighborhoodRef:
```typescript
const name = deleteNeighborhoodRef.operationName;
console.log(name);
```

### Variables
The `DeleteNeighborhood` mutation requires an argument of type `DeleteNeighborhoodVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteNeighborhoodVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteNeighborhood` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteNeighborhoodData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteNeighborhoodData {
  neighborhood_delete?: Neighborhood_Key | null;
}
```
### Using `DeleteNeighborhood`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteNeighborhood, DeleteNeighborhoodVariables } from '@dataconnect/generated';

// The `DeleteNeighborhood` mutation requires an argument of type `DeleteNeighborhoodVariables`:
const deleteNeighborhoodVars: DeleteNeighborhoodVariables = {
  id: ..., 
};

// Call the `deleteNeighborhood()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteNeighborhood(deleteNeighborhoodVars);
// Variables can be defined inline as well.
const { data } = await deleteNeighborhood({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteNeighborhood(dataConnect, deleteNeighborhoodVars);

console.log(data.neighborhood_delete);

// Or, you can use the `Promise` API.
deleteNeighborhood(deleteNeighborhoodVars).then((response) => {
  const data = response.data;
  console.log(data.neighborhood_delete);
});
```

### Using `DeleteNeighborhood`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteNeighborhoodRef, DeleteNeighborhoodVariables } from '@dataconnect/generated';

// The `DeleteNeighborhood` mutation requires an argument of type `DeleteNeighborhoodVariables`:
const deleteNeighborhoodVars: DeleteNeighborhoodVariables = {
  id: ..., 
};

// Call the `deleteNeighborhoodRef()` function to get a reference to the mutation.
const ref = deleteNeighborhoodRef(deleteNeighborhoodVars);
// Variables can be defined inline as well.
const ref = deleteNeighborhoodRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteNeighborhoodRef(dataConnect, deleteNeighborhoodVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.neighborhood_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.neighborhood_delete);
});
```

## CreatePost
You can execute the `CreatePost` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createPost(vars: CreatePostVariables): MutationPromise<CreatePostData, CreatePostVariables>;

interface CreatePostRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePostVariables): MutationRef<CreatePostData, CreatePostVariables>;
}
export const createPostRef: CreatePostRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createPost(dc: DataConnect, vars: CreatePostVariables): MutationPromise<CreatePostData, CreatePostVariables>;

interface CreatePostRef {
  ...
  (dc: DataConnect, vars: CreatePostVariables): MutationRef<CreatePostData, CreatePostVariables>;
}
export const createPostRef: CreatePostRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPostRef:
```typescript
const name = createPostRef.operationName;
console.log(name);
```

### Variables
The `CreatePost` mutation requires an argument of type `CreatePostVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreatePostVariables {
  neighborhoodId: UUIDString;
  content: string;
  type: string;
}
```
### Return Type
Recall that executing the `CreatePost` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePostData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePostData {
  post_insert: Post_Key;
}
```
### Using `CreatePost`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createPost, CreatePostVariables } from '@dataconnect/generated';

// The `CreatePost` mutation requires an argument of type `CreatePostVariables`:
const createPostVars: CreatePostVariables = {
  neighborhoodId: ..., 
  content: ..., 
  type: ..., 
};

// Call the `createPost()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createPost(createPostVars);
// Variables can be defined inline as well.
const { data } = await createPost({ neighborhoodId: ..., content: ..., type: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createPost(dataConnect, createPostVars);

console.log(data.post_insert);

// Or, you can use the `Promise` API.
createPost(createPostVars).then((response) => {
  const data = response.data;
  console.log(data.post_insert);
});
```

### Using `CreatePost`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPostRef, CreatePostVariables } from '@dataconnect/generated';

// The `CreatePost` mutation requires an argument of type `CreatePostVariables`:
const createPostVars: CreatePostVariables = {
  neighborhoodId: ..., 
  content: ..., 
  type: ..., 
};

// Call the `createPostRef()` function to get a reference to the mutation.
const ref = createPostRef(createPostVars);
// Variables can be defined inline as well.
const ref = createPostRef({ neighborhoodId: ..., content: ..., type: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPostRef(dataConnect, createPostVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.post_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.post_insert);
});
```

## UpdatePost
You can execute the `UpdatePost` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updatePost(vars: UpdatePostVariables): MutationPromise<UpdatePostData, UpdatePostVariables>;

interface UpdatePostRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePostVariables): MutationRef<UpdatePostData, UpdatePostVariables>;
}
export const updatePostRef: UpdatePostRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updatePost(dc: DataConnect, vars: UpdatePostVariables): MutationPromise<UpdatePostData, UpdatePostVariables>;

interface UpdatePostRef {
  ...
  (dc: DataConnect, vars: UpdatePostVariables): MutationRef<UpdatePostData, UpdatePostVariables>;
}
export const updatePostRef: UpdatePostRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updatePostRef:
```typescript
const name = updatePostRef.operationName;
console.log(name);
```

### Variables
The `UpdatePost` mutation requires an argument of type `UpdatePostVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdatePostVariables {
  id: UUIDString;
  content?: string | null;
}
```
### Return Type
Recall that executing the `UpdatePost` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdatePostData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdatePostData {
  post_update?: Post_Key | null;
}
```
### Using `UpdatePost`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updatePost, UpdatePostVariables } from '@dataconnect/generated';

// The `UpdatePost` mutation requires an argument of type `UpdatePostVariables`:
const updatePostVars: UpdatePostVariables = {
  id: ..., 
  content: ..., // optional
};

// Call the `updatePost()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updatePost(updatePostVars);
// Variables can be defined inline as well.
const { data } = await updatePost({ id: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updatePost(dataConnect, updatePostVars);

console.log(data.post_update);

// Or, you can use the `Promise` API.
updatePost(updatePostVars).then((response) => {
  const data = response.data;
  console.log(data.post_update);
});
```

### Using `UpdatePost`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updatePostRef, UpdatePostVariables } from '@dataconnect/generated';

// The `UpdatePost` mutation requires an argument of type `UpdatePostVariables`:
const updatePostVars: UpdatePostVariables = {
  id: ..., 
  content: ..., // optional
};

// Call the `updatePostRef()` function to get a reference to the mutation.
const ref = updatePostRef(updatePostVars);
// Variables can be defined inline as well.
const ref = updatePostRef({ id: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updatePostRef(dataConnect, updatePostVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.post_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.post_update);
});
```

## DeletePost
You can execute the `DeletePost` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deletePost(vars: DeletePostVariables): MutationPromise<DeletePostData, DeletePostVariables>;

interface DeletePostRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePostVariables): MutationRef<DeletePostData, DeletePostVariables>;
}
export const deletePostRef: DeletePostRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deletePost(dc: DataConnect, vars: DeletePostVariables): MutationPromise<DeletePostData, DeletePostVariables>;

interface DeletePostRef {
  ...
  (dc: DataConnect, vars: DeletePostVariables): MutationRef<DeletePostData, DeletePostVariables>;
}
export const deletePostRef: DeletePostRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deletePostRef:
```typescript
const name = deletePostRef.operationName;
console.log(name);
```

### Variables
The `DeletePost` mutation requires an argument of type `DeletePostVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeletePostVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeletePost` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeletePostData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeletePostData {
  post_delete?: Post_Key | null;
}
```
### Using `DeletePost`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deletePost, DeletePostVariables } from '@dataconnect/generated';

// The `DeletePost` mutation requires an argument of type `DeletePostVariables`:
const deletePostVars: DeletePostVariables = {
  id: ..., 
};

// Call the `deletePost()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deletePost(deletePostVars);
// Variables can be defined inline as well.
const { data } = await deletePost({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deletePost(dataConnect, deletePostVars);

console.log(data.post_delete);

// Or, you can use the `Promise` API.
deletePost(deletePostVars).then((response) => {
  const data = response.data;
  console.log(data.post_delete);
});
```

### Using `DeletePost`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deletePostRef, DeletePostVariables } from '@dataconnect/generated';

// The `DeletePost` mutation requires an argument of type `DeletePostVariables`:
const deletePostVars: DeletePostVariables = {
  id: ..., 
};

// Call the `deletePostRef()` function to get a reference to the mutation.
const ref = deletePostRef(deletePostVars);
// Variables can be defined inline as well.
const ref = deletePostRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deletePostRef(dataConnect, deletePostVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.post_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.post_delete);
});
```

## CreateComment
You can execute the `CreateComment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createComment(vars: CreateCommentVariables): MutationPromise<CreateCommentData, CreateCommentVariables>;

interface CreateCommentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCommentVariables): MutationRef<CreateCommentData, CreateCommentVariables>;
}
export const createCommentRef: CreateCommentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createComment(dc: DataConnect, vars: CreateCommentVariables): MutationPromise<CreateCommentData, CreateCommentVariables>;

interface CreateCommentRef {
  ...
  (dc: DataConnect, vars: CreateCommentVariables): MutationRef<CreateCommentData, CreateCommentVariables>;
}
export const createCommentRef: CreateCommentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createCommentRef:
```typescript
const name = createCommentRef.operationName;
console.log(name);
```

### Variables
The `CreateComment` mutation requires an argument of type `CreateCommentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateCommentVariables {
  postId: UUIDString;
  text: string;
}
```
### Return Type
Recall that executing the `CreateComment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateCommentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateCommentData {
  comment_insert: Comment_Key;
}
```
### Using `CreateComment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createComment, CreateCommentVariables } from '@dataconnect/generated';

// The `CreateComment` mutation requires an argument of type `CreateCommentVariables`:
const createCommentVars: CreateCommentVariables = {
  postId: ..., 
  text: ..., 
};

// Call the `createComment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createComment(createCommentVars);
// Variables can be defined inline as well.
const { data } = await createComment({ postId: ..., text: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createComment(dataConnect, createCommentVars);

console.log(data.comment_insert);

// Or, you can use the `Promise` API.
createComment(createCommentVars).then((response) => {
  const data = response.data;
  console.log(data.comment_insert);
});
```

### Using `CreateComment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createCommentRef, CreateCommentVariables } from '@dataconnect/generated';

// The `CreateComment` mutation requires an argument of type `CreateCommentVariables`:
const createCommentVars: CreateCommentVariables = {
  postId: ..., 
  text: ..., 
};

// Call the `createCommentRef()` function to get a reference to the mutation.
const ref = createCommentRef(createCommentVars);
// Variables can be defined inline as well.
const ref = createCommentRef({ postId: ..., text: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createCommentRef(dataConnect, createCommentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.comment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.comment_insert);
});
```

## UpdateComment
You can execute the `UpdateComment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateComment(vars: UpdateCommentVariables): MutationPromise<UpdateCommentData, UpdateCommentVariables>;

interface UpdateCommentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCommentVariables): MutationRef<UpdateCommentData, UpdateCommentVariables>;
}
export const updateCommentRef: UpdateCommentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateComment(dc: DataConnect, vars: UpdateCommentVariables): MutationPromise<UpdateCommentData, UpdateCommentVariables>;

interface UpdateCommentRef {
  ...
  (dc: DataConnect, vars: UpdateCommentVariables): MutationRef<UpdateCommentData, UpdateCommentVariables>;
}
export const updateCommentRef: UpdateCommentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateCommentRef:
```typescript
const name = updateCommentRef.operationName;
console.log(name);
```

### Variables
The `UpdateComment` mutation requires an argument of type `UpdateCommentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateCommentVariables {
  id: UUIDString;
  text: string;
}
```
### Return Type
Recall that executing the `UpdateComment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateCommentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateCommentData {
  comment_update?: Comment_Key | null;
}
```
### Using `UpdateComment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateComment, UpdateCommentVariables } from '@dataconnect/generated';

// The `UpdateComment` mutation requires an argument of type `UpdateCommentVariables`:
const updateCommentVars: UpdateCommentVariables = {
  id: ..., 
  text: ..., 
};

// Call the `updateComment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateComment(updateCommentVars);
// Variables can be defined inline as well.
const { data } = await updateComment({ id: ..., text: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateComment(dataConnect, updateCommentVars);

console.log(data.comment_update);

// Or, you can use the `Promise` API.
updateComment(updateCommentVars).then((response) => {
  const data = response.data;
  console.log(data.comment_update);
});
```

### Using `UpdateComment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateCommentRef, UpdateCommentVariables } from '@dataconnect/generated';

// The `UpdateComment` mutation requires an argument of type `UpdateCommentVariables`:
const updateCommentVars: UpdateCommentVariables = {
  id: ..., 
  text: ..., 
};

// Call the `updateCommentRef()` function to get a reference to the mutation.
const ref = updateCommentRef(updateCommentVars);
// Variables can be defined inline as well.
const ref = updateCommentRef({ id: ..., text: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateCommentRef(dataConnect, updateCommentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.comment_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.comment_update);
});
```

## DeleteComment
You can execute the `DeleteComment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteComment(vars: DeleteCommentVariables): MutationPromise<DeleteCommentData, DeleteCommentVariables>;

interface DeleteCommentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCommentVariables): MutationRef<DeleteCommentData, DeleteCommentVariables>;
}
export const deleteCommentRef: DeleteCommentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteComment(dc: DataConnect, vars: DeleteCommentVariables): MutationPromise<DeleteCommentData, DeleteCommentVariables>;

interface DeleteCommentRef {
  ...
  (dc: DataConnect, vars: DeleteCommentVariables): MutationRef<DeleteCommentData, DeleteCommentVariables>;
}
export const deleteCommentRef: DeleteCommentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteCommentRef:
```typescript
const name = deleteCommentRef.operationName;
console.log(name);
```

### Variables
The `DeleteComment` mutation requires an argument of type `DeleteCommentVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteCommentVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteComment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteCommentData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteCommentData {
  comment_delete?: Comment_Key | null;
}
```
### Using `DeleteComment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteComment, DeleteCommentVariables } from '@dataconnect/generated';

// The `DeleteComment` mutation requires an argument of type `DeleteCommentVariables`:
const deleteCommentVars: DeleteCommentVariables = {
  id: ..., 
};

// Call the `deleteComment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteComment(deleteCommentVars);
// Variables can be defined inline as well.
const { data } = await deleteComment({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteComment(dataConnect, deleteCommentVars);

console.log(data.comment_delete);

// Or, you can use the `Promise` API.
deleteComment(deleteCommentVars).then((response) => {
  const data = response.data;
  console.log(data.comment_delete);
});
```

### Using `DeleteComment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteCommentRef, DeleteCommentVariables } from '@dataconnect/generated';

// The `DeleteComment` mutation requires an argument of type `DeleteCommentVariables`:
const deleteCommentVars: DeleteCommentVariables = {
  id: ..., 
};

// Call the `deleteCommentRef()` function to get a reference to the mutation.
const ref = deleteCommentRef(deleteCommentVars);
// Variables can be defined inline as well.
const ref = deleteCommentRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteCommentRef(dataConnect, deleteCommentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.comment_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.comment_delete);
});
```

## CreateEvent
You can execute the `CreateEvent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createEvent(vars: CreateEventVariables): MutationPromise<CreateEventData, CreateEventVariables>;

interface CreateEventRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateEventVariables): MutationRef<CreateEventData, CreateEventVariables>;
}
export const createEventRef: CreateEventRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createEvent(dc: DataConnect, vars: CreateEventVariables): MutationPromise<CreateEventData, CreateEventVariables>;

interface CreateEventRef {
  ...
  (dc: DataConnect, vars: CreateEventVariables): MutationRef<CreateEventData, CreateEventVariables>;
}
export const createEventRef: CreateEventRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createEventRef:
```typescript
const name = createEventRef.operationName;
console.log(name);
```

### Variables
The `CreateEvent` mutation requires an argument of type `CreateEventVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateEventVariables {
  title: string;
  dateTime: TimestampString;
  location: string;
  neighborhoodId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateEvent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateEventData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateEventData {
  event_insert: Event_Key;
}
```
### Using `CreateEvent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createEvent, CreateEventVariables } from '@dataconnect/generated';

// The `CreateEvent` mutation requires an argument of type `CreateEventVariables`:
const createEventVars: CreateEventVariables = {
  title: ..., 
  dateTime: ..., 
  location: ..., 
  neighborhoodId: ..., 
};

// Call the `createEvent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createEvent(createEventVars);
// Variables can be defined inline as well.
const { data } = await createEvent({ title: ..., dateTime: ..., location: ..., neighborhoodId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createEvent(dataConnect, createEventVars);

console.log(data.event_insert);

// Or, you can use the `Promise` API.
createEvent(createEventVars).then((response) => {
  const data = response.data;
  console.log(data.event_insert);
});
```

### Using `CreateEvent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createEventRef, CreateEventVariables } from '@dataconnect/generated';

// The `CreateEvent` mutation requires an argument of type `CreateEventVariables`:
const createEventVars: CreateEventVariables = {
  title: ..., 
  dateTime: ..., 
  location: ..., 
  neighborhoodId: ..., 
};

// Call the `createEventRef()` function to get a reference to the mutation.
const ref = createEventRef(createEventVars);
// Variables can be defined inline as well.
const ref = createEventRef({ title: ..., dateTime: ..., location: ..., neighborhoodId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createEventRef(dataConnect, createEventVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.event_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.event_insert);
});
```

## UpdateEvent
You can execute the `UpdateEvent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateEvent(vars: UpdateEventVariables): MutationPromise<UpdateEventData, UpdateEventVariables>;

interface UpdateEventRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateEventVariables): MutationRef<UpdateEventData, UpdateEventVariables>;
}
export const updateEventRef: UpdateEventRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateEvent(dc: DataConnect, vars: UpdateEventVariables): MutationPromise<UpdateEventData, UpdateEventVariables>;

interface UpdateEventRef {
  ...
  (dc: DataConnect, vars: UpdateEventVariables): MutationRef<UpdateEventData, UpdateEventVariables>;
}
export const updateEventRef: UpdateEventRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateEventRef:
```typescript
const name = updateEventRef.operationName;
console.log(name);
```

### Variables
The `UpdateEvent` mutation requires an argument of type `UpdateEventVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateEventVariables {
  id: UUIDString;
  maxAttendees?: number | null;
}
```
### Return Type
Recall that executing the `UpdateEvent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateEventData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateEventData {
  event_update?: Event_Key | null;
}
```
### Using `UpdateEvent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateEvent, UpdateEventVariables } from '@dataconnect/generated';

// The `UpdateEvent` mutation requires an argument of type `UpdateEventVariables`:
const updateEventVars: UpdateEventVariables = {
  id: ..., 
  maxAttendees: ..., // optional
};

// Call the `updateEvent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateEvent(updateEventVars);
// Variables can be defined inline as well.
const { data } = await updateEvent({ id: ..., maxAttendees: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateEvent(dataConnect, updateEventVars);

console.log(data.event_update);

// Or, you can use the `Promise` API.
updateEvent(updateEventVars).then((response) => {
  const data = response.data;
  console.log(data.event_update);
});
```

### Using `UpdateEvent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateEventRef, UpdateEventVariables } from '@dataconnect/generated';

// The `UpdateEvent` mutation requires an argument of type `UpdateEventVariables`:
const updateEventVars: UpdateEventVariables = {
  id: ..., 
  maxAttendees: ..., // optional
};

// Call the `updateEventRef()` function to get a reference to the mutation.
const ref = updateEventRef(updateEventVars);
// Variables can be defined inline as well.
const ref = updateEventRef({ id: ..., maxAttendees: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateEventRef(dataConnect, updateEventVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.event_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.event_update);
});
```

## DeleteEvent
You can execute the `DeleteEvent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteEvent(vars: DeleteEventVariables): MutationPromise<DeleteEventData, DeleteEventVariables>;

interface DeleteEventRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteEventVariables): MutationRef<DeleteEventData, DeleteEventVariables>;
}
export const deleteEventRef: DeleteEventRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteEvent(dc: DataConnect, vars: DeleteEventVariables): MutationPromise<DeleteEventData, DeleteEventVariables>;

interface DeleteEventRef {
  ...
  (dc: DataConnect, vars: DeleteEventVariables): MutationRef<DeleteEventData, DeleteEventVariables>;
}
export const deleteEventRef: DeleteEventRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteEventRef:
```typescript
const name = deleteEventRef.operationName;
console.log(name);
```

### Variables
The `DeleteEvent` mutation requires an argument of type `DeleteEventVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteEventVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteEvent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteEventData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteEventData {
  event_delete?: Event_Key | null;
}
```
### Using `DeleteEvent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteEvent, DeleteEventVariables } from '@dataconnect/generated';

// The `DeleteEvent` mutation requires an argument of type `DeleteEventVariables`:
const deleteEventVars: DeleteEventVariables = {
  id: ..., 
};

// Call the `deleteEvent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteEvent(deleteEventVars);
// Variables can be defined inline as well.
const { data } = await deleteEvent({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteEvent(dataConnect, deleteEventVars);

console.log(data.event_delete);

// Or, you can use the `Promise` API.
deleteEvent(deleteEventVars).then((response) => {
  const data = response.data;
  console.log(data.event_delete);
});
```

### Using `DeleteEvent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteEventRef, DeleteEventVariables } from '@dataconnect/generated';

// The `DeleteEvent` mutation requires an argument of type `DeleteEventVariables`:
const deleteEventVars: DeleteEventVariables = {
  id: ..., 
};

// Call the `deleteEventRef()` function to get a reference to the mutation.
const ref = deleteEventRef(deleteEventVars);
// Variables can be defined inline as well.
const ref = deleteEventRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteEventRef(dataConnect, deleteEventVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.event_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.event_delete);
});
```

## CreateGroup
You can execute the `CreateGroup` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createGroup(vars: CreateGroupVariables): MutationPromise<CreateGroupData, CreateGroupVariables>;

interface CreateGroupRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateGroupVariables): MutationRef<CreateGroupData, CreateGroupVariables>;
}
export const createGroupRef: CreateGroupRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createGroup(dc: DataConnect, vars: CreateGroupVariables): MutationPromise<CreateGroupData, CreateGroupVariables>;

interface CreateGroupRef {
  ...
  (dc: DataConnect, vars: CreateGroupVariables): MutationRef<CreateGroupData, CreateGroupVariables>;
}
export const createGroupRef: CreateGroupRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createGroupRef:
```typescript
const name = createGroupRef.operationName;
console.log(name);
```

### Variables
The `CreateGroup` mutation requires an argument of type `CreateGroupVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateGroupVariables {
  name: string;
  neighborhoodId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateGroup` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateGroupData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateGroupData {
  group_insert: Group_Key;
}
```
### Using `CreateGroup`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createGroup, CreateGroupVariables } from '@dataconnect/generated';

// The `CreateGroup` mutation requires an argument of type `CreateGroupVariables`:
const createGroupVars: CreateGroupVariables = {
  name: ..., 
  neighborhoodId: ..., 
};

// Call the `createGroup()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createGroup(createGroupVars);
// Variables can be defined inline as well.
const { data } = await createGroup({ name: ..., neighborhoodId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createGroup(dataConnect, createGroupVars);

console.log(data.group_insert);

// Or, you can use the `Promise` API.
createGroup(createGroupVars).then((response) => {
  const data = response.data;
  console.log(data.group_insert);
});
```

### Using `CreateGroup`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createGroupRef, CreateGroupVariables } from '@dataconnect/generated';

// The `CreateGroup` mutation requires an argument of type `CreateGroupVariables`:
const createGroupVars: CreateGroupVariables = {
  name: ..., 
  neighborhoodId: ..., 
};

// Call the `createGroupRef()` function to get a reference to the mutation.
const ref = createGroupRef(createGroupVars);
// Variables can be defined inline as well.
const ref = createGroupRef({ name: ..., neighborhoodId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createGroupRef(dataConnect, createGroupVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.group_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.group_insert);
});
```

## UpdateGroup
You can execute the `UpdateGroup` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateGroup(vars: UpdateGroupVariables): MutationPromise<UpdateGroupData, UpdateGroupVariables>;

interface UpdateGroupRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateGroupVariables): MutationRef<UpdateGroupData, UpdateGroupVariables>;
}
export const updateGroupRef: UpdateGroupRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateGroup(dc: DataConnect, vars: UpdateGroupVariables): MutationPromise<UpdateGroupData, UpdateGroupVariables>;

interface UpdateGroupRef {
  ...
  (dc: DataConnect, vars: UpdateGroupVariables): MutationRef<UpdateGroupData, UpdateGroupVariables>;
}
export const updateGroupRef: UpdateGroupRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateGroupRef:
```typescript
const name = updateGroupRef.operationName;
console.log(name);
```

### Variables
The `UpdateGroup` mutation requires an argument of type `UpdateGroupVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateGroupVariables {
  id: UUIDString;
  description?: string | null;
}
```
### Return Type
Recall that executing the `UpdateGroup` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateGroupData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateGroupData {
  group_update?: Group_Key | null;
}
```
### Using `UpdateGroup`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateGroup, UpdateGroupVariables } from '@dataconnect/generated';

// The `UpdateGroup` mutation requires an argument of type `UpdateGroupVariables`:
const updateGroupVars: UpdateGroupVariables = {
  id: ..., 
  description: ..., // optional
};

// Call the `updateGroup()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateGroup(updateGroupVars);
// Variables can be defined inline as well.
const { data } = await updateGroup({ id: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateGroup(dataConnect, updateGroupVars);

console.log(data.group_update);

// Or, you can use the `Promise` API.
updateGroup(updateGroupVars).then((response) => {
  const data = response.data;
  console.log(data.group_update);
});
```

### Using `UpdateGroup`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateGroupRef, UpdateGroupVariables } from '@dataconnect/generated';

// The `UpdateGroup` mutation requires an argument of type `UpdateGroupVariables`:
const updateGroupVars: UpdateGroupVariables = {
  id: ..., 
  description: ..., // optional
};

// Call the `updateGroupRef()` function to get a reference to the mutation.
const ref = updateGroupRef(updateGroupVars);
// Variables can be defined inline as well.
const ref = updateGroupRef({ id: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateGroupRef(dataConnect, updateGroupVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.group_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.group_update);
});
```

## DeleteGroup
You can execute the `DeleteGroup` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteGroup(vars: DeleteGroupVariables): MutationPromise<DeleteGroupData, DeleteGroupVariables>;

interface DeleteGroupRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteGroupVariables): MutationRef<DeleteGroupData, DeleteGroupVariables>;
}
export const deleteGroupRef: DeleteGroupRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteGroup(dc: DataConnect, vars: DeleteGroupVariables): MutationPromise<DeleteGroupData, DeleteGroupVariables>;

interface DeleteGroupRef {
  ...
  (dc: DataConnect, vars: DeleteGroupVariables): MutationRef<DeleteGroupData, DeleteGroupVariables>;
}
export const deleteGroupRef: DeleteGroupRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteGroupRef:
```typescript
const name = deleteGroupRef.operationName;
console.log(name);
```

### Variables
The `DeleteGroup` mutation requires an argument of type `DeleteGroupVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteGroupVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteGroup` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteGroupData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteGroupData {
  group_delete?: Group_Key | null;
}
```
### Using `DeleteGroup`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteGroup, DeleteGroupVariables } from '@dataconnect/generated';

// The `DeleteGroup` mutation requires an argument of type `DeleteGroupVariables`:
const deleteGroupVars: DeleteGroupVariables = {
  id: ..., 
};

// Call the `deleteGroup()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteGroup(deleteGroupVars);
// Variables can be defined inline as well.
const { data } = await deleteGroup({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteGroup(dataConnect, deleteGroupVars);

console.log(data.group_delete);

// Or, you can use the `Promise` API.
deleteGroup(deleteGroupVars).then((response) => {
  const data = response.data;
  console.log(data.group_delete);
});
```

### Using `DeleteGroup`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteGroupRef, DeleteGroupVariables } from '@dataconnect/generated';

// The `DeleteGroup` mutation requires an argument of type `DeleteGroupVariables`:
const deleteGroupVars: DeleteGroupVariables = {
  id: ..., 
};

// Call the `deleteGroupRef()` function to get a reference to the mutation.
const ref = deleteGroupRef(deleteGroupVars);
// Variables can be defined inline as well.
const ref = deleteGroupRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteGroupRef(dataConnect, deleteGroupVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.group_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.group_delete);
});
```

## RSVPEvent
You can execute the `RSVPEvent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
rsvpEvent(vars: RsvpEventVariables): MutationPromise<RsvpEventData, RsvpEventVariables>;

interface RsvpEventRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RsvpEventVariables): MutationRef<RsvpEventData, RsvpEventVariables>;
}
export const rsvpEventRef: RsvpEventRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
rsvpEvent(dc: DataConnect, vars: RsvpEventVariables): MutationPromise<RsvpEventData, RsvpEventVariables>;

interface RsvpEventRef {
  ...
  (dc: DataConnect, vars: RsvpEventVariables): MutationRef<RsvpEventData, RsvpEventVariables>;
}
export const rsvpEventRef: RsvpEventRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the rsvpEventRef:
```typescript
const name = rsvpEventRef.operationName;
console.log(name);
```

### Variables
The `RSVPEvent` mutation requires an argument of type `RsvpEventVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RsvpEventVariables {
  eventId: UUIDString;
}
```
### Return Type
Recall that executing the `RSVPEvent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RsvpEventData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RsvpEventData {
  eventRSVP_insert: EventRSVP_Key;
}
```
### Using `RSVPEvent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, rsvpEvent, RsvpEventVariables } from '@dataconnect/generated';

// The `RSVPEvent` mutation requires an argument of type `RsvpEventVariables`:
const rsvpEventVars: RsvpEventVariables = {
  eventId: ..., 
};

// Call the `rsvpEvent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await rsvpEvent(rsvpEventVars);
// Variables can be defined inline as well.
const { data } = await rsvpEvent({ eventId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await rsvpEvent(dataConnect, rsvpEventVars);

console.log(data.eventRSVP_insert);

// Or, you can use the `Promise` API.
rsvpEvent(rsvpEventVars).then((response) => {
  const data = response.data;
  console.log(data.eventRSVP_insert);
});
```

### Using `RSVPEvent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, rsvpEventRef, RsvpEventVariables } from '@dataconnect/generated';

// The `RSVPEvent` mutation requires an argument of type `RsvpEventVariables`:
const rsvpEventVars: RsvpEventVariables = {
  eventId: ..., 
};

// Call the `rsvpEventRef()` function to get a reference to the mutation.
const ref = rsvpEventRef(rsvpEventVars);
// Variables can be defined inline as well.
const ref = rsvpEventRef({ eventId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = rsvpEventRef(dataConnect, rsvpEventVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.eventRSVP_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.eventRSVP_insert);
});
```

## CancelRSVP
You can execute the `CancelRSVP` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
cancelRsvp(vars: CancelRsvpVariables): MutationPromise<CancelRsvpData, CancelRsvpVariables>;

interface CancelRsvpRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CancelRsvpVariables): MutationRef<CancelRsvpData, CancelRsvpVariables>;
}
export const cancelRsvpRef: CancelRsvpRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
cancelRsvp(dc: DataConnect, vars: CancelRsvpVariables): MutationPromise<CancelRsvpData, CancelRsvpVariables>;

interface CancelRsvpRef {
  ...
  (dc: DataConnect, vars: CancelRsvpVariables): MutationRef<CancelRsvpData, CancelRsvpVariables>;
}
export const cancelRsvpRef: CancelRsvpRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the cancelRsvpRef:
```typescript
const name = cancelRsvpRef.operationName;
console.log(name);
```

### Variables
The `CancelRSVP` mutation requires an argument of type `CancelRsvpVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CancelRsvpVariables {
  eventId: UUIDString;
}
```
### Return Type
Recall that executing the `CancelRSVP` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CancelRsvpData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CancelRsvpData {
  eventRSVP_delete?: EventRSVP_Key | null;
}
```
### Using `CancelRSVP`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, cancelRsvp, CancelRsvpVariables } from '@dataconnect/generated';

// The `CancelRSVP` mutation requires an argument of type `CancelRsvpVariables`:
const cancelRsvpVars: CancelRsvpVariables = {
  eventId: ..., 
};

// Call the `cancelRsvp()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await cancelRsvp(cancelRsvpVars);
// Variables can be defined inline as well.
const { data } = await cancelRsvp({ eventId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await cancelRsvp(dataConnect, cancelRsvpVars);

console.log(data.eventRSVP_delete);

// Or, you can use the `Promise` API.
cancelRsvp(cancelRsvpVars).then((response) => {
  const data = response.data;
  console.log(data.eventRSVP_delete);
});
```

### Using `CancelRSVP`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, cancelRsvpRef, CancelRsvpVariables } from '@dataconnect/generated';

// The `CancelRSVP` mutation requires an argument of type `CancelRsvpVariables`:
const cancelRsvpVars: CancelRsvpVariables = {
  eventId: ..., 
};

// Call the `cancelRsvpRef()` function to get a reference to the mutation.
const ref = cancelRsvpRef(cancelRsvpVars);
// Variables can be defined inline as well.
const ref = cancelRsvpRef({ eventId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = cancelRsvpRef(dataConnect, cancelRsvpVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.eventRSVP_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.eventRSVP_delete);
});
```

## JoinGroup
You can execute the `JoinGroup` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
joinGroup(vars: JoinGroupVariables): MutationPromise<JoinGroupData, JoinGroupVariables>;

interface JoinGroupRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: JoinGroupVariables): MutationRef<JoinGroupData, JoinGroupVariables>;
}
export const joinGroupRef: JoinGroupRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
joinGroup(dc: DataConnect, vars: JoinGroupVariables): MutationPromise<JoinGroupData, JoinGroupVariables>;

interface JoinGroupRef {
  ...
  (dc: DataConnect, vars: JoinGroupVariables): MutationRef<JoinGroupData, JoinGroupVariables>;
}
export const joinGroupRef: JoinGroupRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the joinGroupRef:
```typescript
const name = joinGroupRef.operationName;
console.log(name);
```

### Variables
The `JoinGroup` mutation requires an argument of type `JoinGroupVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface JoinGroupVariables {
  groupId: UUIDString;
}
```
### Return Type
Recall that executing the `JoinGroup` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `JoinGroupData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface JoinGroupData {
  groupMember_insert: GroupMember_Key;
}
```
### Using `JoinGroup`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, joinGroup, JoinGroupVariables } from '@dataconnect/generated';

// The `JoinGroup` mutation requires an argument of type `JoinGroupVariables`:
const joinGroupVars: JoinGroupVariables = {
  groupId: ..., 
};

// Call the `joinGroup()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await joinGroup(joinGroupVars);
// Variables can be defined inline as well.
const { data } = await joinGroup({ groupId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await joinGroup(dataConnect, joinGroupVars);

console.log(data.groupMember_insert);

// Or, you can use the `Promise` API.
joinGroup(joinGroupVars).then((response) => {
  const data = response.data;
  console.log(data.groupMember_insert);
});
```

### Using `JoinGroup`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, joinGroupRef, JoinGroupVariables } from '@dataconnect/generated';

// The `JoinGroup` mutation requires an argument of type `JoinGroupVariables`:
const joinGroupVars: JoinGroupVariables = {
  groupId: ..., 
};

// Call the `joinGroupRef()` function to get a reference to the mutation.
const ref = joinGroupRef(joinGroupVars);
// Variables can be defined inline as well.
const ref = joinGroupRef({ groupId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = joinGroupRef(dataConnect, joinGroupVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.groupMember_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.groupMember_insert);
});
```

## LeaveGroup
You can execute the `LeaveGroup` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
leaveGroup(vars: LeaveGroupVariables): MutationPromise<LeaveGroupData, LeaveGroupVariables>;

interface LeaveGroupRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: LeaveGroupVariables): MutationRef<LeaveGroupData, LeaveGroupVariables>;
}
export const leaveGroupRef: LeaveGroupRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
leaveGroup(dc: DataConnect, vars: LeaveGroupVariables): MutationPromise<LeaveGroupData, LeaveGroupVariables>;

interface LeaveGroupRef {
  ...
  (dc: DataConnect, vars: LeaveGroupVariables): MutationRef<LeaveGroupData, LeaveGroupVariables>;
}
export const leaveGroupRef: LeaveGroupRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the leaveGroupRef:
```typescript
const name = leaveGroupRef.operationName;
console.log(name);
```

### Variables
The `LeaveGroup` mutation requires an argument of type `LeaveGroupVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface LeaveGroupVariables {
  groupId: UUIDString;
}
```
### Return Type
Recall that executing the `LeaveGroup` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `LeaveGroupData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface LeaveGroupData {
  groupMember_delete?: GroupMember_Key | null;
}
```
### Using `LeaveGroup`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, leaveGroup, LeaveGroupVariables } from '@dataconnect/generated';

// The `LeaveGroup` mutation requires an argument of type `LeaveGroupVariables`:
const leaveGroupVars: LeaveGroupVariables = {
  groupId: ..., 
};

// Call the `leaveGroup()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await leaveGroup(leaveGroupVars);
// Variables can be defined inline as well.
const { data } = await leaveGroup({ groupId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await leaveGroup(dataConnect, leaveGroupVars);

console.log(data.groupMember_delete);

// Or, you can use the `Promise` API.
leaveGroup(leaveGroupVars).then((response) => {
  const data = response.data;
  console.log(data.groupMember_delete);
});
```

### Using `LeaveGroup`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, leaveGroupRef, LeaveGroupVariables } from '@dataconnect/generated';

// The `LeaveGroup` mutation requires an argument of type `LeaveGroupVariables`:
const leaveGroupVars: LeaveGroupVariables = {
  groupId: ..., 
};

// Call the `leaveGroupRef()` function to get a reference to the mutation.
const ref = leaveGroupRef(leaveGroupVars);
// Variables can be defined inline as well.
const ref = leaveGroupRef({ groupId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = leaveGroupRef(dataConnect, leaveGroupVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.groupMember_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.groupMember_delete);
});
```

