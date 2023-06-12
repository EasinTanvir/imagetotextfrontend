import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import MicIcon from "@mui/icons-material/Mic";
import { useDispatch } from "react-redux";
import { Voice_Detector } from "../store/actions";

function Modals({ show, handleClose, handleShow }) {
  const dispatch = useDispatch();
  const [recognizedText, setRecognizedText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const newRecognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      newRecognition.interimResults = true;
      newRecognition.addEventListener("result", handleRecognitionResult);
      newRecognition.addEventListener("end", handleRecognitionEnd);
      setRecognition(newRecognition);
    } else {
      console.log("Speech recognition is not supported in this browser.");
    }

    return () => {
      if (recognition) {
        recognition.removeEventListener("result", handleRecognitionResult);
        recognition.removeEventListener("end", handleRecognitionEnd);
        recognition.stop();
      }
    };
  }, []);

  const handleRecognitionResult = (event) => {
    const recognizedText = Array.from(event.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    setRecognizedText(recognizedText);
  };

  const handleRecognitionEnd = () => {
    setIsListening(false);
    handleClose();
    recognition?.stop();
  };

  const handleStartRecognition = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
      setRecognizedText("");
    }
  };

  const handleStopRecognition = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  useEffect(() => {
    dispatch(Voice_Detector(recognizedText));
  }, [recognizedText]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Voice Detector</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Button
              variant="primary"
              onClick={handleStartRecognition}
              disabled={isListening}
            >
              <span>
                <MicIcon />
              </span>
              <span className="ms-1">Start Recognition</span>
            </Button>
            <Button
              className="ms-3"
              variant="danger"
              onClick={handleStopRecognition}
              disabled={!isListening}
            >
              Stop Recognition
            </Button>
            {isListening && <p className="mt-2">Listening... </p>}
            {recognizedText && (
              <div className="mt-3">
                <h4 className="fw-bold text-primary">Detected Voice</h4>
                <p>{recognizedText}</p>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modals;
