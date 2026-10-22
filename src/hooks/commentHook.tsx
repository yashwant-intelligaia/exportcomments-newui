"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useContext } from "react";

import { APP_CONSTANT, TIME_ZONE } from "../constants/AppConstant";
import { ToasterContext, UserContext } from "../contexts";
import {
    AddOrDeleteReactionRequestType,
    CommentDataType,
    CommentReactionResponseType,
    CommentResponseDataType,
    CommentRowType,
    IDeleteRequestType,
    IReplyRequestType,
    PageType,
    ProcessedReactionType,
} from "../types";
import { api, messages } from "../utils";
import { get } from "../utils/object";
import { useQueryWithSettled } from "./queryUtils";

const COMMENTS = "comments";

axios.defaults.baseURL = APP_CONSTANT.baseUrl;

const useFetchComments = (projectId?: number, branchKey?: string) => {
    const { showToast } = useContext(ToasterContext);
    const { token } = UserContext();
    return useQueryWithSettled<CommentResponseDataType, AxiosError>(
        {
            queryKey: [COMMENTS, projectId, branchKey],
            queryFn: async () => {
                const payload: { projectId?: number; branchKey?: string } = {
                    projectId,
                };
                if (branchKey) {
                    payload.branchKey = branchKey;
                }
                const { data } = await api({
                    url: `${APP_CONSTANT.webApi.comments}`,
                    method: "POST",
                    version: "v2",
                    data: payload,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return get(data, "data", {}) as CommentResponseDataType;
            },
            retry: 3,
            retryDelay: 3,
            staleTime: Infinity,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            enabled: !!projectId,
        },
        (data, error) => {
            if (error) {
                const message = get(error, "response.data.message", messages.SOMETHING_WENT_WRONG);
                showToast({ message, severity: "error" });
            }
        },
    );
};

const callDeleteApi =
    (token: string) =>
    (body: IDeleteRequestType): any =>
        api({
            version: "v2",
            url: APP_CONSTANT.webApi.delete,
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                Timezone: TIME_ZONE,
            },
            data: body,
        });

const useDeleteComment = () => {
    const { token } = UserContext();
    const { showToast } = useContext(ToasterContext);
    return useMutation({
        mutationFn: callDeleteApi(token),
        onSettled: (response: AxiosResponse | undefined, error: AxiosError | null): any | null | AxiosError => {
            if (response) {
                showToast({ message: response?.data?.message });
                return response;
            }
            if (error) {
                showToast({ message: (error as any)?.response?.data?.message, severity: "error" });
                return error;
            }
            return null;
        },
    });
};

const useReactionMutation = () => {
    const { token, user } = UserContext();
    const { showToast } = useContext(ToasterContext);
    const queryClient = useQueryClient();

    const getReaction = useMutation({
        mutationFn: (reactionDetails: any) =>
            api({
                version: "v2",
                url: APP_CONSTANT.webApi.getReaction,
                method: "POST",
                data: {
                    projectId: reactionDetails.projectId,
                    commentId: reactionDetails.commentId,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                    Timezone: TIME_ZONE,
                },
            }),
        onSettled: (response: any, error: any) => {
            if (error) {
                const message = get(error, "response.data.message", messages.SOMETHING_WENT_WRONG);
                showToast({ message, severity: "error" });
                return error;
            }

            showToast({ message: response?.data?.message });
            return response;
        },
    });

    const addReaction = useMutation({
        mutationFn: (payload: AddOrDeleteReactionRequestType) =>
            api({
                version: "v2",
                url: APP_CONSTANT.webApi.addReaction,
                method: "POST",
                data: payload,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Timezone: TIME_ZONE,
                },
            }),
        onSettled: async (response, error, variables) => {
            if (error) {
                const message = get(error, "response.data.message", messages.SOMETHING_WENT_WRONG);
                showToast({ message, severity: "error" });
                return error;
            }
            const { projectId, commentId, emoji } = variables;
            const queryName = [COMMENTS, projectId];
            await queryClient.cancelQueries({ queryKey: queryName });
            const previousData = await queryClient.getQueryData(queryName);
            const comments = get(previousData, "data.comments.comments.comments", []);
            comments.forEach((comment: any) => {
                if (comment.id === commentId) {
                    comment.reactions = [
                        ...comment.reactions,
                        {
                            emoji,
                            createdAt: new Date().toISOString(),
                            user: {
                                id: user.figmaUserId,
                                handle: user.name,
                                imgUrl: user.avatar,
                            },
                        },
                    ];
                }
            });
            queryClient.invalidateQueries({ queryKey: [COMMENTS] });
            return response;
        },
    });

    const deleteReaction = useMutation({
        mutationFn: (payload: AddOrDeleteReactionRequestType) =>
            api({
                version: "v2",
                url: APP_CONSTANT.webApi.deleteReaction,
                method: "POST",
                data: payload,
                headers: {
                    Authorization: `Bearer ${token}`,
                    Timezone: TIME_ZONE,
                },
            }),
        onSettled: async (response, error, variables) => {
            if (error) {
                const message = get(error, "response.data.message", messages.SOMETHING_WENT_WRONG);
                showToast({ message, severity: "error" });
                return error;
            }
            const { projectId, commentId, emoji } = variables;
            const queryName = [COMMENTS, projectId];
            await queryClient.cancelQueries({ queryKey: queryName });
            const previousData = await queryClient.getQueryData(queryName);
            const comments = get(previousData, "data.comments.comments.comments", []);
            comments.forEach((comment: any) => {
                if (comment.id === commentId) {
                    comment.reactions = comment.reactions.filter(
                        (reaction: {
                            user: {
                                id: string;
                                handle: string;
                                imgUrl: string;
                            };
                            emoji: string;
                            createdAt: string;
                        }) => reaction.emoji !== emoji,
                    );
                }
            });
            queryClient.invalidateQueries({ queryKey: [COMMENTS] });
            return response;
        },
    });
    return { getReaction, addReaction, deleteReaction };
};

