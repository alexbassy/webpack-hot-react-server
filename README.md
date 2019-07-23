# Very hot webpack example 🔥

An express server with hot server and client updates. Server-side rendered react with hot module replacement + client side hot module replacement.


**Using:**
- webpack-dev-middleware
- webpack-hot-middleware
- webpack-hot-server-middleware
- react-hot-loader
- webpack / babel


**How to use**:
1. Clone the repo
    ```
    git clone https://github.com/alexbassy/webpack-hot-server.git
    yarn
    ```
2. Install dependencies
    ```
    yarn
    # or
    npm i
    ```
3. Run dev server
    ```
    yarn dev
    ```
    and open http://localhost:3000
4. Update something in `src/components/App.jsx`
   - You'll see the update instantly in the browser
   - Refresh the page and the updated component will be in the rendered source of the page
5. Create production build
    ```
    yarn build
    ```