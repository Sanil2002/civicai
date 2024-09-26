// import { generateHash } from "./GenerateHash";

// export const chatAi = async (msg: string) => {

//     const session_hash = generateHash(12);
//     return new Promise(resolve => {
//         axios.post('https://ai.kutana.net/run/predict', {
//             data: [msg],
//             event_data: null,
//             fn_index: 8,
//             trigger_id: 25,
//             session_hash,
//         })
//             // .then((result: any) => {
//             //     axios
//             //         .post('https://ai.kutana.net/run/predict', {
//             //             data: [],
//             //             event_data: null,
//             //             fn_index: 11,
//             //             trigger_id: 25,
//             //             session_hash,
//             //         })
//                     // .then((result: any) => {
//                     //     axios.post('https://ai.kutana.net/run/predict', {
//                     //         data: [null, null],
//                     //         event_data: null,
//                     //         fn_index: 9,
//                     //         trigger_id: 25,
//                     //         session_hash,
//                     //     })
//                             .then((result: any) => {
//                                 axios.post('https://ai.kutana.net/queue/join?', {
//                                     data: [null, null, 'Search', null, ''],
//                                     event_data: null,
//                                     fn_index: 10,
//                                     trigger_id: 25,
//                                     session_hash,
//                                 })
//                                 .then(async (result: any) => {
//                                     const response = await axios.get(`https://ai.kutana.net/queue/data?session_hash=${session_hash}`,
//                                         { headers: { Accept: 'application/json' } },
//                                     );

//                                     const re = response.data.split('data: ').map((item: any) => {
//                                         return item == '' ? item : JSON.parse(item)
//                                     });
//                                     console.log('response.data__final', response.data, re);

//                                     let feedback = '';
//                                     re.map((item: any) => {
//                                         // console.log(item.output?.data);
//                                         item.output &&
//                                             !item.output?.is_generating &&
//                                             (feedback = item.output?.data);
//                                     });

//                                     console.log('final_Response____', feedback[0][0]);
//                                     resolve(feedback[0][0][1])
//                                     // axios.post('https://ai.kutana.net/run/predict', {
//                                     //     data: [],
//                                     //     event_data: null,
//                                     //     fn_index: 12,
//                                     //     trigger_id: 25,
//                                     //     session_hash: 'rt3s3o1tgjd',
//                                     // // })
//                                         // .then((result: any) => { });
//                                 });
//                             })
//                     // })
//                 // console.log('resultresultresultresult', result);
//             // })
//             .catch((result: any) => {
//                 console.log('Errror_________', result);
//             });
//     });
// };

// import axios from "axios";
// export const chatAi = (input = '', messages = []) => {

//     const messageTemplate = (input: string) => `${input}, take answer from the files ingested, don't specify source. if the answer is not in the files ingested just send "Sorry, I don't know the Answer", don't send nothing else.`;

//     return new Promise(async (resolve, reject) => {
//         try {
//             const response = await axios.post(
//                 'https://ai.kutana.net/v1/chat/completions',
//                 {
//                     messages: [
//                         ...messages,
//                         {
//                             role: 'user',
//                             content: messageTemplate(input),
//                         },
//                     ],
//                     include_sources: true,
//                     use_context: true,
//                     context_filter: {
//                         docs_ids: [],
//                     },
//                     stream: false,
//                 },
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 },
//             );
//             console.log(response.data?.choices[0].message.content);
//             resolve(response.data?.choices[0].message.content);
//         } catch (error) {
//             reject(error);
//             console.error('Error during the axios request:', error);
//         }
//     });
// };