import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CancelRsvpData {
  eventRSVP_delete?: EventRSVP_Key | null;
}

export interface CancelRsvpVariables {
  eventId: UUIDString;
}

export interface Comment_Key {
  id: UUIDString;
  __typename?: 'Comment_Key';
}

export interface CreateCommentData {
  comment_insert: Comment_Key;
}

export interface CreateCommentVariables {
  postId: UUIDString;
  text: string;
}

export interface CreateEventData {
  event_insert: Event_Key;
}

export interface CreateEventVariables {
  title: string;
  dateTime: TimestampString;
  location: string;
  neighborhoodId: UUIDString;
}

export interface CreateGroupData {
  group_insert: Group_Key;
}

export interface CreateGroupVariables {
  name: string;
  neighborhoodId: UUIDString;
}

export interface CreateNeighborhoodData {
  neighborhood_insert: Neighborhood_Key;
}

export interface CreateNeighborhoodVariables {
  name: string;
  zipCode: string;
}

export interface CreatePostData {
  post_insert: Post_Key;
}

export interface CreatePostVariables {
  neighborhoodId: UUIDString;
  content: string;
  type: string;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  email: string;
  displayName: string;
  address: string;
  neighborhoodId: UUIDString;
}

export interface DeleteCommentData {
  comment_delete?: Comment_Key | null;
}

export interface DeleteCommentVariables {
  id: UUIDString;
}

export interface DeleteEventData {
  event_delete?: Event_Key | null;
}

export interface DeleteEventVariables {
  id: UUIDString;
}

export interface DeleteGroupData {
  group_delete?: Group_Key | null;
}

export interface DeleteGroupVariables {
  id: UUIDString;
}

export interface DeleteNeighborhoodData {
  neighborhood_delete?: Neighborhood_Key | null;
}

export interface DeleteNeighborhoodVariables {
  id: UUIDString;
}

export interface DeletePostData {
  post_delete?: Post_Key | null;
}

export interface DeletePostVariables {
  id: UUIDString;
}

export interface DeleteUserData {
  user_delete?: User_Key | null;
}

export interface EventRSVP_Key {
  userId: UUIDString;
  eventId: UUIDString;
  __typename?: 'EventRSVP_Key';
}

export interface Event_Key {
  id: UUIDString;
  __typename?: 'Event_Key';
}

export interface GetNeighborhoodData {
  neighborhood?: {
    name: string;
    zipCode: string;
    description?: string | null;
  };
}

export interface GetNeighborhoodVariables {
  id: UUIDString;
}

export interface GetPostData {
  post?: {
    content: string;
    type: string;
    author: {
      displayName: string;
    };
  };
}

export interface GetPostVariables {
  id: UUIDString;
}

export interface GetUserData {
  user?: {
    email: string;
    displayName: string;
    address: string;
  };
}

export interface GroupMember_Key {
  userId: UUIDString;
  groupId: UUIDString;
  __typename?: 'GroupMember_Key';
}

export interface Group_Key {
  id: UUIDString;
  __typename?: 'Group_Key';
}

export interface JoinGroupData {
  groupMember_insert: GroupMember_Key;
}

export interface JoinGroupVariables {
  groupId: UUIDString;
}

export interface LeaveGroupData {
  groupMember_delete?: GroupMember_Key | null;
}

export interface LeaveGroupVariables {
  groupId: UUIDString;
}

export interface ListCommentsData {
  comments: ({
    text: string;
    author: {
      displayName: string;
    };
  })[];
}

export interface ListCommentsVariables {
  postId: UUIDString;
}

export interface ListEventsData {
  events: ({
    title: string;
    dateTime: TimestampString;
    location: string;
  })[];
}

export interface ListEventsVariables {
  neighborhoodId: UUIDString;
}

export interface ListGroupsData {
  groups: ({
    name: string;
    description?: string | null;
  })[];
}

export interface ListGroupsVariables {
  neighborhoodId: UUIDString;
}

export interface ListNeighborhoodsData {
  neighborhoods: ({
    name: string;
    zipCode: string;
  })[];
}

export interface ListPostsData {
  posts: ({
    content: string;
    createdAt?: TimestampString | null;
  })[];
}

