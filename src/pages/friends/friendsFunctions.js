import { useEffect, useState } from 'react';
import { database, user } from '../../state/database';

let useFriendsList = () => {
  let [friends, setFriends] = useState([]);

  useEffect(() => {
    database
      .user(user.is.pub)
      .get('friends')
      .map()
      .once((data, key) => {
        if (data !== user.is.pub)
          database.user(data).on((data, _) => {
            setFriends((old) => [
              ...old.filter((o) => o.pub !== data.pub),
              { ...data, key },
            ]);
          });
      });

    return () => {};
  }, []);

  return [friends, setFriends];
};

let useOnlineFriendsList = () => {
  let [friends, setFriends] = useState([]);

  useEffect(() => {
    database
      .user(user.is.pub)
      .get('friends')
      .map()
      .once((data, key) => {
        if (data !== user.is.pub)
          database.user(data).on((data, _) => {
            if (data.status === 'online')
              setFriends((old) => [
                ...old.filter((o) => o.pub !== data.pub),
                { ...data, key },
              ]);
          });
      });

    return () => {};
  }, []);

  return [friends, setFriends];
};

let useFriendRequestsList = () => {
  let [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    database
      .user(user.is.pub)
      .get('friendRequests')
      .map()
      .once((data, key) => {
        if (data !== user.is.pub && data)
          database.user(data).on((data, _) => {
            setFriendRequests((old) => [
              ...old.filter((o) => o.pub !== data.pub),
              { ...data, key },
            ]);
          });
      });

    return () => {};
  }, []);

  return [friendRequests, setFriendRequests];
};

export { useFriendsList, useOnlineFriendsList, useFriendRequestsList };