const useCommentMutation = () => {
    const { token } = UserContext();
    const { showToast } = useContext(ToasterContext);
    const queryClient = useQueryClient();

    const replyComment = useMutation({
        mutationFn: async (formData: IReplyRequestType) => {
            const { data } = await api({
                version: "v2",
                url: APP_CONSTANT.webApi.reply,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: formData,
            });
            return get(data, "data", {});
        },
        onError: (error: AxiosError) => {
            const message = get(error, "response.data.message", messages.SOMETHING_WENT_WRONG);
            showToast({ message, severity: "error" });
        },
        onSuccess: (_, payload) => {
            queryClient.refetchQueries({ queryKey: [COMMENTS, payload.projectId, payload.branchKey] });
            showToast({ message: "Reply posted Successfully" });
        },
    });

    const markAsRead = useMutation({
        mutationFn: async (formData: { projectId: number; branchKey: string }) => {
            const { data } = await api({
                version: "v2",
                url: APP_CONSTANT.webApi.markAsRead,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: formData,
            });
            return get(data, "data", {});
        },
        onError: (error: AxiosError) => {
            const message = get(error, "response.data.message", messages.SOMETHING_WENT_WRONG);
            showToast({ message, severity: "error" });
        },
        onSuccess: (_, { projectId, branchKey }) => {
            queryClient.invalidateQueries({ queryKey: [COMMENTS, projectId, branchKey] });
            showToast({ message: "Comments marked as read" });
        },
    });

    return { replyComment, markAsRead };
};

const useProcessCommentReactions = (reactions: CommentReactionResponseType[]) => {
    const processedReactions: ProcessedReactionType[] = [];
    reactions.forEach(({ emoji, user, createdAt }) => {
        if (!emoji) return;
        const emojiName = emoji.replace(/:/g, "");
        const existingReaction = processedReactions.find((reaction) => reaction.emoji === emojiName);

        if (existingReaction) {
            existingReaction.users.push({ ...user, createdAt });
        } else {
            const newReaction: ProcessedReactionType = {
                emoji: emojiName,
                users: [{ ...user, createdAt }],
            };
            processedReactions.push(newReaction);
        }
    });
    processedReactions.forEach((reaction) => {
        reaction.users.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    });

    return processedReactions;
};

// Hook function to process pages and comments data and retrieve comments count for each page and flow
const processPageAndPrototypeComments = ({
    comments = [],
    pages = [],
}: {
    comments: CommentDataType[];
    pages: PageType[];
}) => {
    // Create a map to hold comments for each nodeId
    const nodeCommentsMap = new Map();
    comments.forEach((comment) => {
        const { clientMeta } = comment;
        if (clientMeta) {
            const { nodeId } = clientMeta;
            if (nodeCommentsMap.has(nodeId)) {
                nodeCommentsMap.get(nodeId).push(comment);
            } else {
                nodeCommentsMap.set(nodeId, [comment]);
            }
        }
    });

    // Update the pages and flows with the actual comments
    const updatedPages = pages.map((page) => {
        if (page.node_id) {
            page.comments = nodeCommentsMap.get(page.node_id) || [];
        } else {
            page.comments = [];
        }

        const updatedFlows = page.flows.map((flow) => {
            if (flow.node_id) {
                flow.comments = nodeCommentsMap.get(flow.node_id) || [];
            } else {
                flow.comments = [];
            }
            return flow;
        });

        page.flows = updatedFlows;
        return page;
    });
    return updatedPages;
};

const processfilteredComments = (searchKey: string, data: CommentRowType[]) => {
    const comments: CommentRowType[] = data.filter(
        (comment) =>
            comment.message.toLowerCase().includes(searchKey.toLowerCase()) ||
            (comment.userName && comment.userName.toLowerCase().includes(searchKey.toLowerCase())),
    );

    return comments;
};

export {
    COMMENTS,
    processfilteredComments,
    processPageAndPrototypeComments,
    useCommentMutation,
    useDeleteComment,
    useFetchComments,
    useProcessCommentReactions,
    useReactionMutation,
};
