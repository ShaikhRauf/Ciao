// import {AuthConfiguration} from "react-native-app-auth";
// export default {
//     BASE_URL: "https://api.abites.edfibre.net/",
    
//     // BASE_URL:"http://localhost:3000/",
    
//     CAPRI_BASE_URL: "https://capri.api.edfibre.net/",
//     oktaToken : "eyJraWQiOiJvLUlNWU5nS3ZPTVFxOEprX3FZZTAzU0U5QnFabVMxZXI0cEdWVnhjS3dnIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULmJEOFl5eU52WVNLc1VJT18zZFRna2k2dkxTanB6bDM0SjNfVDA5NkhoRWcub2FyNWlzdTRzVWlLMW1Fc2w0eDYiLCJpc3MiOiJodHRwczovL2Rldi05NjMzOTgub2t0YS5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNjEyMTIwOTg4LCJleHAiOjE2MTIxMjQ1ODgsImNpZCI6IjBvYTFzMGRraHJSR2xOOHAxNHg3IiwidWlkIjoiMDB1MWVzc2sybDRYejh1U0I0eDciLCJzY3AiOlsib2ZmbGluZV9hY2Nlc3MiLCJvcGVuaWQiLCJwcm9maWxlIl0sInN1YiI6IjMwMzg3NDE1QHN0dWRlbnRzLmF0bWMuZWR1LmF1In0.LfiPwyf_4n_JZd-AElARlEU88ad6vAroWq-2fKqOwk5F1on-MM0fPlWUyeojYVSFXdM-hV8UN2iua8r1R36-_OdlaALfjCpspjCOmD-nWd7SkWILs4zSwAsIpZeNElJJCB6BPSXzxtucZtIFZiXkMng27TAUMZPBT82bD4OLxVTbijifTS_ZPC1Gb1x3gGLim6RU5GzZ9cQ9_FSipV6Aouvomb8eX5SsSv2R_BGnpYHTQko4sCNQn0QgXGoktJ_g4bzvf8p2Z58-_mvg1IIrnpoSx8zCKHqvuFTXUNEzR99eNRqbl82FefgBFVYi2MBHu2HgYHsfeGgIwfLoo1uvdA",
//     graphToken : "eyJ0eXAiOiJKV1QiLCJub25jZSI6Ik5MV3hUSFhhTGhJekhROWFlVjR6eHNndFppSGRHOTVsOGQza0Z2d2RYOE0iLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kMDhiOWY2MS1mZWVmLTRmZjctOTk5NC1kYjZjNTMxMjc0YzUvIiwiaWF0IjoxNjEzMDU0OTUzLCJuYmYiOjE2MTMwNTQ5NTMsImV4cCI6MTYxMzA1ODg1MywiYWNjdCI6MCwiYWNyIjoiMSIsImFjcnMiOlsidXJuOnVzZXI6cmVnaXN0ZXJzZWN1cml0eWluZm8iLCJ1cm46bWljcm9zb2Z0OnJlcTEiLCJ1cm46bWljcm9zb2Z0OnJlcTIiLCJ1cm46bWljcm9zb2Z0OnJlcTMiLCJjMSIsImMyIiwiYzMiLCJjNCIsImM1IiwiYzYiLCJjNyIsImM4IiwiYzkiLCJjMTAiLCJjMTEiLCJjMTIiLCJjMTMiLCJjMTQiLCJjMTUiLCJjMTYiLCJjMTciLCJjMTgiLCJjMTkiLCJjMjAiLCJjMjEiLCJjMjIiLCJjMjMiLCJjMjQiLCJjMjUiXSwiYWlvIjoiRTJaZ1lORFVibjdtTk10T2plOUNRVTdXbFN2N3BaLzhFZHpyUE5sMjl1bkFnZ1dzb3ZJQSIsImFtciI6WyJwd2QiXSwiYXBwX2Rpc3BsYXluYW1lIjoiRWRGaWJyZSIsImFwcGlkIjoiZWMxYmZhMzItZDNjZS00OGFhLWE2M2QtNGNjNDQ3ODQ3MDhkIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJLUklTSEFOMTE2IiwiZ2l2ZW5fbmFtZSI6Ik1yaWR1bCIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjEwNi4xOTMuMTU0LjMzIiwibmFtZSI6Ik1yaWR1bCBLUklTSEFOMTE2Iiwib2lkIjoiOTc0MzRiM2MtNjkzNy00YzdjLWJjZmItMDQ2YTJhZjQyMWM3Iiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTMwNTAzNTgyMjUtMjc2NTY4NzUxNS0xMTYzMjI2NzI5LTM0MDQwIiwicGxhdGYiOiIyIiwicHVpZCI6IjEwMDMyMDAwQTMzOUUzQzkiLCJyaCI6IjAuQUFBQVlaLUwwT18tOTAtWmxOdHNVeEoweFRMNkctek8wNnBJcGoxTXhFZUVjSTBLQUlvLiIsInNjcCI6IkNhbGVuZGFycy5SZWFkV3JpdGUgRGlyZWN0b3J5LkFjY2Vzc0FzVXNlci5BbGwgRGlyZWN0b3J5LlJlYWRXcml0ZS5BbGwgZW1haWwgRmlsZXMuUmVhZFdyaXRlIEdyb3VwLlJlYWRXcml0ZS5BbGwgTm90ZXMuUmVhZFdyaXRlLkFsbCBvcGVuaWQgcHJvZmlsZSBTaXRlcy5SZWFkLkFsbCBVc2VyLlJlYWQgVXNlci5SZWFkV3JpdGUuQWxsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoibXRjMXVuTGtYek5sZlp0eU1vYzJZazBVaTBIa05RcUdCOGRPMy1GaUdTNCIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJPQyIsInRpZCI6ImQwOGI5ZjYxLWZlZWYtNGZmNy05OTk0LWRiNmM1MzEyNzRjNSIsInVuaXF1ZV9uYW1lIjoiMzAzODc0MTVAc3R1ZGVudHMuYXRtYy5lZHUuYXUiLCJ1cG4iOiIzMDM4NzQxNUBzdHVkZW50cy5hdG1jLmVkdS5hdSIsInV0aSI6IjNEY0ZVcFVQQlVTOERSdWdKOThHQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdLCJ4bXNfc3QiOnsic3ViIjoiYU9wZTFKNHNIWS04d3A1bFUyemdkbmpuRFJWbGk5bHR4US1mcEpZUDVLVSJ9LCJ4bXNfdGNkdCI6MTQzNTYyNjc2MX0.b1mwdFMh-no9RBYmIULAwYxwS5T2phn7yIJ4XNV950WDrjfaMit_utmnyMkSyHmyonGdBVaHaWbHVwe0t0GCU-rA0fjJS9xsAn0yNCHncaKzJHUg6XqH2voawRD-pVxDcNX4Vf0xNygbNjIuo9pOYeJtjb_F_2GdVdiL__mc_yLNwJggUJauxZ98hKkcIEj96c2ePwV8rPEWRQsfDblBN_JAoYclCdzX9CAhcsxokzUmU00mQ5pAcl6MJNm1LEkykVKnT8TmLmR2uPudTCZ3oi5kDLs0VBEWK6KI66SjgmZWGSmIJmlQeDW0mECm3v2nUGuseBbhcS9uKyi2qc5Ccw"
// }
// export const oktaConfig: AuthConfiguration = {
//     usePKCE: true,
//     issuer: 'https://id.edfibre.com/oauth2/aus2yb8pz8DwlZvnH4x7',
//     clientId: '0oa1s0dkhrRGlN8p14x7',
//     redirectUrl: 'com.phibi://oauth/redirect/',
//     scopes: ['openid', 'profile', 'email', 'offline_access'],
// };
// const config = {
//   issuer:
//     "https://login.microsoftonline.com/d08b9f61-feef-4ff7-9994-db6c531274c5/v2.0",
//   clientId: "ec1bfa32-d3ce-48aa-a63d-4cc44784708d",
//   redirectUrl: "com.phibi://oauth/redirect/",
//   scopes: ["openid", "profile", "email", "offline_access"],
// };