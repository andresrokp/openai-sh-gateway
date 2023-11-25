### Work flow

gpt prompt:
Please guide me on structuring a secondary backend (Backend 2) that securely handles client requests with JWT tokens and interfaces with an existing LLM API (OpenAI). I want the clients to initiate requests from the front end (thingsboard client) to Backend 2. The client already have a jwt from a backend 1, and will send it to backend 2 to verify validity, and subsequently adapt and forward the main client querie to the LLM API. How should I design this intermediate Backend 2 effectively? Feel free to ask any clarifying questions to help me proceed.
---
ans: guidances on the concepts and artifacts involved
DO: Comprehend ideas
Basic
+ Adaptation of user request to conform messages
+ LLM forwarding to API
+ Logging feat for server activities
+ Error handling (invalidations, api errors, etc)
+ Documentation: endpoints, auth, vendors
Medium
+ Auth validation for incoming msgs with JWT
+ Security (origin check, token expiration, revocation)
+ Testing: unit, integration, security, api (postman or insomnia)
Advanced
+ Scaling: load balancing and cache strategies
Further sugestions
+ Rate limiting of usage
+ GraphQL for more felxibility
+ Content security policy
+ Easy to expand endpoints
---
gpt prompt:
Please create the files considering the following

- An express server to listen from a web client and redirect to OpenAI LLM API
- Only listen mesages from a client in a DOMAIN_URL env's variable
- Should validate an incoming string in the msg body, using it as bearer token to ask a BACKEND1 API
- Server should take a cameraData info in the body and build a prompt for an openai gpt-3.5 turbo model
- Send a query to the openai gpt-3.5 turbo model using the openai api
- return the response to the client as chatgptmsg property of the body

IMPORTANT: USE THE BEST PRACTICES TO ORGANICE THE PROJECT. SEPARATE CONCERNS IN A VERY SCALABLE WAY
---
ans: Guidance on how set up all
DO: Comprehend procedure
+ Init project: pnpm init
+ Install dependencies: pnpn install express dotenv
+ Implement custom middelwares
+ Send query to openai
+ Code basic server.js
+ Join functions
---
gpt prompt:
Now please give the vanilla javascript code to build that server. Be organiced and separate concerns in files for further scalability
---
ans: folder structura and main files
DO: build all proposed
+ Folder structure: src(.env + index.js + server.js + /middleware + /routes + /test
---
FEAT: openai gpt api test
+ openaiTestScript.js
+ Review chat api docu: https://platform.openai.com/docs/api-reference/chat/create
+ Set up connection: OpenAI({key})
+ call completion: `openai.chat.completion.create(...args)`
+ Mock json data
+ Create prompt
+ Itereate prompt efficiency and effectiveness!!
---
FEAT: Home page serving
+ /public folder with html
+ Indicate express page serving: `app.use(express.static(./path/to/public))`
+ Learn: all nodejs path are from the root `./`
---
FEAT: Server activities logging
+ Reseacrh logging
+ Install and import morgan
+ Add morgan as express middelware: `app.use(morgan('tokenString'))`
+ Morgan bases on tokens: app.use(express.static("./src/public"));
---
EXPERIMENT: Object analyzer function
Please help me giving me a JavaScript function to describe a complex Json object in natural language, with enough detail to input the description into an LLM or ChatGPT in order it to later generate a function to traverse the object and apply basic data analytics to that described JSON object.
