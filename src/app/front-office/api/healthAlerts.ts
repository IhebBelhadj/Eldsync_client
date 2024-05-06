export interface HealthAlerts {
    id?: number;
    alertType?: AlertType;
    alertMessage?: string;
    alertDate?: Date;
    resolvedStatus?: ResolvedStatus;
}

export enum AlertType {
    // Define your alert types here if not already defined in the backend
}

export enum ResolvedStatus {
    // Define your resolved statuses here if not already defined in the backend
}
