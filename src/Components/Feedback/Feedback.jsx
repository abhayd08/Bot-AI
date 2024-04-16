import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MyContext from "../Context";
import { Rating } from "@mui/material";
import { TbBulbFilled } from "react-icons/tb";
import { enqueueSnackbar } from "notistack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "0.75rem",
  p: 2.5,
};

export default function BasicModal() {
  const {
    isFeedbackModalOpen,
    setIsFeedbackModalOpen,
    setChatHistory,
    currentConversation,
    setCurrentConversation,
    setQuestion,
  } = React.useContext(MyContext);

  const handleClose = () => setIsFeedbackModalOpen(false);
  const [rating, setRating] = React.useState(4);
  const [feedback, setFeedback] = React.useState("");

  return (
    <Modal
      open={isFeedbackModalOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        className="border-0 outline-0 max-h-[90vh] max-w-[94vw] overflow-y-auto"
      >
        <div className="flex border-0 items-center gap-3">
          <TbBulbFilled className="w-12 text-[#0095ff] h-12" />
          <Typography
            className="text-[22px] font-[700!important] leading-[30px] text-[#2aa8ff]"
            variant="h6"
            component="h2"
          >
            Provide Additional Feedback
          </Typography>
        </div>
        <textarea
          value={feedback}
          placeholder="Please provide a detailed review."
          onChange={(e) => setFeedback(e.target.value)}
          className="bg-white mt-5 border-[1px] text-black px-2 py-2 text-[15px] outline-0 border-solid border-[#2aa8ff] rounded-[10px] h-[160px] max-w-[100%] w-[600px]"
          type="text"
        ></textarea>
        <br />
        <Rating
          value={Number(rating)}
          onChange={(e) => setRating(e.target.value)}
          className="mt-4"
        />
        <div className="flex justify-end items-center mt-10 gap-2">
          <Button
            onClick={handleClose}
            variant="text"
            style={{
              textTransform: "capitalize",
              fontSize: "16px",
              borderRadius: "10px",
            }}
            className="text-[#f31260!important] active:scale-[0.97] itemsToGetHoverEffect"
          >
            Close
          </Button>
          <Button
            style={{
              textTransform: "capitalize",
              fontSize: "16px",
              background: "#2aa8ff",
              borderRadius: "10px",
              paddingLeft: "1.5rem",
              paddingRight: "1.5rem",
            }}
            onClick={() => {
              if (currentConversation[0].length > 0) {
                setChatHistory((prevHistory) => {
                  const updatedConversation = [...currentConversation];
                  updatedConversation.push([
                    {
                      rating: rating,
                      feedback: feedback,
                      date: new Date(),
                    },
                  ]);
                  const newHistory = [updatedConversation, ...prevHistory];
                  return newHistory;
                });

                const timer = setTimeout(() => {
                  setCurrentConversation([[]]);
                  setQuestion("");
                  handleClose();
                }, 0);

                return () => clearTimeout(timer);
              } else {
                enqueueSnackbar("Initiate a conversation first.", {
                  variant: "info",
                });
              }
            }}
            variant="contained"
            className="font-[600!important] active:scale-[0.97] itemsToGetBackgroundEffect"
          >
            Submit
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
