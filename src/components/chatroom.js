import React, { useEffect, useRef, useState } from "react";
import "./chatroom.css";
import Message from "./message.js";
import translateText from "./translate";
import translateTextAPI from "./translateAPI";
import { addChat, useGlobalState } from "../store/state";

const Chatroom = (props) => {
  const [Chats] = useGlobalState("Chats");
  const currentContactId = useGlobalState("currentContactId");
  const [newMessage, setNewMessage] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [languageTranslate] = useGlobalState("languageTranslate");
  const [languageOptions] = useGlobalState("languageOptions");
  const [dropdowndata, setDropdowndata] = useState([]);
  const [loading, setLoading] = useState(false);
  const agentUsername = "AGENT";
  const messageEl = useRef(null);
  const input = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const sendMessage = async (session, content) => {
    const awsSdkResponse = await session.sendMessage({
      contentType: "text/plain",
      message: content,
    });
    const { AbsoluteTime, Id } = awsSdkResponse.data;
  };

  const handleChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  useEffect(() => {
    // Automatically set the language when currentContactId changes
    const selectedLang = languageTranslate.find(
      (o) => o.contactId === currentContactId[0]
    );
    if (selectedLang) {
      setSelectedLanguage(selectedLang.lang);
    } else {
      setSelectedLanguage("en"); // Default to English if no match is found
    }
  }, [currentContactId, languageTranslate]);

  useEffect(() => {
    // Ensure the chat window auto-scrolls to the most recent message
    if (messageEl?.current) {
      const listener = (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      };
      messageEl.current.addEventListener("DOMNodeInserted", listener);
      return () => {
        messageEl.current.removeEventListener("DOMNodeInserted", listener);
      };
    }
  }, []);

  async function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();
    if (newMessage === "") {
      setLoading(false);
      return;
    }

    const destLang = languageTranslate.find(
      (o) => o.contactId === currentContactId[0]
    );
    let translatedMessageAPI = await translateTextAPI(
      newMessage,
      "en",
      selectedLanguage,
      ["connectChatTranslate"]
    );
    let translatedMessage = translatedMessageAPI.TranslatedText;

    let data2 = {
      contactId: currentContactId[0],
      username: agentUsername,
      content: <p>{newMessage}</p>,
      translatedMessage: <p>{translatedMessage}</p>,
    };

    addChat((prevMsg) => [...prevMsg, data2]);
    setNewMessage("");

    const session = retrieveValue(currentContactId[0]);

    function retrieveValue(key) {
      var value = "";
      for (var obj in props.session) {
        for (var item in props.session[obj]) {
          if (item === key) {
            value = props.session[obj][item];
            break;
          }
        }
      }
      return value;
    }

    setLoading(false);
    sendMessage(session, translatedMessage);
  }

  const handleChange2 = (e) => {
    setTimeout(() => {
      setSelectedValue(e.target.value);
      const urlq = `https://betqoq75b6.execute-api.us-east-1.amazonaws.com/production/softphoneqna?category=${e.target.value}`;
      const headers = new Headers();
      headers.append("x-api-key", "AzP1YtY7VF24pdQPqgbhNaeMi2vbrzWk9H25mS9C");
      const request = new Request(urlq, {
        method: "GET",
        headers: headers,
      });

      fetch(request)
        .then((response) => response.json())
        .then((json) => setNewMessage(json.items.reply))
        .catch((error) => console.error(error));
    }, 2000);
  };

  useEffect(() => {
    const apiKey = "AzP1YtY7VF24pdQPqgbhNaeMi2vbrzWk9H25mS9C";
    const headers = new Headers();
    headers.append("x-api-key", apiKey);
    const url =
      "https://betqoq75b6.execute-api.us-east-1.amazonaws.com/production/qna";
    const request = new Request(url, {
      method: "GET",
      headers: headers,
    });

    fetch(request)
      .then((response) => response.json())
      .then((json) => setDropdowndata(json.msg.Items))
      .catch((error) => console.error(error));
  }, []);

  const valueData = dropdowndata.map((element) => element.category);

  return (
    <>
      <div className="chatroom">
        <h3>
          <select
            id="language-select"
            value={selectedLanguage}
            onChange={handleChange}
          >
            <option value="en">English</option>
            {languageOptions.map(({ code, name }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
          Translation - (
          {languageTranslate.map((lang) => {
            if (lang.contactId === currentContactId[0]) return lang.lang;
          })}
          )
        </h3>
        <ul className="chats" ref={messageEl}>
          {Chats.map((chat) => {
            if (chat.contactId === currentContactId[0])
              return <Message chat={chat} user={agentUsername} />;
          })}
        </ul>
        <form className="input" onSubmit={handleSubmit}>
          <textarea
            rows="2"
            cols="25"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <datalist id="suggestions">
            {valueData.sort().map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </datalist>
          <input
            autoComplete="on"
            list="suggestions"
            placeholder="select"
            onChange={(e) => handleChange2(e)}
          />
          <input type="submit" value={loading ? "Loading..." : "Submit"} />
        </form>
      </div>
    </>
  );
};

export default Chatroom;
