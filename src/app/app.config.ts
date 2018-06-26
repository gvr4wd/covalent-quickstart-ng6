/**
 * Created by dshin on 2/10/2017.
 */
import {InjectionToken} from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export class IAppConfig {
    API_ENDPOINT: string;
    FEDERAL_TAX_RATE: number;
    SSI_TAX_RATE: number;
    MEDICARE_TAX_RATE: number;
    STATE_TAX_RATE: number;
}

export const AppConfig: IAppConfig = {
    API_ENDPOINT: '/api',
    FEDERAL_TAX_RATE: 0.30,
    SSI_TAX_RATE: 0.075,
    MEDICARE_TAX_RATE: 0.025,
    STATE_TAX_RATE: 0.13
};
