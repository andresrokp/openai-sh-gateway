### Work flow

gpt prompt:
Please provide me an outline of how to execute the following instructions. Give a high level overview with no implementation code

- An express server to listen from a web client and redirect to OpenAI LLM API
- Only listen mesages from a client in a DOMAIN_URL env's variable
- Should validate an incoming string in the msg body, using it as bearer token to ask a BACKEND1 API
- Server should take a cameraData info in the body and build a prompt for an openai gpt-3.5 turbo model
- Send a query to the openai gpt-3.5 turbo model using the openai api
- return the response to the client as chatgptmsg property of the body

IMPORTANT: USE THE BEST PRACTICES TO ORGANICE THE PROJECT. BE ORGANIZED AND SEPARATE CONCERNS IN FILES FOR FURTHER SCALABILITY

---

ans: extensive guidance on how set up all

---

gpt prompt:
Now please give the vanilla javascript code to build that server. Be organiced and separate concerns in files for further scalability

---

ans: folder structura and main files

---

DO: build all proposed