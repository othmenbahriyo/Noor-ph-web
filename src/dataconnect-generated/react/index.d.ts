import { CreateUserData, CreateUserVariables, UpdateUserData, UpdateUserVariables, DeleteUserData, GetUserData, ListUsersData, CreateNeighborhoodData, CreateNeighborhoodVariables, UpdateNeighborhoodData, UpdateNeighborhoodVariables, DeleteNeighborhoodData, DeleteNeighborhoodVariables, GetNeighborhoodData, GetNeighborhoodVariables, ListNeighborhoodsData, CreatePostData, CreatePostVariables, UpdatePostData, UpdatePostVariables, DeletePostData, DeletePostVariables, GetPostData, GetPostVariables, ListPostsData, ListPostsVariables, CreateCommentData, CreateCommentVariables, UpdateCommentData, UpdateCommentVariables, DeleteCommentData, DeleteCommentVariables, ListCommentsData, ListCommentsVariables, CreateEventData, CreateEventVariables, UpdateEventData, UpdateEventVariables, DeleteEventData, DeleteEventVariables, ListEventsData, ListEventsVariables, CreateGroupData, CreateGroupVariables, UpdateGroupData, UpdateGroupVariables, DeleteGroupData, DeleteGroupVariables, ListGroupsData, ListGroupsVariables, RsvpEventData, RsvpEventVariables, CancelRsvpData, CancelRsvpVariables, JoinGroupData, JoinGroupVariables, LeaveGroupData, LeaveGroupVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useUpdateUser(options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables | void>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;
export function useUpdateUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserData, FirebaseError, UpdateUserVariables | void>): UseDataConnectMutationResult<UpdateUserData, UpdateUserVariables>;

export function useDeleteUser(options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;
export function useDeleteUser(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, void>): UseDataConnectMutationResult<DeleteUserData, undefined>;

export function useGetUser(options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, undefined>;
export function useGetUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, undefined>;

export function useListUsers(options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;
export function useListUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListUsersData>): UseDataConnectQueryResult<ListUsersData, undefined>;

export function useCreateNeighborhood(options?: useDataConnectMutationOptions<CreateNeighborhoodData, FirebaseError, CreateNeighborhoodVariables>): UseDataConnectMutationResult<CreateNeighborhoodData, CreateNeighborhoodVariables>;
export function useCreateNeighborhood(dc: DataConnect, options?: useDataConnectMutationOptions<CreateNeighborhoodData, FirebaseError, CreateNeighborhoodVariables>): UseDataConnectMutationResult<CreateNeighborhoodData, CreateNeighborhoodVariables>;

export function useUpdateNeighborhood(options?: useDataConnectMutationOptions<UpdateNeighborhoodData, FirebaseError, UpdateNeighborhoodVariables>): UseDataConnectMutationResult<UpdateNeighborhoodData, UpdateNeighborhoodVariables>;
export function useUpdateNeighborhood(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateNeighborhoodData, FirebaseError, UpdateNeighborhoodVariables>): UseDataConnectMutationResult<UpdateNeighborhoodData, UpdateNeighborhoodVariables>;

export function useDeleteNeighborhood(options?: useDataConnectMutationOptions<DeleteNeighborhoodData, FirebaseError, DeleteNeighborhoodVariables>): UseDataConnectMutationResult<DeleteNeighborhoodData, DeleteNeighborhoodVariables>;
export function useDeleteNeighborhood(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteNeighborhoodData, FirebaseError, DeleteNeighborhoodVariables>): UseDataConnectMutationResult<DeleteNeighborhoodData, DeleteNeighborhoodVariables>;

export function useGetNeighborhood(vars: GetNeighborhoodVariables, options?: useDataConnectQueryOptions<GetNeighborhoodData>): UseDataConnectQueryResult<GetNeighborhoodData, GetNeighborhoodVariables>;
export function useGetNeighborhood(dc: DataConnect, vars: GetNeighborhoodVariables, options?: useDataConnectQueryOptions<GetNeighborhoodData>): UseDataConnectQueryResult<GetNeighborhoodData, GetNeighborhoodVariables>;

export function useListNeighborhoods(options?: useDataConnectQueryOptions<ListNeighborhoodsData>): UseDataConnectQueryResult<ListNeighborhoodsData, undefined>;
export function useListNeighborhoods(dc: DataConnect, options?: useDataConnectQueryOptions<ListNeighborhoodsData>): UseDataConnectQueryResult<ListNeighborhoodsData, undefined>;

export function useCreatePost(options?: useDataConnectMutationOptions<CreatePostData, FirebaseError, CreatePostVariables>): UseDataConnectMutationResult<CreatePostData, CreatePostVariables>;
export function useCreatePost(dc: DataConnect, options?: useDataConnectMutationOptions<CreatePostData, FirebaseError, CreatePostVariables>): UseDataConnectMutationResult<CreatePostData, CreatePostVariables>;

export function useUpdatePost(options?: useDataConnectMutationOptions<UpdatePostData, FirebaseError, UpdatePostVariables>): UseDataConnectMutationResult<UpdatePostData, UpdatePostVariables>;
export function useUpdatePost(dc: DataConnect, options?: useDataConnectMutationOptions<UpdatePostData, FirebaseError, UpdatePostVariables>): UseDataConnectMutationResult<UpdatePostData, UpdatePostVariables>;

export function useDeletePost(options?: useDataConnectMutationOptions<DeletePostData, FirebaseError, DeletePostVariables>): UseDataConnectMutationResult<DeletePostData, DeletePostVariables>;
export function useDeletePost(dc: DataConnect, options?: useDataConnectMutationOptions<DeletePostData, FirebaseError, DeletePostVariables>): UseDataConnectMutationResult<DeletePostData, DeletePostVariables>;

export function useGetPost(vars: GetPostVariables, options?: useDataConnectQueryOptions<GetPostData>): UseDataConnectQueryResult<GetPostData, GetPostVariables>;
export function useGetPost(dc: DataConnect, vars: GetPostVariables, options?: useDataConnectQueryOptions<GetPostData>): UseDataConnectQueryResult<GetPostData, GetPostVariables>;

export function useListPosts(vars: ListPostsVariables, options?: useDataConnectQueryOptions<ListPostsData>): UseDataConnectQueryResult<ListPostsData, ListPostsVariables>;
export function useListPosts(dc: DataConnect, vars: ListPostsVariables, options?: useDataConnectQueryOptions<ListPostsData>): UseDataConnectQueryResult<ListPostsData, ListPostsVariables>;

export function useCreateComment(options?: useDataConnectMutationOptions<CreateCommentData, FirebaseError, CreateCommentVariables>): UseDataConnectMutationResult<CreateCommentData, CreateCommentVariables>;
export function useCreateComment(dc: DataConnect, options?: useDataConnectMutationOptions<CreateCommentData, FirebaseError, CreateCommentVariables>): UseDataConnectMutationResult<CreateCommentData, CreateCommentVariables>;

export function useUpdateComment(options?: useDataConnectMutationOptions<UpdateCommentData, FirebaseError, UpdateCommentVariables>): UseDataConnectMutationResult<UpdateCommentData, UpdateCommentVariables>;
export function useUpdateComment(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateCommentData, FirebaseError, UpdateCommentVariables>): UseDataConnectMutationResult<UpdateCommentData, UpdateCommentVariables>;

export function useDeleteComment(options?: useDataConnectMutationOptions<DeleteCommentData, FirebaseError, DeleteCommentVariables>): UseDataConnectMutationResult<DeleteCommentData, DeleteCommentVariables>;
export function useDeleteComment(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteCommentData, FirebaseError, DeleteCommentVariables>): UseDataConnectMutationResult<DeleteCommentData, DeleteCommentVariables>;

export function useListComments(vars: ListCommentsVariables, options?: useDataConnectQueryOptions<ListCommentsData>): UseDataConnectQueryResult<ListCommentsData, ListCommentsVariables>;
export function useListComments(dc: DataConnect, vars: ListCommentsVariables, options?: useDataConnectQueryOptions<ListCommentsData>): UseDataConnectQueryResult<ListCommentsData, ListCommentsVariables>;

export function useCreateEvent(options?: useDataConnectMutationOptions<CreateEventData, FirebaseError, CreateEventVariables>): UseDataConnectMutationResult<CreateEventData, CreateEventVariables>;
export function useCreateEvent(dc: DataConnect, options?: useDataConnectMutationOptions<CreateEventData, FirebaseError, CreateEventVariables>): UseDataConnectMutationResult<CreateEventData, CreateEventVariables>;

export function useUpdateEvent(options?: useDataConnectMutationOptions<UpdateEventData, FirebaseError, UpdateEventVariables>): UseDataConnectMutationResult<UpdateEventData, UpdateEventVariables>;
export function useUpdateEvent(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateEventData, FirebaseError, UpdateEventVariables>): UseDataConnectMutationResult<UpdateEventData, UpdateEventVariables>;

export function useDeleteEvent(options?: useDataConnectMutationOptions<DeleteEventData, FirebaseError, DeleteEventVariables>): UseDataConnectMutationResult<DeleteEventData, DeleteEventVariables>;
export function useDeleteEvent(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteEventData, FirebaseError, DeleteEventVariables>): UseDataConnectMutationResult<DeleteEventData, DeleteEventVariables>;

export function useListEvents(vars: ListEventsVariables, options?: useDataConnectQueryOptions<ListEventsData>): UseDataConnectQueryResult<ListEventsData, ListEventsVariables>;
export function useListEvents(dc: DataConnect, vars: ListEventsVariables, options?: useDataConnectQueryOptions<ListEventsData>): UseDataConnectQueryResult<ListEventsData, ListEventsVariables>;

export function useCreateGroup(options?: useDataConnectMutationOptions<CreateGroupData, FirebaseError, CreateGroupVariables>): UseDataConnectMutationResult<CreateGroupData, CreateGroupVariables>;
export function useCreateGroup(dc: DataConnect, options?: useDataConnectMutationOptions<CreateGroupData, FirebaseError, CreateGroupVariables>): UseDataConnectMutationResult<CreateGroupData, CreateGroupVariables>;

export function useUpdateGroup(options?: useDataConnectMutationOptions<UpdateGroupData, FirebaseError, UpdateGroupVariables>): UseDataConnectMutationResult<UpdateGroupData, UpdateGroupVariables>;
export function useUpdateGroup(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateGroupData, FirebaseError, UpdateGroupVariables>): UseDataConnectMutationResult<UpdateGroupData, UpdateGroupVariables>;

export function useDeleteGroup(options?: useDataConnectMutationOptions<DeleteGroupData, FirebaseError, DeleteGroupVariables>): UseDataConnectMutationResult<DeleteGroupData, DeleteGroupVariables>;
export function useDeleteGroup(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteGroupData, FirebaseError, DeleteGroupVariables>): UseDataConnectMutationResult<DeleteGroupData, DeleteGroupVariables>;

export function useListGroups(vars: ListGroupsVariables, options?: useDataConnectQueryOptions<ListGroupsData>): UseDataConnectQueryResult<ListGroupsData, ListGroupsVariables>;
export function useListGroups(dc: DataConnect, vars: ListGroupsVariables, options?: useDataConnectQueryOptions<ListGroupsData>): UseDataConnectQueryResult<ListGroupsData, ListGroupsVariables>;

export function useRsvpEvent(options?: useDataConnectMutationOptions<RsvpEventData, FirebaseError, RsvpEventVariables>): UseDataConnectMutationResult<RsvpEventData, RsvpEventVariables>;
export function useRsvpEvent(dc: DataConnect, options?: useDataConnectMutationOptions<RsvpEventData, FirebaseError, RsvpEventVariables>): UseDataConnectMutationResult<RsvpEventData, RsvpEventVariables>;

export function useCancelRsvp(options?: useDataConnectMutationOptions<CancelRsvpData, FirebaseError, CancelRsvpVariables>): UseDataConnectMutationResult<CancelRsvpData, CancelRsvpVariables>;
export function useCancelRsvp(dc: DataConnect, options?: useDataConnectMutationOptions<CancelRsvpData, FirebaseError, CancelRsvpVariables>): UseDataConnectMutationResult<CancelRsvpData, CancelRsvpVariables>;

export function useJoinGroup(options?: useDataConnectMutationOptions<JoinGroupData, FirebaseError, JoinGroupVariables>): UseDataConnectMutationResult<JoinGroupData, JoinGroupVariables>;
export function useJoinGroup(dc: DataConnect, options?: useDataConnectMutationOptions<JoinGroupData, FirebaseError, JoinGroupVariables>): UseDataConnectMutationResult<JoinGroupData, JoinGroupVariables>;

export function useLeaveGroup(options?: useDataConnectMutationOptions<LeaveGroupData, FirebaseError, LeaveGroupVariables>): UseDataConnectMutationResult<LeaveGroupData, LeaveGroupVariables>;
export function useLeaveGroup(dc: DataConnect, options?: useDataConnectMutationOptions<LeaveGroupData, FirebaseError, LeaveGroupVariables>): UseDataConnectMutationResult<LeaveGroupData, LeaveGroupVariables>;
