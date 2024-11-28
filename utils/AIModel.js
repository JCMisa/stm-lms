const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.85, // ranger from .1 to .9, the higher it is, the more diverse the output is
    topK: 40, //ranges to 1 to 41 the higher, the higher the probability and more relevant output but longer waiting response
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

const safetySetting = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
];

export const chatSession = model.startChat({
    generationConfig,
    safetySetting,
});

export const generateNote = model.startChat({
    generationConfig,
    safetySetting,

    history: [
        {
            role: "user",
            parts: [
                { text: "generate exam material detail content for each chapter, make sure to include all topic point in the content, make sure to give content in HTML format (Do not add HTML tag, Head, Body, title tag), the chapters: {\n      \"chapterTitle\": \"Wake Up Right\",\n      \"chapterSummary\": \"Learn how to optimize your wake-up routine for better energy and mood.\",\n      \"chapterTopics\": [\n        \"Importance of sufficient sleep\",\n        \"Creating a relaxing bedtime routine\",\n        \"Gentle wake-up methods\",\n        \"Hydration upon waking up\"\n      ]\n    }" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "<h1>Wake Up Right</h1>\n<p>This chapter explores how to optimize your wake-up routine for increased energy and improved mood throughout the day.</p>\n\n<h2>Importance of Sufficient Sleep</h2>\n<p>This section will cover the crucial role of sleep in overall health and well-being.  Topics include:</p>\n<ul>\n<li>The recommended amount of sleep for adults and the consequences of sleep deprivation.</li>\n<li>The impact of sleep on cognitive function, mood, and physical health.</li>\n<li>Identifying and addressing common sleep disorders that may interfere with sufficient rest.</li>\n<li>Strategies for improving sleep quality, such as maintaining a regular sleep schedule and creating a conducive sleep environment.</li>\n</ul>\n\n\n<h2>Creating a Relaxing Bedtime Routine</h2>\n<p>Learn how to wind down effectively before sleep to promote better sleep quality.  This includes:</p>\n<ul>\n<li>Establishing a consistent bedtime and wake-up time, even on weekends.</li>\n<li>Creating a relaxing pre-sleep routine, such as taking a warm bath, reading a book, or listening to calming music.</li>\n<li>Minimizing screen time before bed and creating a dark, quiet, and cool sleep environment.</li>\n<li>Practicing relaxation techniques such as deep breathing or meditation to reduce stress and anxiety.</li>\n</ul>\n\n\n<h2>Gentle Wake-Up Methods</h2>\n<p>Discover gentler ways to wake up that promote a more positive and energized start to the day.  This section will discuss:</p>\n<ul>\n<li>The negative effects of jarring alarm clocks.</li>\n<li>Alternative wake-up methods, such as using sunrise alarm clocks or calming sounds.</li>\n<li>The importance of gradually waking up and avoiding immediately jumping out of bed.</li>\n<li>Incorporating light exposure upon waking to regulate the body's natural sleep-wake cycle.</li>\n</ul>\n\n\n<h2>Hydration Upon Waking Up</h2>\n<p>Understand the importance of rehydrating your body first thing in the morning and the benefits it provides.  This section will cover:</p>\n<ul>\n<li>The impact of dehydration on energy levels and cognitive function.</li>\n<li>The benefits of drinking water immediately upon waking.</li>\n<li>Recommended amounts of water to consume throughout the day.</li>\n<li>Other hydrating options, such as herbal teas or electrolyte drinks.</li>\n</ul>\n" },
            ],
        },
    ],
});