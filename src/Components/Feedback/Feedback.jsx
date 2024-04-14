import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MyContext from "../Context";
import { Rating } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#FAF7FF",
  boxShadow: 24,
  borderRadius: "0.75rem",
  p: 4,
};

export default function BasicModal() {
  const {
    isFeedbackModalOpen,
    setIsFeedbackModalOpen,
    setChatHistory,
    currentConversation,
    setCurrentConversation,
  } = React.useContext(MyContext);

  const handleOpen = () => setIsFeedbackModalOpen(true);
  const handleClose = () => setIsFeedbackModalOpen(false);
  const [rating, setRating] = React.useState(5);
  const [feedback, setFeedback] = React.useState(null);

  return (
    <Modal
      open={isFeedbackModalOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        className="border-0 outline-0 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between border-0 items-center gap-10">
          <Typography
            className="font-[var(--font-secondary)] text-[22px] leading-[30px] text-black"
            variant="h6"
            component="h2"
          >
            Provide Additional Feedback
          </Typography>
        </div>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="bg-white mt-5 border-[1px] text-black px-2 py-2 text-[15px] outline-0 border-solid border-[#000000] rounded-[10px] h-[160px] w-[600px]"
          type="text"
        ></textarea>
        <Rating
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          name="filters"
          size="large"
          className="mt-4"
        />
        <div className="flex justify-end items-center mt-4 gap-4">
          <Button
            onClick={handleClose}
            variant="text"
            style={{ textTransform: "capitalize", fontSize: "16px" }}
            className="text-[#f31260!important] hover:bg-[inherit!important] hover:text-[maroon!important]"
          >
            Close
          </Button>
          <Button
            style={{ textTransform: "capitalize", fontSize: "16px" }}
            onClick={() => {
              setChatHistory((prevHistory) => {
                const updatedConversation = [...currentConversation];
                updatedConversation.push([
                  {
                    rating: rating,
                    feedback: feedback,
                  },
                ]);
                const newHistory = [...prevHistory, updatedConversation];
                return newHistory;
              });
              const timer = setTimeout(() => {
                setCurrentConversation([[]]);
                handleClose();
              }, 0);

              return () => clearTimeout(timer);
            }}
            variant="contained"
            className="bg-[purple!important] itemsToGetBackgroundEffect"
          >
            Submit
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
