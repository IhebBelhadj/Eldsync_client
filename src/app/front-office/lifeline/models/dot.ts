import { Asset } from "./asset";
import { EmotionType } from "./emotionType";
import { Peer } from "./peer";

export interface Dot {
    idDot: string;
    elderId: number;
    eventDate?: Date;
    dotMarkdown: string;
    emotionType: EmotionType;
    emotionIntensity: number;
    assets?: Asset[];
    peers?: Peer[];
}
