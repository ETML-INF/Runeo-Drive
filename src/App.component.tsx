import React from 'react';
import {ProviderComponent} from "./Provider.component";
import {RouterComponent} from "./Router.component";
import {LoaderComponent} from "./Loader.component";

export const AppComponent = () => {
    return (
        <ProviderComponent>
            <LoaderComponent>
                <RouterComponent/>
            </LoaderComponent>
        </ProviderComponent>
    );
};
