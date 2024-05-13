import { EmotionType } from "./emotionType";

export interface DotSearchInput {
    elderId?: number;
    emotionType?: EmotionType;
    emotionIntensity?: number;
    startDate?: string;
    endDate?: string;
    peers?: string[];
}
