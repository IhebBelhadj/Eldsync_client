import {HealthAlerts} from "./healthAlerts";
import {Profile} from "./profile";

export interface HealthMetric {
    id?: number;
    observerName?: string;
    cholesterolLvl?: number;
    bloodGlucoseLvl?: number;
    weight?: number;
    height?: number;
    date?: Date;
}
