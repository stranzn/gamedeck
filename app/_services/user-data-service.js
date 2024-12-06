import { db } from '@/app/_utils/firebase';
import { collection, getDoc, addDoc, query, doc, setDoc, DocumentReference } from "firebase/firestore";

export const getUserData = async (uid) => {
    console.log(uid);
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
          username: null,
          games: [],
          steamId: null,
        });
      } catch (error) {
        console.error("Error creating user document:", error);
      }
    }
  };