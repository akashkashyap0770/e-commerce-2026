// const crypto = require("crypto");

// // Base64 URL encode (IMPORTANT for JWT)
// function base64UrlEncode(str) {
//   return Buffer.from(str)
//     .toString("base64")
//     .replace(/=/g, "")
//     .replace(/\+/g, "-")
//     .replace(/\//g, "_");
// }

// // Create JWT manually
// function generateJWT(payload, secret) {
//   // 1. Header
//   const header = {
//     algorithm: "HS256",
//     type: "JWT",
//   };

//   // 2. Encode Header & Payload
//   const encodedHeader = base64UrlEncode(JSON.stringify(header));
//   const encodedPayload = base64UrlEncode(JSON.stringify(payload));

//   // 3. Create Signature
//   const data = `${encodedHeader}.${encodedPayload}`;

//   const signature = crypto
//     .createHmac("sha256", secret)
//     .update(data)
//     .digest("base64")
//     .replace(/=/g, "")
//     .replace(/\+/g, "-")
//     .replace(/\//g, "_");

//   // 4. Final Token
//   return `${data}.${signature}`;
// }
