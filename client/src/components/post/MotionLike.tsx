import { motion } from "framer-motion";
import { forwardRef } from "react";
import { AiFillHeart } from "react-icons/ai";

const ExoticLike = forwardRef(function ExoticAiFillHeartWrapper(props, ref) {
  return <AiFillHeart {...props} />; // ❌  this is not forwarded
});
export const MotionLike = motion(ExoticLike);
