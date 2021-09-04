import Gun, { SEA } from 'gun';

import 'gun/sea';
import 'gun/axe';

let database = Gun();

let user = database.user().recall({ sessionStorage: true });

let generateCertificate = async () => {
  let certificate = await SEA.certify(
    ['*'],
    [{ '*': 'friendRequests' }, { '*': 'friends' }],
    user.pair(),
    null,
    {}
  );

  database.user(user.is.pub).get('friendRequestsCertificate').put(certificate);
};

export { database, user, generateCertificate };
