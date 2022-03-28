import React from "react";
import {Box, Divider, Heading, Text} from "@chakra-ui/core";
import {format, parseISO} from "date-fns";
import {useAuth} from "@/lib/auth";
import DeleteFeedbackButton from "@/components/DeleteFeedbackButton";

const Feedback = ({id, author, authorId, text, createdAt, onDelete}) => {
    const {user} = useAuth();
    return (
        <Box borderRadius={4} maxWidth="700px" w="full">
            <Heading size="sm" as="h3" mb={0} color="gray.900" fontWeight="medium">
                {user && user.uid === authorId && <DeleteFeedbackButton feedbackId={id} onDeleted={onDelete}/>}
                {author}
            </Heading>
            <Text color="gray.500" mb={4} fontSize="xs">
                {format(parseISO(createdAt), 'PPpp')}
            </Text>
            <Text color="gray.800">{text}</Text>
            <Divider borderColor="gray.200" backgroundColor="gray.200" mt={8} mb={8}/>
        </Box>
    )
};

export default Feedback;