import { Time } from "@angular/common";

export class Task{ 
id?: number;
name: string;
description: string;
date: Date;
endDate?: Date; // Date de fin, facultative pour les tâches récurrentes
time: Time; // Heure de la tâche
priority: string;
recurrence?: string; // Récurrence de la tâche (daily, weekly, etc.)
assignedSenior: number; // ID de la personne âgée assignée à la tâche

 }