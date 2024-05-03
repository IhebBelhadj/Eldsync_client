export interface EmotionState {
    intensity: number;
    text: string;
}

export interface EmotionStates {
    emotion: string;
    states: EmotionState[];
}

export const emotionStates: EmotionStates[] = [
    {
        emotion: "HAPPY",
        states: [
            { intensity: 1, text: "😐 meh" },
            { intensity: 2, text: "😄 kinda happy" },
            { intensity: 3, text: "😆 feeling excited" },
            { intensity: 4, text: "🌟 on cloud nine" },
            { intensity: 5, text: "🚀 on cocaine" }
        ]
    },
    {
        emotion: "SAD",
        states: [
            { intensity: 1, text: "😂 life's a tragedy" },
            { intensity: 2, text: "😔 kinda sad" },
            { intensity: 3, text: "😞 feeling blue" },
            { intensity: 4, text: "😢 life is a joke" },
            { intensity: 5, text: "🎪 ready to join a circus" }
        ]
    },
    {
        emotion: "ANGRY",
        states: [
            { intensity: 1, text: "😐 barely irritated" },
            { intensity: 2, text: "😠 kinda angry" },
            { intensity: 3, text: "🤬 seeing red" },
            { intensity: 4, text: "💣 plotting world domination" },
            { intensity: 5, text: "💥 unleashing inner Hulk" }
        ]
    },
    {
        emotion: "GRATEFUL",
        states: [
            { intensity: 1, text: "😶 somewhat thankful" },
            { intensity: 2, text: "😌 kinda grateful" },
            { intensity: 3, text: "🙏 thankful" },
            { intensity: 4, text: "🌈 blessed" },
            { intensity: 5, text: "💫 floating on air" }
        ]
    },
    {
        emotion: "LOVING",
        states: [
            { intensity: 1, text: "😏 lukewarm affection" },
            { intensity: 2, text: "😍 kinda loving" },
            { intensity: 3, text: "❤️ feeling romantic" },
            { intensity: 4, text: "😻 heart eyes activated" },
            { intensity: 5, text: "🥰 head over heels" }
        ]
    }
];

export function getEmotionState(emotion: string, intensity: number): EmotionState {
    return emotionStates.find(
        emotionState => emotionState.emotion === emotion
    )?.states.find(
        s => s.intensity === intensity
    );
}
