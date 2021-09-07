/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { database } from '../../state/database';

export default function UserProfilePage({ publicKey }) {
  let [userInfo, setUserInfo] = useState({});

  let [name, setName] = useState('');
  let [isEditingName, setIsEditingName] = useState(false);

  let [about, setAbout] = useState('');
  let [isEditingAbout, setIsEditingAbout] = useState(false);

  useEffect(() => {
    database.user(publicKey).on((data, key) => {
      setUserInfo(data);
    });

    return () => {};
  }, []);

  useEffect(() => {
    if (userInfo.name) setName(userInfo.name);
    if (userInfo.about) setAbout(userInfo.about);
  }, [userInfo]);

  let changeName = () => {
    database.user(publicKey).get('name').put(name);
  };

  let changeAbout = () => {
    database.user(publicKey).get('about').put(about);
  };

  return (
    <>
      <div className="flex flex-none justify-center items-center w-60 h-60 bg-black rounded-full"></div>
      <div className="flex flex-col w-72 space-y-2 h-auto shadow p-3">
        <div className="text-blue-600">Your Name</div>
        <div className="flex items-center w-full">
          <input
            className="py-1 bg-gray-800 w-full focus:outline-none disabled"
            placeholder="Type your name."
            disabled={!isEditingName}
            value={name}
            onChange={({ target: { value } }) => setName(value)}
          />
          <div
            className="flex justify-center items-center w-10 h-10 text-gray-400 hover:text-blue-600"
            onClick={() => {
              setIsEditingName(!isEditingName);

              if (isEditingName) changeName();
            }}
          >
            {isEditingName ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            )}
          </div>
        </div>
        <div className="text-gray-400 text-xs">
          This is not your username, this name will be visible to your friends.
        </div>
      </div>
      <div className="flex flex-col w-72 space-y-2 h-auto shadow p-3">
        <div className="text-blue-600">Your About</div>
        <div className="flex items-center w-full">
          <input
            className="py-1 bg-gray-800 w-full focus:outline-none disabled"
            placeholder="Type your about."
            disabled={!isEditingAbout}
            value={about}
            onChange={({ target: { value } }) => setAbout(value)}
          />
          <div
            className="flex justify-center items-center w-10 h-10 text-gray-400 hover:text-blue-600"
            onClick={() => {
              setIsEditingAbout(!isEditingAbout);

              if (isEditingAbout) changeAbout();
            }}
          >
            {isEditingAbout ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
