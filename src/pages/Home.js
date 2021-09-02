/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router';
import Titlebar from '../components/titlebar';
import Welcome from '../components/welcome';
import { database } from '../state/database';
import { getUserInfo } from '../state/user.slice';
import ScrollToBottom from 'react-scroll-to-bottom';
import useUserStatus from '../hooks/userStatus';
import Message from '../components/message';

export default function HomePage() {
  let userInfo = useSelector(getUserInfo);
  let [messages, setMessages] = useState([]);
  let [message, setMessage] = useState('');

  useEffect(() => {
    let userStatus = database.get(userInfo.username).get('status');

    database
      .get('messages')
      .map()
      .once((data, _) => {
        if (data)
          setMessages((old) => [
            ...old,
            { username: data.username, content: data.content },
          ]);
      });

    userStatus.put('online');
    window.onbeforeunload = () => {
      userStatus.put('offline');
      return null;
    };
    return () => {};
  }, []);

  return (
    <div className="flex flex-col bg-black rounded-lg w-full h-full">
      <Titlebar title="Lone Wolf" />

      <div className="flex w-full h-full overflow-y-hidden">
        <div className="flex flex-col flex-grow flex flex-col w-1/3 lg:w-1/5">
          <ScrollToBottom className="flex flex-col flex-1 overflow-auto">
            {messages.map(({ content, username }) => (
              <Message username={username} content={content} />
            ))}
          </ScrollToBottom>
          <div className="flex flex-2 w-full p-2 space-x-2">
            <input
              className="flex justify-start items-center shadow rounded-md bg-gray-800 px-2 py-2 focus:outline-none placeholder-gray-500 text-blue-600 w-full"
              type="text"
              placeholder="Type a message."
              value={message}
              onChange={(evt) => setMessage(evt.target.value)}
              onKeyDown={(evt) => {
                if (evt.key.toLowerCase() === 'enter') {
                  database
                    .get('messages')
                    .set({ content: message, username: userInfo.username });
                  setMessage('');
                }
              }}
            />
            <div
              className="flex justify-center items-center p-2 rounded-full bg-blue-600 cursor-pointer"
              onClick={() => {
                database
                  .get('messages')
                  .set({ content: message, username: userInfo.username });

                setMessage('');
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 transform rotate-90"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-2/3 lg:w-4/5 h-full bg-gray-800 rounded-tl-xl">
          <Route path="/" exact component={() => <Welcome />} />
        </div>
      </div>
    </div>
  );
}
