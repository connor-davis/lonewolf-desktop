import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import { useFriendsList } from './friendsFunctions';

export default function AllFriendsPage() {
  let [friends] = useFriendsList();

  return (
    <>
      {friends.length > 0 && (
        <ScrollToBottom className="flex flex-col flex-1 overflow-auto p-2">
          {friends.map(({ alias, status }, index) => (
            <div
              key={index}
              className="flex justify-between items-center w-full h-10 border-b border-gray-700 p-2"
            >
              <div className="flex items-center space-x-2">
                <div className="text-md text-gray-400">@{alias}</div>
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
