import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {ChartModule} from "primeng/chart";
import {DropdownModule} from "primeng/dropdown";
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {RippleModule} from "primeng/ripple";
import {SplitButtonModule} from "primeng/splitbutton";
import {MenuItem} from "primeng/api";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-stats',
  standalone: true,
    imports: [
        ButtonModule,
        CalendarModule,
        ChartModule,
        DropdownModule,
        NgForOf,
        NgIf,
        RippleModule,
        SplitButtonModule,
        NgStyle,
        FormsModule,
        NgClass
    ],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent implements OnInit {


    currentWeek: number[] = [];
    today: number = -1;

    items: MenuItem[] = [];
    months: MenuItem[] = [] ;

    lineData: any;
    lineOptions: any
    barData: any;
    barOptions: any;
    showColorCubes: boolean = false;
    showHeader: boolean = true;
    /*calender*/
    showCal: boolean = false;
    monthOptions: any[] = [  // Define an array of options for months
        { label: 'Month', value: 'month' }, // label is what's displayed, value is what's bound
        { label: 'Year', value: 'year' } // Add more options as needed
    ];
    selectedMonth: string = 'month'; // Default value for selected month

    constructor() {

    }

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');







        this.items = [
            { label: 'Green', command: () => this.selectColor('green') },
            { label: 'Red', command: () => this.selectColor('red') },
            { label: 'Yellow', command: () => this.selectColor('yellow') }
        ];

        this.months = [
            { label: 'January', number: 1 },
            { label: 'February', number: 2 },
            { label: 'March', number: 3 },
            { label: 'April', number: 4 },
            { label: 'May', number: 5 },
            { label: 'June', number: 6 },
            { label: 'July', number: 7 },
            { label: 'August', number: 8 },
            { label: 'September', number: 9 },
            { label: 'October', number: 10 },
            { label: 'November', number: 11 },
            { label: 'December', number: 12 }
        ];


        this.generateCalendar();
        this.updateToday();
        setInterval(() => {
            this.updateToday();
        }, 1000);

        this.lineData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'DANGER',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: 'red', // Red color for the first dataset
                    borderColor: 'red', // Red color for the border of the first dataset
                    tension: 0.4
                },
                {
                    label: 'WARNING',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: 'orange', // Orange color for the second dataset
                    borderColor: 'orange', // Orange color for the border of the second dataset
                    tension: 0.4
                },
                {
                    label: 'SAFE',
                    data: [20, 14, 80, 19, 10, 27, 70],
                    fill: false,
                    backgroundColor: 'green', // Green color for the third dataset
                    borderColor: 'green', // Green color for the border of the third dataset
                    tension: 0.4
                }
            ]

        };

        this.lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };

        this.barData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'DANGER Alerts',
                    backgroundColor: documentStyle.getPropertyValue('--red-500'),
                    borderColor: documentStyle.getPropertyValue('--red-500'),
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'WARNING Alerts',
                    backgroundColor: documentStyle.getPropertyValue('--orange-500'),
                    borderColor: documentStyle.getPropertyValue('--orange-500'),
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };

        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };
    }




    generateCalendar(): void {
        const currentDate = new Date();
        const currentDay = currentDate.getDay();
        const currentDateValue = currentDate.getDate();
        const startOfWeek = currentDateValue - currentDay; // Adjusted for Sunday as start of the week
        const startOfWeekDate = new Date(currentDate.setDate(startOfWeek));

        for (let i = 0; i < 7; i++) {
        const nextDay = new Date(startOfWeekDate);
        nextDay.setDate(startOfWeekDate.getDate() + i);
        this.currentWeek.push(nextDay.getDate());
    }
}

    updateToday(): void {
        const currentDate = new Date();
        this.today = currentDate.getDay();
    }

    isToday(index: number): boolean {
        return this.today === index;
    }

    selectColor(color: string) {
        // Perform actions when a color is selected
        console.log('Selected color:', color);
    }

    toggleColorCubes() {
        this.showColorCubes=!this.showColorCubes;
    }

    showCalendar() {
        this.showCal = !this.showCal;
        this.showHeader = !this.showHeader;
    }
}

