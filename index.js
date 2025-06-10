const fs = require('fs');
const { google } = require('googleapis');

const FILE_ID = '19xcLqQDIg3cMdgZahwgOQY2jlDUT8LZu';
const NEW_OWNER_EMAIL = 'jaypee.vilador1@gmail.com';

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = 'token.json';
const CREDENTIALS_PATH = 'credentials.json';

async function authorize() {
  const creds = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  const { client_id, client_secret, redirect_uris } = creds.installed;
  const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  if (fs.existsSync(TOKEN_PATH)) {
    auth.setCredentials(JSON.parse(fs.readFileSync(TOKEN_PATH)));
    return auth;
  }

  const url = auth.generateAuthUrl({ access_type: 'offline', scope: SCOPES });
  console.log('🔗 Authorize: ', url);
  const code = await new Promise(res => {
    require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    }).question('📥 Paste code: ', res);
  });
  const { tokens } = await auth.getToken(code);
  auth.setCredentials(tokens);
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
  console.log('✅ Full Drive access granted.');
  return auth;
}

async function run() {
  const auth = await authorize();
  const drive = google.drive({ version: 'v3', auth });

  // Step 1: Find existing permission
  const perms = await drive.permissions.list({
    fileId: FILE_ID,
    fields: 'permissions(id,emailAddress,role,pendingOwner)',
    supportsAllDrives: true,
  });

  let perm = perms.data.permissions.find(p => p.emailAddress === NEW_OWNER_EMAIL);
  let permissionId;

  if (perm) {
    permissionId = perm.id;
    console.log('🔍 Found existing permission:', perm);
  } else {
    // Step A: Create editor access
    const create = await drive.permissions.create({
      fileId: FILE_ID,
      requestBody: {
        type: 'user',
        role: 'writer',
        emailAddress: NEW_OWNER_EMAIL,
      },
      fields: 'id',
    });
    permissionId = create.data.id;
    console.log('✅ Editor access granted, permissionId =', permissionId);
  }

  // Step B: Update to request pending ownership
  const updated = await drive.permissions.update({
    fileId: FILE_ID,
    permissionId: permissionId,
    supportsAllDrives: true,
    requestBody: {
      role: 'writer',
      pendingOwner: true,
    },
  });

  console.log('📨 Ownership offer sent. Permission details:', updated.data);
  console.log('🔔 Ask recipient to open Google Drive, search `pendingowner:me`, then Accept Ownership.');
}

run().catch(err => console.error('❌ Error:', err.errors?.[0]?.message || err.message));
