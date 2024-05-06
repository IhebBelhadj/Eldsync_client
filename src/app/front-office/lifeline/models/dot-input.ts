import { EmotionType } from "./emotionType";

export interface DotInput {
    elderId?: number;
    eventDate?: string;
    dotMarkdown?: string;
    emotionType?: EmotionType;
    emotionIntensity?: number;
    peers?: string[];
    assets?: string[];
}
