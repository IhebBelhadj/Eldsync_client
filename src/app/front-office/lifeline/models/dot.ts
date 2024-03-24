import { Asset } from "./asset";
import { EmotionType } from "./emotionType";
import { Peer } from "./peer";

export interface Dot {
    idDot: string;
    elderId: number;
    eventDate?: string;
    dotMarkdown: string;
    emotionType: EmotionType;
    emotionIntensity: number;
    assets?: Asset[];
    peers?: Peer[];
}
