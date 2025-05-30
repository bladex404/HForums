import "dotenv/config";
import app from "./app";
import connectDB from "./db/connectdb";

const PORT = process.env.PORT;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT} `);
  });
});
