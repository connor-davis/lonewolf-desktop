import { useEffect, useState } from 'react';
import { database } from '../../state/database';

let useFriendsList = () => {
  let [friends, setFriends] = useState([]);

  useEffect(() => {
    database.user().open(({ pub, friends }) => {
      for (let k in friends) {
        if (friends[k] !== pub && friends)
          database.user(friends[k]).on((data, _) => {
            setFriends((old) => [
              ...old.filter((o) => o.pub !== data.pub),
              { ...data, key: k },
            ]);
          });
      }
    });

    return () => {};
  }, []);

  return [friends, setFriends];
};

let useOnlineFriendsList = () => {
  let [friends, setFriends] = useState([]);

  useEffect(() => {
    database.user().open(({ pub, friends }) => {
      for (let k in friends) {
        if (friends[k] !== pub && friends[k])
          database.user(friends[k]).on((data, _) => {
            if (data.status === 'online')
              setFriends((old) => [
                ...old.filter((o) => o.pub !== data.pub),
                { ...data, key: k },
              ]);
          });
      }
    });

    return () => {};
  }, []);

  return [friends, setFriends];
};

let useFriendRequestsList = () => {
  let [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    database.user().open((user) => {
      for (let k in user.friendRequests) {
        if (user.friendRequests[k] !== user.pub && user.friendRequests[k])
          database.user(user.friendRequests[k]).on((data, _) => {
            setFriendRequests((old) => [
              ...old.filter((o) => o.pub !== data.pub),
              { ...data, key: k },
            ]);
          });
      }
    });

    return () => {};
  }, []);

  return [friendRequests, setFriendRequests];
};

export { useFriendsList, useOnlineFriendsList, useFriendRequestsList };
