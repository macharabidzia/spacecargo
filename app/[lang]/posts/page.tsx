import { getQueryClient } from '@/lib/queryClient';
import PostsContainer from '@/components/PostsContainer';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import { productService } from '@/features/products/service';

const Posts = () => { 
    const queryClient = getQueryClient();
    queryClient.prefetchQuery({
        queryKey: ["posts", "list"], 
        queryFn: () => productService.getPosts(), 
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<div>Loading Posts...</div>}>
                <PostsContainer />
            </Suspense>
        </HydrationBoundary>
    );
};

export default Posts;
