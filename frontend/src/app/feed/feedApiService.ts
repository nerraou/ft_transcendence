import { useMutation, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import baseQuery, { RequestError } from "@utils/baseQuery";
import { FullPostData } from "./page";

/**
 * Fetches posts from the API based on the specified page number and token.
 * @param page - The page number of the posts to fetch.
 * @param token - The authentication token used for authorization.
 * @returns An object containing the fetched posts and the next page number, if available.
 */
async function fetchPosts(page: number, token: string | unknown) {
  const limit = 10;
  const url =
    process.env.NEXT_PUBLIC_API_BASE_URL + `/posts?limit=${limit}&page=${page}`;

  const res = await baseQuery(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  let nextPage: number | null = page + 1;
  const response = await res.json();
  if (response.posts?.length == 0) {
    nextPage = null;
  }
  return { ...response, nextPage: nextPage };
}

/**
 * Validates the content and image size of a post.
 * @param content - The content of the post.
 * @param image - The image file attached to the post (optional).
 * @returns An object indicating whether there is an error and the corresponding error message.
 */
const PostValidation = (content: string, image: File | undefined) => {
  if (content.length > 500) {
    return {
      error: true,
      message: "Content should not be more than 500 characters",
    };
  } else if (image && image.size > 2 * 1024 * 1024) {
    return {
      error: true,
      message: "Image should not be more than 2MB",
    };
  } else if (content.length === 0 && !image) {
    return {
      error: true,
      message: "Post should have content or image",
    };
  } else {
    return {
      error: false,
      message: "",
    };
  }
};

/**
 * Posts a new post to the server.
 * @param {string} content - The content of the post.
 * @param {string} image - The image associated with the post.
 * @param {string | unknown} token - The authentication token.
 * @returns {Promise<any>} - A promise that resolves to the server response.
 */
async function postPost(
  content: string,
  image: File | undefined,
  token: string | unknown,
) {
  const { error, message } = PostValidation(content, image);
  if (error) {
    throw new Error(message);
  }
  const formData = new FormData();
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/posts";
  if (image) {
    formData.append("image", image || "");
  }
  if (content) {
    formData.append("content", content);
  }
  const res = await baseQuery(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const response = await res.json();
  return response;
}

export interface CreatePostResponse {
  id: number;
  content: string | null;
  imagePath: string | null;
  createdAt: string;
}

export function useCreatePost(
  token: string | unknown,
  onError: (error: string) => void,
  onSuccess: (response: CreatePostResponse) => void,
) {
  return useMutation<
    CreatePostResponse,
    RequestError,
    { content: string; image: File | undefined }
  >({
    mutationFn: ({ content, image }) => postPost(content, image, token),
    onError: (response) => {
      onError(response?.message || "Something went wrong");
    },
    onSuccess: (response) => onSuccess(response as CreatePostResponse),
  });
}

/**
 * Like a post.
 * @param id - The ID of the post to like.
 * @param token - The user's authentication token.
 * @returns A Promise that resolves to the result of the like operation.
 */
async function likePost(id: number, token: string | unknown) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `/posts/like/${id}`;
  return await baseQuery(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
}

/**
 * Custom hook for liking a post.
 *
 * @param token - The user token.
 * @param onError - Callback function to handle error.
 * @returns A mutation object with the likePost function.
 */
export function useLikePost(token: string | unknown, onError: () => void) {
  return useMutation<Response, RequestError, number>({
    mutationFn: (id) => likePost(id, token),
    onError: () => onError(),
  });
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function fetchRanking(token: string | unknown) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/users/ranking";

  const res = await baseQuery(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const response = await res.json();
  return response;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function fetchCommunities(token: string | unknown) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/channels";

  const res = await baseQuery(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const response = await res.json();
  return response;
}

interface UserProps {
  count: number;
  posts: FullPostData[];
  nextPage: number;
}

export function useFeedQuery(token: string | unknown) {
  const {
    data: postPages,
    isFetchingNextPage: isFetchingPostsNextPage,
    fetchNextPage: fetchNextPagePosts,
    hasNextPage,
  } = useSuspenseInfiniteQuery<UserProps>({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => {
      return fetchPosts(pageParam as number, token);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.nextPage === null) {
        return null;
      }
      return pages.length + 1;
    },
  });
  return {
    postPages,
    isFetchingPostsNextPage,
    fetchNextPagePosts,
    hasNextPage,
  };
}

export { postPost, likePost, fetchRanking, fetchCommunities };
