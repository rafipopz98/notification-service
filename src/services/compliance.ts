import User from "../database/model/user";

// Function to handle spam complaints
const handleSpamComplaint = async (email: string) => {
  const user = await User.findOne({ email });
  if (user) {
    await User.findOneAndUpdate(
      { email },
      { score: user.score - 10 },
      { new: true, runValidators: true }
    );
    console.log(`User ${email} reported as spam. Score decreased.`);
  } else {
    console.log(`User ${email} not found.`);
  }
};

// Function to handle unsubscribe requests
const handleUnsubscribe = async (email: string) => {
  const user = await User.findOne({ email });
  if (user) {
    await User.findOneAndUpdate(
      { email },
      { listen: "unsubscribed" },
      { new: true, runValidators: true }
    );
    console.log(`User ${email} unsubscribed.`);
  } else {
    console.log(`User ${email} not found.`);
  }
};

export { handleSpamComplaint, handleUnsubscribe };
