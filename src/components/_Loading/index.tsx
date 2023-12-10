import { CircularProgress, Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'

export function LoadingWithoutPercent({ isOpenWithoutPercent, onCloseWithoutPercent }): JSX.Element {
    return (
        <Modal closeOnOverlayClick={false} isOpen={isOpenWithoutPercent} onClose={onCloseWithoutPercent}>
            <ModalOverlay />
            <ModalContent>
                <ModalBody>
                    <CircularProgress isIndeterminate={true} size='200px'>
                    </CircularProgress>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}