export interface ListPostsVariables {
  neighborhoodId: UUIDString;
}

export interface ListUsersData {
  users: ({
    id: UUIDString;
    displayName: string;
    profilePictureUrl?: string | null;
  } & User_Key)[];
}

export interface Neighborhood_Key {
  id: UUIDString;
  __typename?: 'Neighborhood_Key';
}

export interface Post_Key {
  id: UUIDString;
  __typename?: 'Post_Key';
}

export interface RsvpEventData {
  eventRSVP_insert: EventRSVP_Key;
}

export interface RsvpEventVariables {
  eventId: UUIDString;
}

export interface UpdateCommentData {
  comment_update?: Comment_Key | null;
}

export interface UpdateCommentVariables {
  id: UUIDString;
  text: string;
}

export interface UpdateEventData {
  event_update?: Event_Key | null;
}

export interface UpdateEventVariables {
  id: UUIDString;
  maxAttendees?: number | null;
}

export interface UpdateGroupData {
  group_update?: Group_Key | null;
}

export interface UpdateGroupVariables {
  id: UUIDString;
  description?: string | null;
}

export interface UpdateNeighborhoodData {
  neighborhood_update?: Neighborhood_Key | null;
}

export interface UpdateNeighborhoodVariables {
  id: UUIDString;
  description?: string | null;
}

export interface UpdatePostData {
  post_update?: Post_Key | null;
}

export interface UpdatePostVariables {
  id: UUIDString;
  content?: string | null;
}

export interface UpdateUserData {
  user_update?: User_Key | null;
}

export interface UpdateUserVariables {
  displayName?: string | null;
  phoneNumber?: string | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface UpdateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  operationName: string;
}
export const updateUserRef: UpdateUserRef;

export function updateUser(vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;
export function updateUser(dc: DataConnect, vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface DeleteUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
  operationName: string;
}
export const deleteUserRef: DeleteUserRef;

export function deleteUser(): MutationPromise<DeleteUserData, undefined>;
export function deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface GetUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetUserData, undefined>;
  operationName: string;
}
export const getUserRef: GetUserRef;

export function getUser(options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;
export function getUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface ListUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
  operationName: string;
}
export const listUsersRef: ListUsersRef;

export function listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface CreateNeighborhoodRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNeighborhoodVariables): MutationRef<CreateNeighborhoodData, CreateNeighborhoodVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNeighborhoodVariables): MutationRef<CreateNeighborhoodData, CreateNeighborhoodVariables>;
  operationName: string;
}
export const createNeighborhoodRef: CreateNeighborhoodRef;

export function createNeighborhood(vars: CreateNeighborhoodVariables): MutationPromise<CreateNeighborhoodData, CreateNeighborhoodVariables>;
export function createNeighborhood(dc: DataConnect, vars: CreateNeighborhoodVariables): MutationPromise<CreateNeighborhoodData, CreateNeighborhoodVariables>;

interface UpdateNeighborhoodRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateNeighborhoodVariables): MutationRef<UpdateNeighborhoodData, UpdateNeighborhoodVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateNeighborhoodVariables): MutationRef<UpdateNeighborhoodData, UpdateNeighborhoodVariables>;
  operationName: string;
}
export const updateNeighborhoodRef: UpdateNeighborhoodRef;

export function updateNeighborhood(vars: UpdateNeighborhoodVariables): MutationPromise<UpdateNeighborhoodData, UpdateNeighborhoodVariables>;
export function updateNeighborhood(dc: DataConnect, vars: UpdateNeighborhoodVariables): MutationPromise<UpdateNeighborhoodData, UpdateNeighborhoodVariables>;

interface DeleteNeighborhoodRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteNeighborhoodVariables): MutationRef<DeleteNeighborhoodData, DeleteNeighborhoodVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteNeighborhoodVariables): MutationRef<DeleteNeighborhoodData, DeleteNeighborhoodVariables>;
  operationName: string;
}
export const deleteNeighborhoodRef: DeleteNeighborhoodRef;

export function deleteNeighborhood(vars: DeleteNeighborhoodVariables): MutationPromise<DeleteNeighborhoodData, DeleteNeighborhoodVariables>;
export function deleteNeighborhood(dc: DataConnect, vars: DeleteNeighborhoodVariables): MutationPromise<DeleteNeighborhoodData, DeleteNeighborhoodVariables>;

