
## CertPal
This is a personal project I'm building as a cybersecurity student who wants to make studying more effective and less overwhelming. Since everyone is always on thier phones I wanted to create an app that would improve one's knowledge of cybersecurity instead of scrolling mindlessly on social media. Most apps cost on the app store, at least for the better qualiity apps. The goal of this app is to use AI to help students prepare for popular cybersecurity certifications like Security+, CEH, and CISSP for free and for the benefit of them and them only. Instead of just memorizing flashcards, this tool will use intelligent questioning, explanations, and even study plans to help students understand the concepts better.

I'm building this project to improve my own skills in cybersecurity, software development, and working with AI. I also hope it helps others who are on the same path.

This is a concept for an app that uses AI software to create flashcards, practice questions, and exams on an app for cyber students to study for certifications at the tip of their fingers.

## AI Certification Coach
- CompTIA Security+
- CEH (Certified Ethical Hacker)
- CISSP (Certified Information Systems Security Professional)
- ...and more!

## Features
- AI-generated quiz questions tailored to each certification
- Personalized study plans
- Flashcards and quick-reference guides
- Progress tracking
- Floating Chat Bot for help at all times
- Sends your questions to a local LLM via Ollama
- Designed for IT + cybersecurity explanations (firewalls, subnets, OSI, etc.)

## Built With
- Python
- Ollama
- Figma

## Tech Stack

**Frontend**

- Vite + React + TypeScript
- React Router
- shadcn/ui + Tailwind CSS
- React Query (@tanstack/react-query)
- Lucide icons

**Backend**

- Node.js + Express
- CORS
- `node-fetch`
- Local LLM via **Ollama**

## Getting Started

Follow these steps to run the full Cert Pal app (frontend + backend + Ollama).

1. Requirements

Install:

Node.js (LTS recommended)

npm

Git

Ollama --> https://ollama.com/download

2. Clone the Repository
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd YOUR-REPO

3. Install Frontend Dependencies

From the project root:

npm install

4. Run the Frontend
npm run dev

Your app will run at:
--> http://localhost:5173 or something similar

5. Install an Ollama Model

Ollama must have a model downloaded.
For example(check command prompt):

type in cmd: 
ollama pull llama3.2:3b

You can check what’s available also with:
ollama list

6. Backend Setup (Express + Ollama API)

Go into the server folder in the terminal:
cd server

Install server dependencies:
npm install

7. Run the Backend:
npm start

You should see something like:

index.mjs loaded
Ollama AI server running at http://localhost:3001

8. Use the Chatbot

With:
Frontend → npm run dev
Backend → npm start

Ollama running in the background automatically

Open the app:
http://localhost:5173

Click the chat bubble in the app and ask something like:
“Explain the difference between a WAF and a firewall.”

## Roadmap / Future Ideas

 -Add more certifications (Security+, Network+, AWS, etc.)

 -Add spaced-repetition algorithms

 -Add custom note-taking per card

 -Add “challenge mode” quizzes

 -Add speech input for chatbot

 Stream LLM responses for smoother chat

## Written Paragraphs
Why I Built This Project

I decided to build this project because I’ve been really focused on improving my IT and cybersecurity skills, and I wanted a tool that could actually support how I learn. Most study apps either feel too basic or they require a subscription, and none of them include an AI that can explain concepts in a simple, personalized way. Since I’ve been working with AI tools a lot this semester, it made sense to experiment with integrating a local LLM so the entire app can run offline and completely privately. I also chose this project because it connects directly to my long-term goals in IT and cybersecurity, where understanding networking, firewalls, risks, and architecture is really important. Building this app let me combine my technical learning with hands-on development in a way that actually benefits me in real life.

How I Built It

I built the frontend using React with Vite and TypeScript because it's fast, lightweight, and easy to organize. I used shadcn/ui to create a consistent interface that feels modern but still simple enough for studying. The pages include flashcards, quizzes, exam modes, and a progress section, all connected through React Router. For the AI helper, I built a backend with Node.js and Express, which acts as a bridge between the chatbot component in the frontend and the local Ollama model running on my machine. This Express server receives messages, forwards them to Ollama, and sends the AI’s response back to the app.

Challenges I Solved

One of the biggest challenges I faced was getting the backend server and Ollama to communicate correctly. At first, the model path, ports, and file structure caused errors or made nothing show up in my terminal, so I had to learn how to debug Express routes, verify network requests, and test APIs manually. Another challenge was understanding how the ChatBot component sends requests and how to trace each step through the frontend, backend, and model until I found where things were failing. Once I understood that flow, everything became easier to fix.

What I Learned / Reflection

This project pushed me to connect everything I’ve been learning this semester: frontend development, backend APIs, LLMs, and problem-solving. I learned how to structure a full application, how to read and debug server logs, and how to integrate a real working AI model into a project without relying on external services. It also helped me understand networking concepts better, since I had to work with ports, endpoints, and routing. Most importantly, I feel more confident building bigger projects now and solving problems independently instead of getting stuck.

If I continue working on this app, I want to add more certifications, track user progress more deeply, and refine the model so it feels even more like a real study tutor. This project ended up being something I’m proud of and something I actually benefit from, not just a school assignment.

## Video explaining a pain point I faced; how i solved it.
https://youtu.be/d-C1mrCIcB0
