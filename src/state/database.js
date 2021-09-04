import Gun, { SEA } from 'gun';

import 'gun/sea';
import 'gun/axe';

let database = Gun('https://lonewolf-relay.seconddawn.cloud/gun');

let user = database.user().recall({ sessionStorage: true });

let generateCertificate = async (keyPair) => {
  let certificate = await SEA.certify(
    ['*'],
    [{ '*': 'friendRequests' }, { '*': 'friends' }],
    keyPair,
    null,
    {}
  );

  database.user(keyPair.pub).get('friendRequestsCertificate').put(certificate);
};

export { database, user, generateCertificate };
