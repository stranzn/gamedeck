import { db } from '@/app/_utils/firebase';
import { getDoc, doc, setDoc } from "firebase/firestore";

export const getUserData = async (uid) => {
    try {
        const q = doc(db, "users", uid);
        const querySnapshot = await getDoc(q);

        if(querySnapshot.exists()){
            return querySnapshot.data();
        }
    } catch (error) {
      throw new Error(`Error fetching user data for UID: ${uid}`);
    }
}

export const updateUserData = async (uid, userData) => {
  try {
    const userDocRef = doc(db, "users", uid);

    const updateData ={
      email: userData.email,
      username: userData.username,
      steamId: userData.steamId || "",
      games: userData.games
    }

    await setDoc(userDocRef, updateData, {merge: true});

    const updatedDoc = await getDoc(userDocRef);
    return updatedDoc.data();


  } catch (error) {
    console.error("Error updating user document:", error);
  }
}

export const createUserDocument = async (user) => {
    if (!user) {
        return;
    }
  
    const userDocRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userDocRef);
  
    if (!userSnapshot.exists()) {
      const { email } = user;
      try {
        await setDoc(userDocRef, {
          email,
          username: "unknown",
          games: [],
          steamId: "",
        });
      } catch (error) {
        console.error("Error creating user document:", error);
      }
    }
  };