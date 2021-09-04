import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import { database, user } from '../../state/database';

export default function AllFriendsPage() {
  let [friends, setFriends] = useState([]);

  useEffect(() => {
    database
      .user(user.is.pub)
      .get('friends')
      .map()
      .once((data, _) => {
        database.user(data).once((data, _) => {
          setFriends((old) => [
            ...old,
            {
              key: data,
              username: data['alias'],
              status: data['status'],
              publicKey: data['pub'],
            },
          ]);
        });
      });

    return () => {};
  }, []);

  return (
    <>
      {friends.length > 0 && (
        <ScrollToBottom className="flex flex-col flex-1 overflow-auto p-2">
          {friends.map(({ username, status, publicKey, key }, index) => (
            <div
              key={key}
              className="flex justify-between items-center w-full h-10 border-b border-gray-700 p-2"
            >
              <div className="flex items-center space-x-2">
                <div className="text-md text-gray-400">@{username}</div>
                <div
                  className={`w-2 h-2 bg-gray-400 rounded-full ${
                    status === 'online' && 'bg-green-600'
                  }`}
                />
              </div>
            </div>
          ))}
        </ScrollToBottom>
      )}

      {friends.length === 0 && (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="flex justify-center items-center w-full h-full">
            <div className="flex text-gray-300">You have no friends.</div>
          </div>
        </div>
      )}
    </>
  );
}
