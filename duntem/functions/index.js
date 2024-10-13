// functions/index.js

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

// node-fetch를 동적 import로 변경
let fetch;
(async () => {
  fetch = (await import('node-fetch')).default;
})();

const app = express();
app.use(cors({ origin: true }));

const apiKey = 'qPMao1ttAOaA6bVsnpbZS242s4KvtWo2'; // 여기에 본인의 API 키를 넣어주세요.

// 네오플 API를 프록시하는 함수
app.get('/neople/:characterName', async (req, res) => {
  const characterName = req.params.characterName;
  const apiUrl = `https://api.neople.co.kr/df/servers/all/characters?characterName=${characterName}&apikey=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data); // 클라이언트에 데이터 전송
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('API 요청에 실패했습니다.'); // 에러 처리
  }
});

// 네오플 크리쳐 API
app.get('/neople/creature/:characterId/:serverId', async (req, res) => {
  const characterId = req.params.characterId;
  const serverId = req.params.serverId;
  const apiUrl = `https://api.neople.co.kr/df/servers/${serverId}/characters/${characterId}/equip/creature?apikey=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data); // 클라이언트에 데이터 전송
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('API 요청에 실패했습니다.'); // 에러 처리
  }
});

// 네오플 아바타 API (오라 포함)
app.get('/neople/avatar/:characterId/:serverId', async (req, res) => {
  const characterId = req.params.characterId;
  const serverId = req.params.serverId;
  const apiUrl = `https://api.neople.co.kr/df/servers/${serverId}/characters/${characterId}/equip/avatar?apikey=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data); // 클라이언트에 데이터 전송
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('API 요청에 실패했습니다.'); // 에러 처리
  }
});

// 네오플 스위칭 API
app.get('/neople/switching/:characterId/:serverId', async (req, res) => {
  const characterId = req.params.characterId;
  const serverId = req.params.serverId;
  const apiUrl = `https://api.neople.co.kr/df/servers/${serverId}/characters/${characterId}/skill/buff/equip/equipment?apikey=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data); // 클라이언트에 데이터 전송
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('API 요청에 실패했습니다.'); // 에러 처리
  }
});

// Firebase Function 내보내기
exports.api = functions.https.onRequest(app);
