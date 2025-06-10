// components/PostsContainer.tsx
'use client';

import React from 'react';
import PostSkeleton from './PostSkeleton';
import { useGetPosts } from '@/features/posts/hooks/useGetPosts'; // Ensure this path is correct

interface Post {
    id: number;
    title: string;
    body?: string;
}

const PostsContainer = () => {
    // placeholderPosts are primarily for data structure, their styling is handled by PostSkeleton
    const placeholderPosts: Post[] = Array.from({ length: 5 }).map((_, index) => ({
        id: index + 1,
        title: `Loading post title ${index + 1}`,
        body: `Loading post body content ${index + 1}...`,
    }));

    const {
        data: posts,
        isFetching,
        isError,
        error
    } = useGetPosts();

    if (isError) {
        return (
            <div className="flex justify-center items-center h-40">
                <p className="text-lg text-red-500">Error loading posts: {error?.message || 'An unknown error occurred'}</p>
            </div>
        );
    }

    if (!isFetching && (!posts || posts.length === 0)) {
        return (
            <div className="flex justify-center items-center h-40">
                <p className="text-lg text-gray-500">No posts found.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Posts</h1>

            {/* This div seems like a test/example block.
                Update its colors to be theme-aware. */}
            <div className="bg-background text-foreground p-4 rounded-lg shadow-md border border-border mb-4">
                <h2 className="text-xl font-semibold text-primary mb-2">"This is a test post title"</h2>
                <p className="text-sm leading-relaxed">This is some example content for the test post body. It demonstrates how the theme colors are applied.</p>
                <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90">
                    Example Button
                </button>
            </div>
            <button className="bg-blue-500 dark:bg-purple-700">
                My Button
            </button>
            <div className="bg-background text-foreground"></div>
            <ul className="space-y-2">
                {/* When fetching and no actual posts yet, show skeletons.
                    Ensure PostSkeleton also uses theme-aware classes. */}
                {isFetching && (!posts || posts.length === 0)
                    ? placeholderPosts.map((_, index) => <PostSkeleton key={index} />)
                    : posts?.map((post: Post) => ( // Use 'Post' interface directly
                        <li
                            key={post.id}
                            // Replace bg-white, text-gray-800, text-gray-700 with theme-aware classes
                            className="bg-background text-foreground p-3 rounded shadow-sm border border-border"
                        >
                            <h2 className="text-xl font-semibold text-primary">{post.title}</h2>
                            {post.body && <p className="text-sm mt-1">{post.body.substring(0, 100)}...</p>}
                        </li>
                    ))}
            </ul>
            {isFetching && posts && posts.length > 0 && (
                <div className="text-center text-sm text-gray-500 mt-4">
                    Updating posts...
                </div>
            )}
        </div>
    );
};

export default PostsContainer;
