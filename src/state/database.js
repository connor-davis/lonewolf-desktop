import Gun, { SEA } from 'gun';

import 'gun/sea';
import 'gun/axe';

let database = Gun('https://lonewolf-relay.seconddawn.cloud/gun');

let user = database.user().recall({ sessionStorage: true });

let generateCertificate = async (_user) => {
  let certificate = await SEA.certify(
    ['*'],
    [{ '*': 'friendRequests' }, { '*': 'friends' }],
    _user.pair(),
    null,
    {}
  );

  database.user(_user.is.pub).get('friendRequestsCertificate').put(certificate);
};

export { database, user, generateCertificate };
