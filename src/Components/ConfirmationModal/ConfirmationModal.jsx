import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MyContext from "../Context";

export default function BasicModal() {
  const {
    setIsFeedbackModalOpen,
    setCurrentConversation,
    isConfirmationModalOpen,
    setIsConfirmationModalOpen,
    setQuestion,
    isDarkModeChecked,
  } = React.useContext(MyContext);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: isDarkModeChecked ? "rgb(17, 24, 39)" : "white",
    boxShadow: 24,
    borderRadius: "0.75rem",
    p: 2.5,
  };

  const handleClose = () => setIsConfirmationModalOpen(false);

  return (
    <Modal open={isConfirmationModalOpen} aria-labelledby="confirmation-modal">
      <Box
        sx={style}
        className="border-0 outline-0 max-h-[90vh] w-[550px] max-w-[94vw] overflow-y-auto"
      >
        <div className="flex border-0 items-center gap-5">
          <Typography
            className="font-[var(--font-secondary)] text-[22px] leading-[30px]"
            variant="h6"
            component="h2"
          >
            Would you like to save the{" "}
            <span className="text-[#28a5ff] font-medium">
              {" "}
              current conversation
            </span>
            ?
          </Typography>
        </div>
        <div className="flex justify-end items-center mt-10 gap-0.5">
          <Button
            onClick={() => {
              setCurrentConversation([[]]);
              setQuestion("");
              handleClose();
            }}
            variant="text"
            style={{
              textTransform: "capitalize",
              fontSize: "16px",
              borderRadius: "10px",
            }}
            className="text-[#f31260!important] hover:bg-[inherit!important] transition-all"
          >
            No
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
              handleClose();
              setIsFeedbackModalOpen(true);
            }}
            variant="contained"
            className="font-[600!important] active:scale-[0.98] itemsToGetBackgroundEffect"
          >
            Yes
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
