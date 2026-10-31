# Connecting the invitation to Firebase

The website saves every RSVP to a free Firebase database, and shows guests' wishes live on the **Wishes for the couple** wall.
Setup takes about 10 minutes and only needs a Google account. It's free: Firebase's free plan covers far more guests than an engagement will have.

---

## 1. Create the project
1. Go to **https://console.firebase.google.com** and sign in.
2. Click **Create a project** (or **Add project**).
3. Name it something like `mohamed-habiba-engagement` → Continue.
4. Turn **Google Analytics off** (it isn't needed) → **Create project**.

## 2. Create the database
1. In the left menu, open **Build → Firestore Database**.
2. Click **Create database**.
3. Choose **Standard edition** if asked.
4. Location: choose **`europe-west1` (Belgium)** or **`eur3`**, which are the closest to Egypt. *(This can't be changed later.)*
5. Choose **Start in production mode** → **Create**.

## 3. Paste the security rules
1. In Firestore Database, open the **Rules** tab.
2. Delete everything there.
3. Open the file **`firestore.rules`** from this folder, copy all of it, and paste it in.
4. Click **Publish**.

These rules mean:
- Guests can **only add** an RSVP or a wish. They can't edit or delete anything, and can't see other people's RSVPs.
- Wishes (name + message) are public so they can appear on the wall.

## 4. Connect the website
1. Click the **⚙️ gear icon** (top left) → **Project settings**.
2. Scroll down to **Your apps** and click the **`</>`** (Web) icon.
3. App nickname: `invitation`. **Don't** tick "Firebase Hosting" → **Register app**.
4. You'll see a block of code containing `const firebaseConfig = { ... }`. Copy the values into **`script.js`**, in the `FIREBASE_CONFIG` section near the top:

```js
const FIREBASE_CONFIG = {
  apiKey: "AIza....",
  authDomain: "mohamed-habiba-engagement.firebaseapp.com",
  projectId: "mohamed-habiba-engagement",
  storageBucket: "mohamed-habiba-engagement.firebasestorage.app",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123",
};
```

> It's **safe** for these values to be public on GitHub. They only identify your project; the rules from step 3 control what anyone can actually do.

## 5. Test it
1. Open `index.html` in your browser.
2. Fill in the RSVP form **with a wish** and send it.
3. The wish should appear on the wall straight away.
4. In the Firebase console, open **Firestore Database → Data**. You'll see two collections:
   - **`rsvps`**: every reply (name, attending yes/no, number of guests, message, time)
   - **`wishes`**: the messages shown on the wall
5. Delete your test entries there (click the entry → ⋮ → Delete document).

---

## Day-to-day

**See who's coming:** Firebase console → Firestore Database → Data → `rsvps`.

**Remove an inappropriate wish:** Firestore Database → Data → `wishes` → click it → ⋮ → **Delete document**. It disappears from the website immediately.

**Optional extra protection:** you can lock the API key so it only works from your website.
1. Go to **https://console.cloud.google.com/apis/credentials** and select the project.
2. Click **Browser key (auto created by Firebase)**.
3. Under **Application restrictions**, choose **Websites** and add `https://YOUR-GITHUB-USERNAME.github.io/*`.
4. Save.

After this, testing by opening the file on your own computer will no longer work, so only do it once the site is published.
