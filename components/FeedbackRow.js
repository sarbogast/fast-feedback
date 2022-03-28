import {useAuth} from "@/lib/auth";
import {updateFeedback} from "@/lib/db";
import {mutate} from "swr";
import {Box, Code, Switch} from "@chakra-ui/core";
import {Td} from "@/components/Table";
import DeleteFeedbackButton from "@/components/DeleteFeedbackButton";

const FeedbackRow = ({id, author, text, route, status, onDelete}) => {
    const auth = useAuth();
    const isChecked = status === 'active';

    const toggleFeedback = async () => {
        await updateFeedback(id, {status: isChecked ? 'pending' : 'active'});
        mutate(['/api/feedback', auth.user.token])
    }

    return (
        <Box as="tr" key={id}>
            <Td fontWeight="medium">{author}</Td>
            <Td>{text}</Td>
            <Td>
                <Code>{route || '/'}</Code>
            </Td>
            <Td>
                <Switch color="green" onChange={toggleFeedback} isChecked={isChecked}/>
            </Td>
            <Td>
                <DeleteFeedbackButton feedbackId={id} onDeleted={onDelete}/>
            </Td>
        </Box>
    );
}

export default FeedbackRow;