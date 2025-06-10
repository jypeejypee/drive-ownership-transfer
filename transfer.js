const { google } = require('googleapis');

async function transferOwnership(auth, fileId, newOwnerEmail) {
  const drive = google.drive({ version: 'v3', auth });

  // Step 1: Make the user an editor
  await drive.permissions.create({
    fileId,
    requestBody: {
      type: 'user',
      role: 'writer',
      emailAddress: newOwnerEmail,
    },
    fields: 'id',
  });
  console.log('✅ Editor permission granted.');

  // Step 2: Request ownership transfer
  await drive.permissions.create({
    fileId,
    transferOwnership: true,
    requestBody: {
      type: 'user',
      role: 'owner',
      emailAddress: newOwnerEmail,
    },
  });

  console.log('✅ Ownership transfer requested (pending recipient consent).');
}

module.exports = transferOwnership;
