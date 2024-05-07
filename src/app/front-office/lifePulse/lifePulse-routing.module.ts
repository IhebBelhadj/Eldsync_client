import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LifePulseComponent } from "./lifePulse.component";
import {ChatbotComponent} from "./chatbot/chatbot.component";
import {NotesComponent} from "./notes/notes.component";
import {TelehealthComponent} from "./telehealth/telehealth.component";
import {StatsComponent} from "./stats/stats.component";
import {TodosComponent} from "./todos/todos.component";
import {MeasurementsBarComponent} from "./measurementsBar/measurementsBar.component";
import {LifeVitalComponent} from "./life-vital/life-vital.component";
import {LifeMetricComponent} from "./life-metric/life-metric.component";
import {TelehealthRoomComponent} from "./telehealthRoom/telehealth.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LifePulseComponent, children: [
                { path: '',  component: ChatbotComponent },
                { path: 'chatbot', component:ChatbotComponent},
                { path: 'notes', component: NotesComponent },
                { path: 'telehealth', component: TelehealthComponent},
                { path: 'telehealth/room/:inviteCode', component: TelehealthRoomComponent },
                { path:'stats', component: StatsComponent},
                { path: 'todos', component: TodosComponent},
                { path: 'lifeVital', component: LifeVitalComponent},
                { path: 'lifeMetric', component: LifeMetricComponent },]

        }
    ])],
    exports: [RouterModule]
})
export class LifePulseRoutingModule { }