interface GetNeighborhoodRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetNeighborhoodVariables): QueryRef<GetNeighborhoodData, GetNeighborhoodVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetNeighborhoodVariables): QueryRef<GetNeighborhoodData, GetNeighborhoodVariables>;
  operationName: string;
}
export const getNeighborhoodRef: GetNeighborhoodRef;

export function getNeighborhood(vars: GetNeighborhoodVariables, options?: ExecuteQueryOptions): QueryPromise<GetNeighborhoodData, GetNeighborhoodVariables>;
export function getNeighborhood(dc: DataConnect, vars: GetNeighborhoodVariables, options?: ExecuteQueryOptions): QueryPromise<GetNeighborhoodData, GetNeighborhoodVariables>;

interface ListNeighborhoodsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListNeighborhoodsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListNeighborhoodsData, undefined>;
  operationName: string;
}
export const listNeighborhoodsRef: ListNeighborhoodsRef;

export function listNeighborhoods(options?: ExecuteQueryOptions): QueryPromise<ListNeighborhoodsData, undefined>;
export function listNeighborhoods(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListNeighborhoodsData, undefined>;

interface CreatePostRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePostVariables): MutationRef<CreatePostData, CreatePostVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreatePostVariables): MutationRef<CreatePostData, CreatePostVariables>;
  operationName: string;
}
export const createPostRef: CreatePostRef;

export function createPost(vars: CreatePostVariables): MutationPromise<CreatePostData, CreatePostVariables>;
export function createPost(dc: DataConnect, vars: CreatePostVariables): MutationPromise<CreatePostData, CreatePostVariables>;

interface UpdatePostRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePostVariables): MutationRef<UpdatePostData, UpdatePostVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdatePostVariables): MutationRef<UpdatePostData, UpdatePostVariables>;
  operationName: string;
}
export const updatePostRef: UpdatePostRef;

export function updatePost(vars: UpdatePostVariables): MutationPromise<UpdatePostData, UpdatePostVariables>;
export function updatePost(dc: DataConnect, vars: UpdatePostVariables): MutationPromise<UpdatePostData, UpdatePostVariables>;

interface DeletePostRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeletePostVariables): MutationRef<DeletePostData, DeletePostVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeletePostVariables): MutationRef<DeletePostData, DeletePostVariables>;
  operationName: string;
}
export const deletePostRef: DeletePostRef;

export function deletePost(vars: DeletePostVariables): MutationPromise<DeletePostData, DeletePostVariables>;
export function deletePost(dc: DataConnect, vars: DeletePostVariables): MutationPromise<DeletePostData, DeletePostVariables>;

interface GetPostRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPostVariables): QueryRef<GetPostData, GetPostVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPostVariables): QueryRef<GetPostData, GetPostVariables>;
  operationName: string;
}
export const getPostRef: GetPostRef;

export function getPost(vars: GetPostVariables, options?: ExecuteQueryOptions): QueryPromise<GetPostData, GetPostVariables>;
export function getPost(dc: DataConnect, vars: GetPostVariables, options?: ExecuteQueryOptions): QueryPromise<GetPostData, GetPostVariables>;

interface ListPostsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListPostsVariables): QueryRef<ListPostsData, ListPostsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListPostsVariables): QueryRef<ListPostsData, ListPostsVariables>;
  operationName: string;
}
export const listPostsRef: ListPostsRef;

export function listPosts(vars: ListPostsVariables, options?: ExecuteQueryOptions): QueryPromise<ListPostsData, ListPostsVariables>;
export function listPosts(dc: DataConnect, vars: ListPostsVariables, options?: ExecuteQueryOptions): QueryPromise<ListPostsData, ListPostsVariables>;

interface CreateCommentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCommentVariables): MutationRef<CreateCommentData, CreateCommentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCommentVariables): MutationRef<CreateCommentData, CreateCommentVariables>;
  operationName: string;
}
export const createCommentRef: CreateCommentRef;

export function createComment(vars: CreateCommentVariables): MutationPromise<CreateCommentData, CreateCommentVariables>;
export function createComment(dc: DataConnect, vars: CreateCommentVariables): MutationPromise<CreateCommentData, CreateCommentVariables>;

