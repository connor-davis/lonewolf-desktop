import Gun from 'gun';

import 'gun/sea';
import 'gun/axe';

let database = Gun({
  peers: [
    'https://lonewol-eu-day.herokuapp.com/gun',
    'https://lonewol-eu-night.herokuapp.com/gun',
  ],
});

let user = database.user().recall({ sessionStorage: true });

export { database, user };
