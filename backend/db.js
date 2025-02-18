mongoose.connect("mongodb+srv://pratik2271:pratik%401624@pratikproject.vglse6e.mongodb.net/bloodbank", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
})
.then(() => {
  console.log("✅ MongoDB connected!");
})
.catch((error) => {
  console.error("❌ MongoDB connection failed:", error);
});