interface UpdateCommentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCommentVariables): MutationRef<UpdateCommentData, UpdateCommentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateCommentVariables): MutationRef<UpdateCommentData, UpdateCommentVariables>;
  operationName: string;
}
export const updateCommentRef: UpdateCommentRef;

export function updateComment(vars: UpdateCommentVariables): MutationPromise<UpdateCommentData, UpdateCommentVariables>;
export function updateComment(dc: DataConnect, vars: UpdateCommentVariables): MutationPromise<UpdateCommentData, UpdateCommentVariables>;

interface DeleteCommentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCommentVariables): MutationRef<DeleteCommentData, DeleteCommentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteCommentVariables): MutationRef<DeleteCommentData, DeleteCommentVariables>;
  operationName: string;
}
export const deleteCommentRef: DeleteCommentRef;

export function deleteComment(vars: DeleteCommentVariables): MutationPromise<DeleteCommentData, DeleteCommentVariables>;
export function deleteComment(dc: DataConnect, vars: DeleteCommentVariables): MutationPromise<DeleteCommentData, DeleteCommentVariables>;

interface ListCommentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListCommentsVariables): QueryRef<ListCommentsData, ListCommentsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListCommentsVariables): QueryRef<ListCommentsData, ListCommentsVariables>;
  operationName: string;
}
export const listCommentsRef: ListCommentsRef;

export function listComments(vars: ListCommentsVariables, options?: ExecuteQueryOptions): QueryPromise<ListCommentsData, ListCommentsVariables>;
export function listComments(dc: DataConnect, vars: ListCommentsVariables, options?: ExecuteQueryOptions): QueryPromise<ListCommentsData, ListCommentsVariables>;

interface CreateEventRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateEventVariables): MutationRef<CreateEventData, CreateEventVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateEventVariables): MutationRef<CreateEventData, CreateEventVariables>;
  operationName: string;
}
export const createEventRef: CreateEventRef;

export function createEvent(vars: CreateEventVariables): MutationPromise<CreateEventData, CreateEventVariables>;
export function createEvent(dc: DataConnect, vars: CreateEventVariables): MutationPromise<CreateEventData, CreateEventVariables>;

interface UpdateEventRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateEventVariables): MutationRef<UpdateEventData, UpdateEventVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateEventVariables): MutationRef<UpdateEventData, UpdateEventVariables>;
  operationName: string;
}
export const updateEventRef: UpdateEventRef;

export function updateEvent(vars: UpdateEventVariables): MutationPromise<UpdateEventData, UpdateEventVariables>;
export function updateEvent(dc: DataConnect, vars: UpdateEventVariables): MutationPromise<UpdateEventData, UpdateEventVariables>;

interface DeleteEventRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteEventVariables): MutationRef<DeleteEventData, DeleteEventVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteEventVariables): MutationRef<DeleteEventData, DeleteEventVariables>;
  operationName: string;
}
export const deleteEventRef: DeleteEventRef;

export function deleteEvent(vars: DeleteEventVariables): MutationPromise<DeleteEventData, DeleteEventVariables>;
export function deleteEvent(dc: DataConnect, vars: DeleteEventVariables): MutationPromise<DeleteEventData, DeleteEventVariables>;

interface ListEventsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListEventsVariables): QueryRef<ListEventsData, ListEventsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListEventsVariables): QueryRef<ListEventsData, ListEventsVariables>;
  operationName: string;
}
export const listEventsRef: ListEventsRef;

export function listEvents(vars: ListEventsVariables, options?: ExecuteQueryOptions): QueryPromise<ListEventsData, ListEventsVariables>;
export function listEvents(dc: DataConnect, vars: ListEventsVariables, options?: ExecuteQueryOptions): QueryPromise<ListEventsData, ListEventsVariables>;

interface CreateGroupRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateGroupVariables): MutationRef<CreateGroupData, CreateGroupVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateGroupVariables): MutationRef<CreateGroupData, CreateGroupVariables>;
  operationName: string;
}
export const createGroupRef: CreateGroupRef;

