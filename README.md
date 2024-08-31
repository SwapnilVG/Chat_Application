## Getting Started

Follow the instructions below to set up and run the Chat App locally on your machine.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/SwapnilVG/Chat_Application.git
    ```

2. Navigate to the project root:

    ```bash
    cd simple-chat-app
    ```

3. Install dependencies for the client:

    ```bash
    cd frontend
    npm install
    ```

4. Install dependencies for the server:

    ```bash
    cd ../server
    npm install
    ```

### Running the App

1. Start the frontend (frontend):

    ```bash
    cd frontend
    npm run dev
    ```

   This will launch the client application, and you can access it in your web browser at [http://localhost:5173](http://localhost:5173).

2. Start the server (backend):

    ```bash
    cd server
    npm run dev
    ```

   The server will be running at [http://localhost:4000](http://localhost:4000).


## Sample Environment File 

Create a `.env` file in the `server` folder with the following content:

```env
DB=""
JWTPRIVATEKEY = 
SALT = 
PORT = 4000
BASE_URL = "http://localhost:5173"
HOST=
SERVICE=
EMAIL_PORT=587
SECURE= true
SMTP_USER=""
SMTP_PASS=""
NODE_ENV=development
```



