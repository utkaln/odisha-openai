import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function (req, res) {
  const animal = req.body.animal || "";
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Did you forget to Enter your question !",
      },
    });
    return;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.MODEL,
      messages: generatePrompt(animal),
      temperature: 0.2,
    });
    console.log(completion.choices[0].message);
    res.status(200).json({ result: completion.choices[0].message });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();

  const msgArr = [
    {
      role: "system",
      content: "Assume the role of a historian about Odisha, India",
    },
    { role: "user", content: "What are some of the names Odisha is known by" },
    {
      role: "assistant",
      content: "Kalinga, Utkal, Udra, Orissa",
    },
    { role: "user", content: "Famous places of Odisha" },
    {
      role: "assistant",
      content: "Bhubaneswar, Puri, Konark, Rourkela, Chilika, Sambalpur",
    },
    { role: "user", content: "Famous food of Odisha" },
    {
      role: "assistant",
      content: "Pakhala, Rasogolla, Pitha, Machha Bhaja",
    },
    { role: "user", content: "Festivals of Odisha" },
    {
      role: "assistant",
      content: "Raja, Rath Yatra, Kartik Poornima, Durga Puja, Ganesh Puja",
    },
    { role: "user", content: capitalizedAnimal },
  ];

  return msgArr;
}
