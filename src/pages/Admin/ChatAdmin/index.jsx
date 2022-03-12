import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Contact, Gap, Message } from "../../../components";
import { toast } from "react-toastify";

// MUI
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import RecentActorsIcon from "@mui/icons-material/RecentActors";

// import socket.io-client
import { io } from "socket.io-client";

let socket;
const ChatAdmin = () => {
  const title = "Admin Message";
  document.title = "DeweTour | " + title;

  const currentState = useSelector((state) => state);

  const [userOnline, setUserOnline] = useState([]);
  const [contact, setContact] = useState(null);
  const [contacts, setContacts] = useState([]);

  // set message
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:8080", {
      auth: {
        token: localStorage.getItem("token"),
      },
      query: {
        id: currentState.user.id,
      },
    });

    loadContact();
    loadConnectedUser();

    // notification
    if (
      messages.length > 0 &&
      messages[messages.length - 1]?.idSender !== currentState.user.id
    ) {
      if (!("Notification" in window)) {
        alert("Your website doesnt support notification");
      } else if (Notification.permission === "granted") {
        // if user accept notification
        const notification = new Notification(
          messages[messages.length - 1].message
        );
        // We need to ask the user for permission
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            const notification = new Notification(
              messages[messages.length - 1].message
            );
          }
        });
        // if user accept, lets create a notification
      }
    }

    // listen error sent from server
    socket.on("connect_error", (error) => {
      toast.error(error?.message || "Now authorized"); // not authorized
    });

    loadMessages();

    socket.on("new message", () => {
      socket.emit("load customer contacts");
      socket.emit("load messages", contact?.id);
    });

    return () => {
      socket.disconnect();
    };
  }, [messages]); // add message to dependency array to re-render when messages updated

  const loadContact = () => {
    // emit event to load admin contact
    socket.emit("load customer contacts");

    // listen event on get admin contact
    socket.on("customer contact", (data) => {
      let dataContacts = data.filter((item) => item.role !== "admin");

      dataContacts = dataContacts.map((item) => ({
        ...item,
        message:
          item.senderMessage.length > 0
            ? item.senderMessage[item.senderMessage.length - 1].message
            : "Click here to start message",
      }));

      setContacts([...dataContacts]);
    });
  };

  const loadConnectedUser = () => {
    // emit event to load data user when connected
    socket.emit("load user online");

    socket.on("user online", (data) => {
      setUserOnline((prev) => ({
        ...prev,
        ...data,
      }));
    });
  };

  const loadMessages = () => {
    socket.on("messages", (data) => {
      if (data.length !== messages.length) {
        if (data.length > 0) {
          const dataMessages = data.map((item) => ({
            idSender: item?.sender?.id,
            message: item?.message,
          }));
          setMessages(dataMessages);

          loadContact();
        }
      }

      //   smooth scroll
      const chatMessagesElm = document.getElementById("contentMessage");
      chatMessagesElm.scroll({
        top: chatMessagesElm.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    });
  };

  // set message
  const onClickContact = (data) => {
    setContact(data);
    socket.emit("load messages", data.id);
  };

  // handle when send message
  const onSendMessage = (e) => {
    if (e.key === "Enter") {
      const data = {
        idRecipient: contact?.id,
        message: e.target.value,
      };

      socket.emit("send messages", data);
      e.target.value = "";
    }
  };

  // MUI component
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div
      className="header-default"
      style={{ backgroundColor: "var(--bg-chat-theme)", overflow: "hidden" }}
    >
      <div className="hero"></div>
      {/* normal screen */}
      <div className="wrapper-chat">
        <div className="sidebar">
          <p className="title__sidebar">Contact</p>
          <Contact
            datacontact={contacts}
            clickcontact={onClickContact}
            contact={contact}
            useronline={userOnline}
          />
        </div>
        <div className="content-message" id="contentMessage">
          <Message
            contact={contact}
            user={currentState.user}
            messages={messages}
            sendmessage={onSendMessage}
          />
        </div>
      </div>

      {/* mobile screen */}
      <div className="wrapper-chat-mobile">
        <Gap height={20} />
        <div style={{ width: "90%", margin: "0 auto" }}>
          <Button variant="contained" onClick={() => setDrawerOpen(true)}>
            <RecentActorsIcon sx={{ marginRight: "10px" }} /> open contact
          </Button>
        </div>
        <Gap height={20} />
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box
            sx={{
              width: 300,
              height: "100%",
              backgroundColor: "var(--bg-chat-theme)",
            }}
            className="inner-chat-mobile"
          >
            <div className="sidebar">
              <p className="title__sidebar">Contact</p>
              <Contact
                datacontact={contacts}
                clickcontact={onClickContact}
                contact={contact}
                useronline={userOnline}
              />
            </div>
          </Box>
        </Drawer>
        <div className="content-message" id="contentMessage">
          <Message
            contact={contact}
            user={currentState.user}
            messages={messages}
            sendmessage={onSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatAdmin;
