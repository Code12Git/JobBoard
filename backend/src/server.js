const express = require('express')
const cookieParser = require("cookie-parser");
const {fromEnv} = require('./utils')
 const {logger} = require('./utils')
 const routes = require('./routes')

 const cors = require('cors')
const app = express();

const PORT = fromEnv('PORT') || 3002;
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(routes)

// app.post(
//   '/api/webhooks',
//   bodyParser.raw({ type: 'application/json' }),

//   async (req, res) => {
//     const SIGNING_SECRET = process.env.SIGNING_SECRET

//     if (!SIGNING_SECRET) {
//       throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env')
//     }

//     const wh = new Webhook(SIGNING_SECRET)

//     // Get headers and body
//     const headers = req.headers
//     const payload = req.body

//     // Get Svix headers for verification
//     const svix_id = headers['svix-id']
//     const svix_timestamp = headers['svix-timestamp']
//     const svix_signature = headers['svix-signature']

//     // If there are no headers, error out
//     if (!svix_id || !svix_timestamp || !svix_signature) {
//       return void res.status(400).json({
//         success: false,
//         message: 'Error: Missing svix headers',
//       })
//     }

//     let evt

//     // Attempt to verify the incoming webhook
//     // If successful, the payload will be available from 'evt'
//     // If verification fails, error out and return error code
//     try {
//       evt = wh.verify(JSON.stringify(payload), {
//         'svix-id': svix_id  ,
//         'svix-timestamp': svix_timestamp  ,
//         'svix-signature': svix_signature ,
//       })
//     } catch (err) {
//       console.log('Error: Could not verify webhook:', err.message)
//       return void res.status(400).json({
//         success: false,
//         message: err.message,
//       })
//     }

//     // Do something with payload
//     // For this guide, log payload to console
//     const { id } = evt.data
//     const eventType = evt.type
//     console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
//     console.log('Webhook payload:', evt.data)

//     return void res.status(200).json({
//       success: true,
//       message: 'Webhook received',
//     })
//   },
// )

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.listen(PORT, () => {
    logger.info('Server is running on port ' + PORT)
})