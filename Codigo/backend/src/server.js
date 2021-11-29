const app = require("./app");

const PORT = process.env.NODE_ENV === "test" ? 3336 : 3333;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
