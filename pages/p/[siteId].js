import {useRouter} from 'next/router';
import {Box, Button, FormControl, FormLabel, Input} from '@chakra-ui/core';
import {getAllFeedback, getAllSites} from '@/lib/db-admin';
import {useAuth} from '@/lib/auth';
import Feedback from "@/components/Feedback";
import {useEffect, useRef, useState} from "react";
import {createFeedback} from "@/lib/db";
import DeleteFeedbackButton from "@/components/DeleteFeedbackButton";
import FeedbackRow from "@/components/FeedbackRow";

export async function getStaticProps(context) {
    const siteId = context.params.siteId;
    const {feedback} = await getAllFeedback(siteId);

    return {
        props: {
            initialFeedback: feedback,
        },
        revalidate: 1,
    }
}

export async function getStaticPaths() {
    const {sites} = await getAllSites();
    const paths = sites.map((site) => ({
        params: {
            siteId: site.id.toString(),
        }
    }));

    return {
        paths,
        fallback: true,
    }
}

const FeedbackPage = ({initialFeedback}) => {
    const auth = useAuth();
    const router = useRouter();
    const inputEl = useRef(null);
    const [allFeedback, setAllFeedback] = useState([]);

    useEffect(() => {
        setAllFeedback(initialFeedback);
    }, [initialFeedback]);

    const onSubmit = (e) => {
        e.preventDefault();

        const newFeedback = {
            author: auth.user.name,
            authorId: auth.user.uid,
            siteId: router.query.siteId,
            text: inputEl.current.value,
            createdAt: new Date().toISOString(),
            provider: auth.user.provider,
            status: 'pending',
        }

        inputEl.current.value = '';
        setAllFeedback((currentFeedback) => [newFeedback, ...currentFeedback]);
        createFeedback(newFeedback);
    }

    const onDeleteFeedback = (feedbackId) => {
        setAllFeedback((currentFeedback) => currentFeedback.filter((feedback) => feedback.id !== feedbackId));
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            width="full"
            maxWidth="700px"
            margin="0 auto"
            >
            {auth.user && (
                <Box as="form" onSubmit={onSubmit}>
                    <FormControl my={8}>
                        <FormLabel htmlFor="comment">Comment</FormLabel>
                        <Input ref={inputEl} id="comment" placeholder="Leave a comment" />
                        <Button mt={4} type="submit" fontWeight="medium">
                            Add Comment
                        </Button>
                    </FormControl>
                </Box>
            )}
            {allFeedback && allFeedback.map((feedback) => (
                <Feedback key={feedback.id || new Date().getTime().toString()} {...feedback} onDelete={onDeleteFeedback}/>
            ))}
        </Box>
    );
}

export default FeedbackPage;