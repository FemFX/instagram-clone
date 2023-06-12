import { FC, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useAddCommentMutation } from "@/store/comment/comment.api";

interface AddCommentProps {
  postId: number;
}

const AddComment: FC<AddCommentProps> = ({ postId }) => {
  const [text, setText] = useState<string>("");
  const [addComment] = useAddCommentMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment({ postId, text });
    setText("");
  };

  return (
    <form className="flex mt-3" onSubmit={handleSubmit}>
      <textarea
        placeholder="add a comment..."
        className="w-3/4 border-b-[1px] border-b-gray-400 outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <Button type="submit" colorScheme="blue" className="w-1/4">
        Add
      </Button>
    </form>
  );
};

export default AddComment;
