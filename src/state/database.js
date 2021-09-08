import Gun, { SEA } from 'gun';

import 'gun/sea';
import 'gun/axe';
import 'gun/lib/radix';
import 'gun/lib/radisk';
import 'gun/lib/store';
import 'gun/lib/rindexed';
import 'gun/lib/shim';
import 'zenbase/dist/main';

let database = Gun({
  localStorage: true,
  secret: window.zenbase_key,
  portal: 'https://siasky.net',
  debug: true,
  until: 2 * 1000,
});

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
