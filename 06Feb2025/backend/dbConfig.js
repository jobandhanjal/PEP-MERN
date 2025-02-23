const mongoose = require("mongoose");

const connectToDb = async () => {
    try {
        // Make Changes
        // await mongoose.connect(
        //     "mongodb+srv://cloudfile2024:passeasy@cluster0.vvnax.mongodb.net/MERN_LPU_WINTER_ONLINE_TASK_MANAGEMENT?retryWrites=true&w=majority&appName=Cluster0"
        // );
        console.log("---------- ✅ Database Connected ---------");
        console.log("------------------------------------------");
    } catch (err) {
        console.log("-------- ❌ Database NOT Connected -------");
        console.log("------------------------------------------");
    }
};

connectToDb();