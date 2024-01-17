### Work flow
---
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
---
---
---
---
DUTY: Tight WSL2 memory efficiency on my machine
+ vmem was eating too much memory
+ How to manage wsl memory
    + https://www.aleksandrhovhannisyan.com/blog/limiting-memory-usage-in-wsl-2/
+ Key commands
    + On cmd
        + `wsl`
        + `wsl --shutdown`
    + On linux
        + `free -h --giga`
        + `top -o %MEM`
        + `editor "$(wslpath "C:\Users\YourUsername\.wslconfig")"`
        + write the file
---
---
Set up Digital Ocean sever
+ A cheap server: 1GB, 1core, 25GB
+ as root
    + `adduser {username}` . Crear usuario
    + `usermod -aG sudo {username}` . Agregar user al group
ENV INSTALLATION
+ `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash` . Install nvm (https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
+ `curl -fsSL https://get.pnpm.io/install.sh | sh -` . Install pnpm (https://pnpm.io/installation)
    + 
+ `nvm install --lts` . Install Node LTS
+ `pnpm i -g pm2` . Install PM2
RUN PROJECT
    + `git clone`, `pnpm i`, `node index.js`, `pm2 logs` 
+ Some system check
    + `top -o %MEM` . Sort top by memory usage
    + `ps -e` . view all active processes
    + `ps -e | grep node` . check for NodeJS porcesses

+ 
---
---
---

ADDED UGLY REACT VITE BUILD
+ In other place, loaded created vite to see main files
+ Brougth here the main files an lines
    + `vite.config.js` in root
    + `.jsx` files in `/src`
    + `/assets` dir in `/src`
    + `.gitignore` lines
    + `.eslintrc.cjs` in root
    + `vite.svg` file in public (build out)
    + inserted new dependencies in `package.json`
    + inserted script in `package.json`
    + run `pnpm i`
+ Build app with `pnpm run build`
+ Browser Error: 'Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "text/jsx". Strict MIME type checking is enforced for module scripts per HTML spec.'
    + Set JS script path in build's index.html as relative (added '.' before '/')
+ Set the build folder inside inner public
    + `Build: { outDir : './path/to/build/dir' }` in `vite.config.js`
+ Error: vite.svg not found
    + Create an dummy/ugly outer public folder in root and added the svg file
    + Seems like docu said: vite consider links as relative, but images as globals
+ Put all this test into a dummy Git Branch


REFACTOR PROJECT STRUCTURE
+ Create 2 src subfolders (server & react)
+ Take out public folder to working dir root
+ fix al file links


ADDED GOOD VITE-REACT
+ All the previous plus
    + set 2 separate folders for vite's root and outDir leveraging folder up `../../`
    + include `base: 'buildParentDir'` in `vite.config.js` to match build assets folder
    + put `vite.svg` inside `src/asset`






---
---
Milestones
+ voice2voice AI assistant beta
    + ~~Capture voice in client~~
    + ~~Post sound file to backend~~
    + ~~Forward to whisper and fetch transcript~~
    + ~~Forward transcript to gpt-turbo and fetch answer~~
    + ~~Elaborate information corpus~~
    + ~~Optimize prompting~~
    + ~~Forward answer to whisper speech~~
    + ~~Return speech answer to client~~
    + ~~Play sound in client~~
    + Show transcript in client

+ Make it pretty
    + Identify TB look and feel -> 
    + Interact with gpt to clarify desing procedure
        + Long conversation
        + Main prompt: 
        + 