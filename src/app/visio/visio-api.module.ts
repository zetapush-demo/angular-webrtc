
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { VisioApiProvider } from './visio-api.service'

/**
 * @name visio
 * @version 1.0.0
 */
@NgModule({
    imports: [CommonModule],
    providers: [
		VisioApiProvider
    ]
})
export class VisioApiModule {
}
