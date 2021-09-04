/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FriendsList from '../../components/friends/friendList';
import { getUserInfo } from '../../state/user.slice';
import { database } from '../../state/database';

export default function OnlineFriendsPage() {
  let userInfo = useSelector(getUserInfo);
  let [friends, setFriends] = useState([]);

  useEffect(() => {
    database
      .user(userInfo.publicKey)
      .get('friendsList')
      .map()
      .once((data, key) => {
        if (data && data.status === 'online') {
          setFriends((old) => [...old, { username: data.username }]);
        }
      });

    return () => {};
  }, []);

  return (
    <>
      {friends.length > 0 && <FriendsList friends={friends} />}

      {friends.length === 0 && (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="flex justify-center items-center w-full h-full">
            <div className="flex text-gray-300">
              You have no friends online.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
