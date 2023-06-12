import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Form } from "react-bootstrap";
import MicIcon from "@mui/icons-material/Mic";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import onImageHandlers from "../components/ImageUploader";
import axios from "axios";
import FileLoader from "../components/FileLoader";
import { Comment } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import Modals from "../components/VoiceModals";
const ChatPage = () => {
  const scrollRef = useRef();
  const { text } = useSelector((state) => state.voice);
  const imageRef = useRef();
  const [show, setShow] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [userId, setUserId] = useState(null);
  const [value, setValue] = useState("");
  const [gpt, setGpt] = useState("");
  const [store, setStore] = useState([]);
  const [msgLoader, setMessageLoader] = useState(false);
  const [fullLoader, setFullLoader] = useState(false);
  const [imageToTextLoader, setImageToTextLoader] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const image = await onImageHandlers(file, setImageToTextLoader);
    setImageUrl(image);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const sendData = {
      userId: userId,
      message: value,
    };
    setValue("");
    setStore([...store, { user: value }, { gpt: "" }]);

    try {
      setMessageLoader(true);
      const { data } = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/api/gpt/create",
        sendData
      );

      const databaseData = {
        user: value,
        gpt: data.message,
        userId: userId,
      };

      try {
        await axios.post(
          process.env.REACT_APP_SERVER_URL + "/api/gpt/message",
          databaseData
        );
      } catch (err) {
        console.log(err);
      }

      setGpt(data.message);
      setMessageLoader(false);
    } catch (err) {
      console.log(err);
      setMessageLoader(false);
    }
  };

  const onImageHandler = () => {
    imageRef.current.click();
  };

  useEffect(() => {
    setValue(text);
  }, [text]);

  useEffect(() => {
    if (imageUrl) {
      setImageToTextLoader(false);
      setMessageLoader(true);

      const fetchData = async () => {
        try {
          // this is for the vision api
          const sendData = {
            userId: userId,
            image: imageUrl,
          };
          const { data } = await axios.post(
            process.env.REACT_APP_SERVER_URL + "/api/gpt/create",
            sendData
          );

          const databaseData = {
            user: "",
            gpt: data.message,
            userId: userId,
          };

          try {
            await axios.post(
              process.env.REACT_APP_SERVER_URL + "/api/gpt/message",
              databaseData
            );
          } catch (err) {
            console.log(err);
          }
          setGpt(data.message);
          setMessageLoader(false);
        } catch (err) {
          console.log(err);

          setMessageLoader(false);
        }
      };
      fetchData();
    }
  }, [imageUrl]);

  useEffect(() => {
    setStore([...store, { user: "" }, { gpt: gpt }]);
  }, [gpt]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFullLoader(true);

        const { data } = await axios.get(
          process.env.REACT_APP_SERVER_URL + `/api/gpt/${userId}`
        );
        setStore(data);
        setFullLoader(false);
      } catch (err) {
        console.log(err);
        setFullLoader(false);
      }
    };
    setTimeout(() => {
      fetchData();
    }, 300);
  }, [userId]);

  useEffect(() => {
    const easin = localStorage.getItem("userId")
      ? JSON.parse(localStorage.getItem("userId"))
      : null;
    if (!easin) {
      localStorage.setItem("userId", JSON.stringify(uuidv4()));
    }

    setTimeout(() => {
      console.log("i am first");
      const data = localStorage.getItem("userId")
        ? JSON.parse(localStorage.getItem("userId"))
        : null;
      setUserId(data);
    }, 200);
  }, [userId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [store, msgLoader]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className="chatbox">
      {imageToTextLoader || fullLoader ? (
        <>
          {imageToTextLoader ? (
            <FileLoader text={true} />
          ) : (
            <FileLoader text={false} />
          )}
        </>
      ) : (
        <>
          <div className="message-container">
            <>
              <div className="message receiver">
                <img alt="" className="user mt-2" src="/assets/gpt.png" />
                <div className="content">
                  <p className="gpt-msg">Hello there! How can I help?</p>
                </div>
              </div>
            </>

            {store.map((item) => (
              <div key={item._id} ref={scrollRef}>
                {item.user && (
                  <div className="message sender">
                    <div className="content">{item.user}</div>
                    <img alt="" className="user mt-2" src="/assets/user1.png" />
                  </div>
                )}

                {item.gpt && (
                  <div className="message receiver">
                    <img alt="" className="user mt-2" src="/assets/gpt.png" />
                    <div className="content">
                      <p className="gpt-msg">{item.gpt}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {msgLoader && (
              <div className="message2  receiver2">
                <img alt="" className="user mt-1" src="/assets/gpt.png" />
                <div className="content">
                  <Comment
                    visible={true}
                    height="55"
                    width="60"
                    ariaLabel="comment-loading"
                    wrapperStyle={{}}
                    wrapperClass="comment-wrapper"
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}

      <Form onSubmit={onSubmitHandler} className="input-container d-flex gap-2">
        <Form.Control
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="p-2"
          placeholder="Type your message"
          required
        />
        <Button
          disabled={fullLoader || imageToTextLoader || msgLoader}
          type="submit"
        >
          Send
        </Button>
        <Button
          type="button"
          onClick={handleShow}
          style={{
            background: "transparent",
            color: "black",
            border: "none",
          }}
        >
          <MicIcon />
        </Button>
        <Button
          style={{
            background: "transparent",
            color: "black",
            border: "none",
          }}
        >
          <input
            ref={imageRef}
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageUpload}
          />
          <AttachFileIcon onClick={onImageHandler} />
        </Button>
      </Form>
      <Modals show={show} handleClose={handleClose} handleShow={handleShow} />
    </div>
  );
};

export default ChatPage;
