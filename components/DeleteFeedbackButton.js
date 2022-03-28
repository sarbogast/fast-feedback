import {useRef, useState} from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay, Button,
    IconButton
} from "@chakra-ui/core";
import {deleteFeedback} from "@/lib/db";
import {useAuth} from "@/lib/auth";
import {mutate} from "swr";

const DeleteFeedbackButton = ({feedbackId, onDeleted}) => {
    const [isOpen, setIsOpen] = useState(false);
    const cancelRef = useRef();
    const auth = useAuth();

    const onClose = () => setIsOpen(false);
    const onDelete = () => {
        deleteFeedback(feedbackId);
        mutate(
            ['/api/feedback', auth.user.token],
            async (data) => {
                return {
                    feedback: data?.feedback.filter((feedback) => feedback.id !== feedbackId) || []
                }
            },
            false
        );
        onDeleted(feedbackId);
        onClose();
    }

    return (
        <>
            <IconButton
                aria-label="Delete feedback"
                icon="delete"
                variant="ghost"
                onClick={() => setIsOpen(true)}
                />
            <AlertDialog
                leastDestructiveRef={cancelRef}
                isOpen={isOpen}
                onClose={onClose}
                >
                <AlertDialogOverlay/>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Feedback
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        Are you sure? You can‘t undo this action afterwards.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button fontWeight="bold"
                                variantColor="red"
                                onClick={onDelete}
                                ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default DeleteFeedbackButton;
