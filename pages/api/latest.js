// pages/api/latest.js
export default async function handler(req, res) {
  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3NDgwNzQ2ODAsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJhZGRyZXNzIjoib25pb254QGRjcGEubmV0IiwiaWQiOiI2ODMxODA4YzJiMTFkNzhhYmQwMTllOTEiLCJtZXJjdXJlIjp7InN1YnNjcmliZSI6WyIvYWNjb3VudHMvNjgzMTgwOGMyYjExZDc4YWJkMDE5ZTkxIl19fQ.uJ0spRCRurMDTiRPiLMJbC-05B7vx12Bholn-BufKzScQyYhf0zKykeEJ2cENiPEgk4tzsuEIRP46e7s9k8F3Q"; // your full token here

  const messagesRes = await fetch("https://api.mail.tm/messages?page=1&limit=5", {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await messagesRes.json();
  const messages = data["hydra:member"];

  // Optionally filter by sender:
  const latest = messages.find(m => m.from.address === "no-reply@skinape.com") || messages[0];

  if (!latest) return res.status(200).json({ empty: true });

  const msgRes = await fetch(`https://api.mail.tm/messages/${latest.id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const msg = await msgRes.json();

  res.status(200).json({
    subject: msg.subject,
    from: msg.from.address,
    date: msg.createdAt,
    html: msg.html[0],
    intro: msg.intro
  });
}