export function createGroup(vars: CreateGroupVariables): MutationPromise<CreateGroupData, CreateGroupVariables>;
export function createGroup(dc: DataConnect, vars: CreateGroupVariables): MutationPromise<CreateGroupData, CreateGroupVariables>;

interface UpdateGroupRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateGroupVariables): MutationRef<UpdateGroupData, UpdateGroupVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateGroupVariables): MutationRef<UpdateGroupData, UpdateGroupVariables>;
  operationName: string;
}
export const updateGroupRef: UpdateGroupRef;

export function updateGroup(vars: UpdateGroupVariables): MutationPromise<UpdateGroupData, UpdateGroupVariables>;
export function updateGroup(dc: DataConnect, vars: UpdateGroupVariables): MutationPromise<UpdateGroupData, UpdateGroupVariables>;

interface DeleteGroupRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteGroupVariables): MutationRef<DeleteGroupData, DeleteGroupVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteGroupVariables): MutationRef<DeleteGroupData, DeleteGroupVariables>;
  operationName: string;
}
export const deleteGroupRef: DeleteGroupRef;

export function deleteGroup(vars: DeleteGroupVariables): MutationPromise<DeleteGroupData, DeleteGroupVariables>;
export function deleteGroup(dc: DataConnect, vars: DeleteGroupVariables): MutationPromise<DeleteGroupData, DeleteGroupVariables>;

interface ListGroupsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListGroupsVariables): QueryRef<ListGroupsData, ListGroupsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListGroupsVariables): QueryRef<ListGroupsData, ListGroupsVariables>;
  operationName: string;
}
export const listGroupsRef: ListGroupsRef;

export function listGroups(vars: ListGroupsVariables, options?: ExecuteQueryOptions): QueryPromise<ListGroupsData, ListGroupsVariables>;
export function listGroups(dc: DataConnect, vars: ListGroupsVariables, options?: ExecuteQueryOptions): QueryPromise<ListGroupsData, ListGroupsVariables>;

interface RsvpEventRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RsvpEventVariables): MutationRef<RsvpEventData, RsvpEventVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RsvpEventVariables): MutationRef<RsvpEventData, RsvpEventVariables>;
  operationName: string;
}
export const rsvpEventRef: RsvpEventRef;

export function rsvpEvent(vars: RsvpEventVariables): MutationPromise<RsvpEventData, RsvpEventVariables>;
export function rsvpEvent(dc: DataConnect, vars: RsvpEventVariables): MutationPromise<RsvpEventData, RsvpEventVariables>;

interface CancelRsvpRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CancelRsvpVariables): MutationRef<CancelRsvpData, CancelRsvpVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CancelRsvpVariables): MutationRef<CancelRsvpData, CancelRsvpVariables>;
  operationName: string;
}
export const cancelRsvpRef: CancelRsvpRef;

export function cancelRsvp(vars: CancelRsvpVariables): MutationPromise<CancelRsvpData, CancelRsvpVariables>;
export function cancelRsvp(dc: DataConnect, vars: CancelRsvpVariables): MutationPromise<CancelRsvpData, CancelRsvpVariables>;

interface JoinGroupRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: JoinGroupVariables): MutationRef<JoinGroupData, JoinGroupVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: JoinGroupVariables): MutationRef<JoinGroupData, JoinGroupVariables>;
  operationName: string;
}
export const joinGroupRef: JoinGroupRef;

export function joinGroup(vars: JoinGroupVariables): MutationPromise<JoinGroupData, JoinGroupVariables>;
export function joinGroup(dc: DataConnect, vars: JoinGroupVariables): MutationPromise<JoinGroupData, JoinGroupVariables>;

interface LeaveGroupRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: LeaveGroupVariables): MutationRef<LeaveGroupData, LeaveGroupVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: LeaveGroupVariables): MutationRef<LeaveGroupData, LeaveGroupVariables>;
  operationName: string;
}
export const leaveGroupRef: LeaveGroupRef;

export function leaveGroup(vars: LeaveGroupVariables): MutationPromise<LeaveGroupData, LeaveGroupVariables>;
export function leaveGroup(dc: DataConnect, vars: LeaveGroupVariables): MutationPromise<LeaveGroupData, LeaveGroupVariables>;

