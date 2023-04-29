import { atom, selector } from "recoil";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDoc,
  addDoc,
  deleteDoc,
  setDoc,
  doc,
  collection,
} from "firebase/firestore";
import { postsCollection, db } from "../fireBase";

export const postsState = atom({
  key: "postsState",
  default: [],
});

export const getPosts = selector({
  key: "getPosts",
  get: async ({ get }) => {
    const posts = get(postsState);

    if (posts.length > 0) {
      return posts;
    }

    const querySnapshot = await postsCollection.get();

    const newPosts = [];
    querySnapshot.forEach((doc) => {
      newPosts.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    return newPosts;
  },
});

export const useAddPost = () => {
  const queryClient = useQueryClient();

  const addPostMutation = useMutation(async (newPost) => {
    await addDoc(collection(db, "posts"), newPost);
    queryClient.invalidateQueries("posts");
  });
  return addPostMutation;
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  const deletePostMutation = useMutation(async (postId) => {
    await deleteDoc(doc(db, "posts", postId));
    queryClient.invalidateQueries("posts");
  });
  return deletePostMutation;
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const updatePostMutation = useMutation(
    async ({ postId, newPostContent }) => {
      const postRef = doc(db, "posts", postId);
      const snapshot = await getDoc(postRef);
      if (!snapshot.exists) {
        throw new Error("No Such Document!");
      }
      const updatedPost = { ...snapshot.data(), ...newPostContent };
      await setDoc(postRef, updatedPost);
      return { postId, ...updatedPost };
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["posts", data.postId], data);
      },
    }
  );
  return updatePostMutation.mutateAsync;
};

export const usePostsQuery = () => {
  return useQuery("posts", () => getPosts());
};
