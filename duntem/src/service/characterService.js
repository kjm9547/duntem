import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
  arrayUnion,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { getDatabase, ref, get, set } from "firebase/database";
import { firebaseInitailizer } from "../firebase";

export const characterService = () => {
  const { db, auth } = firebaseInitailizer();
  const checkFirebaseIdExist = async (id) => {
    const q = query(collection(db, "advantureDB"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].id;
    } else {
      return undefined;
    }

    // ID가 존재하면 true, 존재하지 않으면 false 반
  };
  const addCharacterDataToFirebase = async (user, characterData) => {
    const postData = { ...characterData };
    const docId = await checkFirebaseIdExist(user.id);
    console.log(docId);
    //중복 체크 추가 필요
    try {
      if (docId) {
        //아이디가 디비에 존재한다면
        const docRef = doc(db, "advantureDB", docId);
        await updateDoc(docRef, {
          rows: arrayUnion(postData),
        });
        console.log(`${user.id}에 데이터가 추가되었습니다.`);
      } else {
        const docRef = await addDoc(collection(db, "advantureDB"), {
          id: user.id,
          advantureGroup: user.advantureGroup,
          rows: [postData],
        });
        console.log(`새로운 데이터가 추가되었습니다.`, docRef.id);
      }
    } catch (err) {
      console.log("캐릭터 등록 과정에서 문제가 발생하였습니다.");
      console.error();
    }
  };
  const checkFirebaseDataExist = async (id) => {
    const q = query(collection(db, ""));
  };
  const getUserAllCharacterData = async (id) => {
    const q = query(collection(db, "advantureDB"), where("id", "==", id));
    const docRef = await getDocs(q);
    return docRef.docs[0].data();
  };
  const removeCharacterFireStore = async (id, charactorId) => {
    const docId = await checkFirebaseIdExist(id);
    const adventureRef = doc(db, "advantureDB", docId);

    try {
      // 해당 문서의 데이터를 가져옵니다.
      const docSnap = await getDoc(adventureRef);
      console.log(docSnap);
      if (docSnap.exists()) {
        const data = docSnap.data();

        // rows 배열에서 cId가 일치하지 않는 항목만 필터링
        const updatedRows = data.rows.filter(
          (row) => row.characterId !== charactorId,
        );

        // 문서를 업데이트하여 새로운 rows 배열을 Firestore에 저장
        await updateDoc(adventureRef, {
          rows: updatedRows,
        });
        console.log(`Deleted cId: ${charactorId} from ID: ${charactorId}`);
      } else {
        console.log(`Document with ID ${id} not found in adventureDB.`);
      }
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };
  return {
    addCharacterDataToFirebase,
    getUserAllCharacterData,
    removeCharacterFireStore,
  };
};
