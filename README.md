# 📁 Google Drive File Ownership Transfer App
This Node.js app uses the Google Drive API to automatically transfer ownership of a file from one Google account to another.

---

## 🚀 Features
- Grant **Editor** access to another user
- Request **Ownership Transfer**
- Handles Google OAuth2 authentication
- Automatically saves and reuses tokens

---

## 🛠 Requirements
- Node.js v18 or later
- A Google Cloud project with:
  - **OAuth 2.0 Client ID**
  - **Drive API enabled**

---

## 🔐 Files Required (Not Included)
These files are excluded from the repository for security:
- `credentials.json` – Download from your [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
- `token.json` – Auto-generated after first run (when you authorize your account)

---

## 🧪 Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/your-username/drive-ownership-transfer.git
cd drive-ownership-transfer
```

2. **Install dependencies**
```bash
npm install
```

3. **Add your Google OAuth credentials**  
Place your `credentials.json` in the root directory. It should look like:
```json
{
  "installed": {
    "client_id": "YOUR_CLIENT_ID",
    "project_id": "YOUR_PROJECT_ID",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "YOUR_CLIENT_SECRET",
    "redirect_uris": ["http://localhost"]
  }
}
```

4. **Run the app**
```bash
node index.js
```

5. **Authorize access**  
You'll be given a URL in the terminal. Visit it, log in to your Google account, and paste the returned code back into the terminal.

6. **Check results**  
After successful authorization, the app will:
   - Grant editor access to the recipient
   - Send an ownership request

---

## 📬 What Happens Next?
- The recipient should go to **Google Drive → Shared with me → File → Share**
- A "⚠️ Owner request pending" message will appear
- They must accept the ownership manually.

---

## 📄 Notes
- This only works with @gmail.com addresses (not Google Workspace)
- Only files (not folders) can be transferred with the API
- The app uses `https://www.googleapis.com/auth/drive` scope for full access

---

## 📧 Contact
**Jaypee C. Vilador**  
📫 Email: jaypee.vilador@gmail.com
