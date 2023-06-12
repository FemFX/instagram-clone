import { FC, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useCreatePostMutation } from "@/store/post/post.api";
import Image from "next/image";

export interface IModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  title: string;
}

const ModalComponent: FC<IModalProps> = ({
  isOpen,
  onClose,
  onOpen,
  title,
}) => {
  const [createPost] = useCreatePostMutation();

  const [files, setFiles] = useState<File[]>([]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(e.target.files!));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach((file, i) => formData.append(`file-${i}`, file));
    createPost(formData);
    setFiles([]);
    onClose();
  };

  return (
    <Modal
      size={"5xl"}
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader w={"full"} bg={"#fff"} zIndex={1} textAlign={"center"}>
          <div className="text-black">{title}</div>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form className="py-44 flex justify-center" onSubmit={handleSubmit}>
            <input type="file" multiple onChange={handleFileInputChange} />

            {files.map((file, i) => (
              <Image
                key={i}
                src={URL.createObjectURL(file)}
                className="-z-1"
                // style={{ width: "100%", height: "auto" }}
                layout="fill"
              />
            ))}
          </form>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              setFiles([]);
              onClose();
            }}
          >
            Закрыть
          </Button>
          <Button
            textAlign={"right"}
            type="submit"
            onClick={handleSubmit}
          >
            Загрузить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
